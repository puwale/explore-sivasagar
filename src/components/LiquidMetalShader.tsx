import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface LiquidMetalShaderProps {
  baseColor?: string;
  metalColor?: string;
  highlightColor?: string;
  distortion?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Convert hex color string to normalized RGB array [r, g, b] (0.0 to 1.0)
function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) {
    return [0.1, 0.1, 0.1];
  }
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_baseColor;
uniform vec3 u_metalColor;
uniform vec3 u_highlightColor;
uniform float u_distortion;
uniform float u_speed;
uniform float u_interactive;

// Simplex 2D noise implementation
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,   // (3.0 - sqrt(3.0)) / 6.0
    0.366025403784439,   // 0.5 * (sqrt(3.0) - 1.0)
    -0.577350269189626,  // -1.0 + 2.0 * C.x
    0.024390243902439    // 1.0 / 41.0
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Multi-octave fluid noise
float fbm(vec2 p, float t) {
  float f = 0.0;
  float w = 0.52;
  for (int i = 0; i < 4; i++) {
    f += w * snoise(p);
    p = p * 2.08 + vec2(t * 0.12, -t * 0.09);
    w *= 0.48;
  }
  return f;
}

// Molten liquid metal height map with domain warping and cursor disturbance
float liquidHeight(vec2 uv, float t, vec2 mousePos, float distFactor, float isInteract) {
  vec2 p = uv * 2.2;

  // Subtle interactive pointer wave/ripple
  if (isInteract > 0.5) {
    vec2 mDiff = uv - mousePos;
    float mDist = length(mDiff);
    float mWave = exp(-mDist * 4.2) * sin(mDist * 18.0 - t * 3.5);
    p += (mDiff / (mDist + 0.001)) * mWave * 0.22 * distFactor;
  }

  // Double domain warping creates viscous organic liquid folds
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0), t),
    fbm(p + vec2(5.2, 1.3), t)
  );

  vec2 r = vec2(
    fbm(p + (3.2 * distFactor) * q + vec2(1.7, 9.2) + 0.15 * t, t),
    fbm(p + (3.2 * distFactor) * q + vec2(8.3, 2.8) + 0.12 * t, t)
  );

  return fbm(p + (3.6 * distFactor) * r, t);
}

void main() {
  // Center coordinates and preserve aspect ratio
  vec2 aspectCoord = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 mouseCoord = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float t = u_time * u_speed;
  float distFactor = u_distortion;

  // Finite differences for surface normal estimation
  vec2 eps = vec2(0.0035, 0.0);
  float h  = liquidHeight(aspectCoord, t, mouseCoord, distFactor, u_interactive);
  float hX = liquidHeight(aspectCoord + eps.xy, t, mouseCoord, distFactor, u_interactive);
  float hY = liquidHeight(aspectCoord + eps.yx, t, mouseCoord, distFactor, u_interactive);

  // Surface normal vector with smooth depth gradient
  vec3 normal = normalize(vec3((hX - h) / eps.x, (hY - h) / eps.x, 0.32));

  // Lighting directions (Key light, Fill light, and Dynamic cursor sheen)
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 keyLight = normalize(vec3(-0.55, 0.75, 0.65));
  vec3 fillLight = normalize(vec3(0.65, -0.45, 0.55));
  vec3 cursorLight = normalize(vec3(mouseCoord - aspectCoord, 0.45));

  // Diffuse terms
  float keyDiff = max(dot(normal, keyLight), 0.0);
  float fillDiff = max(dot(normal, fillLight), 0.0);
  float cursorDiff = u_interactive > 0.5 ? max(dot(normal, cursorLight), 0.0) : 0.0;

  // Specular Blinn-Phong terms
  vec3 keyHalf = normalize(keyLight + viewDir);
  float keySpec = pow(max(dot(normal, keyHalf), 0.0), 36.0);

  vec3 fillHalf = normalize(fillLight + viewDir);
  float fillSpec = pow(max(dot(normal, fillHalf), 0.0), 18.0);

  vec3 cursorHalf = normalize(cursorLight + viewDir);
  float cursorSpec = pow(max(dot(normal, cursorHalf), 0.0), 28.0);

  // Fresnel rim reflection (Schlick approximation)
  float NdotV = max(dot(normal, viewDir), 0.0);
  float fresnel = pow(1.0 - NdotV, 3.2);

  // Curvature shading
  float curvature = clamp(0.5 + 0.5 * h, 0.0, 1.0);

  // Dark metallic liquid synthesis
  // 1. Deep base tone foundation
  vec3 color = u_baseColor;

  // 2. Midtone silver body according to curvature and directional flow
  float midtoneFactor = smoothstep(0.15, 0.85, curvature * 0.7 + keyDiff * 0.45);
  color = mix(color, u_metalColor, midtoneFactor * 0.88);

  // 3. Subtle secondary fill lighting for dimensional volume
  color += u_metalColor * (fillDiff * 0.22);

  // 4. Specular glints and silver highlights
  float totalSpecular = (keySpec * 0.82) + (fillSpec * 0.25);
  if (u_interactive > 0.5) {
    float cursorDist = length(aspectCoord - mouseCoord);
    float cursorInfluence = exp(-cursorDist * 3.5);
    totalSpecular += cursorSpec * 0.35 * cursorInfluence;
  }
  color += u_highlightColor * totalSpecular;

  // 5. Radiant metallic Fresnel edge reflections
  color += u_highlightColor * (fresnel * 0.55);

  // 6. Deep fluid crevice ambient occlusion
  float ao = smoothstep(-0.85, 0.55, h) * 0.5 + 0.5;
  color *= ao;

  // Soft cinematic contrast curve
  color = pow(color, vec3(0.95));

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Shader compile failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vShader: WebGLShader,
  fShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('Program link failed:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export const LiquidMetalShader: React.FC<LiquidMetalShaderProps> = ({
  baseColor = '#1A1A1A',
  metalColor = '#AEB8C4',
  highlightColor = '#FFFFFF',
  distortion = 0.45,
  speed = 0.35,
  interactive = true,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Target and current mouse position for smooth lerp damping
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isVisibleRef = useRef<boolean>(true);
  const isContextLostRef = useRef<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, []);

  // Track pointer movements without blocking interactions or touch scrolls
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Convert client coordinates to canvas-space coordinates (Y flipped for WebGL)
    const x = e.clientX - rect.left;
    const y = rect.height - (e.clientY - rect.top);

    // DPR scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    mouseTargetRef.current = {
      x: x * dpr,
      y: y * dpr,
    };
  }, []);

  useEffect(() => {
    if (!interactive) return;

    // Attach passive listener to window so user can move freely and interactions pass through
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [interactive, handlePointerMove]);

  // Main WebGL initialization & render cycle
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Attempt WebGL context creation with high-performance profile
    const glOptions: WebGLContextAttributes = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    };

    const gl = (canvas.getContext('webgl', glOptions) ||
      canvas.getContext('experimental-webgl', glOptions)) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn('WebGL is not supported or disabled. Using CSS fallback.');
      setHasWebGL(false);
      return;
    }

    setHasWebGL(true);

    const vShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vShader || !fShader) {
      setHasWebGL(false);
      return;
    }

    const program = createProgram(gl, vShader, fShader);
    if (!program) {
      setHasWebGL(false);
      return;
    }

    // Full screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uBaseColorLoc = gl.getUniformLocation(program, 'u_baseColor');
    const uMetalColorLoc = gl.getUniformLocation(program, 'u_metalColor');
    const uHighlightColorLoc = gl.getUniformLocation(program, 'u_highlightColor');
    const uDistortionLoc = gl.getUniformLocation(program, 'u_distortion');
    const uSpeedLoc = gl.getUniformLocation(program, 'u_speed');
    const uInteractiveLoc = gl.getUniformLocation(program, 'u_interactive');
    const aPositionLoc = gl.getAttribLocation(program, 'a_position');

    // Parse color uniforms
    const baseRgb = hexToRgb(baseColor);
    const metalRgb = hexToRgb(metalColor);
    const highlightRgb = hexToRgb(highlightColor);

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.max(1, Math.floor(rect.width * dpr));
      const displayHeight = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);

        // Initialize mouse in center
        if (mouseTargetRef.current.x === 0 && mouseTargetRef.current.y === 0) {
          mouseTargetRef.current = { x: displayWidth * 0.5, y: displayHeight * 0.5 };
          mouseCurrentRef.current = { x: displayWidth * 0.5, y: displayHeight * 0.5 };
        }
      }
    };

    resize();

    // ResizeObserver for responsive adaptation
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause rendering when hero section is offscreen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Animation loop variables
    startTimeRef.current = performance.now();
    isContextLostRef.current = false;

    const onContextLost = (e: Event) => {
      e.preventDefault();
      isContextLostRef.current = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const onContextRestored = () => {
      isContextLostRef.current = false;
      startTimeRef.current = performance.now();
      render();
    };

    canvas.addEventListener('webglcontextlost', onContextLost, false);
    canvas.addEventListener('webglcontextrestored', onContextRestored, false);

    const render = () => {
      if (isContextLostRef.current) return;

      if (isVisibleRef.current) {
        const now = performance.now();
        const elapsedSec = (now - startTimeRef.current) / 1000;

        // Smooth mouse position damping
        const mouseEase = 0.075;
        mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * mouseEase;
        mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * mouseEase;

        gl.useProgram(program);

        // Bind attributes
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(aPositionLoc);
        gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

        // Upload uniforms
        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
        // If reduced motion is requested, hold time constant
        gl.uniform1f(uTimeLoc, isReducedMotion ? 0.0 : elapsedSec);
        gl.uniform2f(uMouseLoc, mouseCurrentRef.current.x, mouseCurrentRef.current.y);
        gl.uniform3f(uBaseColorLoc, baseRgb[0], baseRgb[1], baseRgb[2]);
        gl.uniform3f(uMetalColorLoc, metalRgb[0], metalRgb[1], metalRgb[2]);
        gl.uniform3f(uHighlightColorLoc, highlightRgb[0], highlightRgb[1], highlightRgb[2]);
        gl.uniform1f(uDistortionLoc, distortion);
        gl.uniform1f(uSpeedLoc, isReducedMotion ? 0.0 : speed);
        gl.uniform1f(uInteractiveLoc, interactive ? 1.0 : 0.0);

        // Draw quad
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);

      // Cleanup WebGL resources
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vShader);
      gl.deleteShader(fShader);
    };
  }, [
    baseColor,
    metalColor,
    highlightColor,
    distortion,
    speed,
    interactive,
    isReducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      {hasWebGL ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />
      ) : (
        /* Graceful CSS Metallic Fallback when WebGL is unavailable */
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 35%, #2c3038 0%, #1a1a1a 55%, #0e1012 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'linear-gradient(135deg, rgba(174, 184, 196, 0.25) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
            }}
          />
        </div>
      )}
    </div>
  );
};
