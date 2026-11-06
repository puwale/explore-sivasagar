"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import taiAhomEmblem from "@/assets/images/tai-ahom-emblem.png";

export interface OrbInputProps {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  placeholders?: string[];
  size?: "default" | "compact";
  "aria-label"?: string;
}

export function OrbInput({
  className = "",
  value: controlledValue,
  onChange: controlledOnChange,
  onClear,
  onSearch,
  placeholders: customPlaceholders,
  size = "default",
  "aria-label": ariaLabel = "Ask a question",
}: OrbInputProps = {}) {
  const defaultPlaceholders = useMemo(
    () => [
      "Search monument or Swargadeo...",
      "What's on your mind?",
      "How can I help you?",
      "What would you like to know?",
    ],
    []
  );

  const placeholders = customPlaceholders || defaultPlaceholders;

  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(placeholders[0] || "");
  const [isTyping, setIsTyping] = useState(false);

  // Config: tweak the animation to taste
  const CHAR_DELAY = 75; // ms between characters while typing
  const IDLE_DELAY_AFTER_FINISH = 2200; // ms to wait after a full sentence is shown

  // Refs to hold active timers so they can be cleaned up
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // clear any stale timers (helps with StrictMode double-invoke in dev)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const current = placeholders[placeholderIndex];
    if (!current) {
      // oxlint-disable-next-line react/set-state-in-effect
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    const chars = Array.from(current);

    // reset state for a new round
    // oxlint-disable-next-line react/set-state-in-effect
    setDisplayedText("");
    setIsTyping(true);

    let charIndex = 0;

    // type character-by-character using a derived slice to avoid any chance of appending undefined
    intervalRef.current = window.setInterval(() => {
      if (charIndex < chars.length) {
        const next = chars.slice(0, charIndex + 1).join("");
        setDisplayedText(next);
        charIndex += 1;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsTyping(false);

        // after a brief pause, advance to the next placeholder
        timeoutRef.current = window.setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, IDLE_DELAY_AFTER_FINISH);
      }
    }, CHAR_DELAY);

    // Cleanup on unmount or when placeholderIndex changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [placeholderIndex, placeholders]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    controlledOnChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  };

  const isCompact = size === "compact";

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex items-center transition-all duration-300 ease-out rounded-full shadow-md border ${
          isCompact
            ? `gap-3 px-3.5 py-1.5 h-11 sm:h-12 bg-[#F5F1E8] border-[#C6A56B] w-full ${
                isFocused ? "shadow-lg border-[#C6A56B] scale-[1.01]" : ""
              }`
            : `gap-4 p-6 bg-black border-gray-300 shadow-lg ${
                isFocused ? "shadow-xl scale-[1.02] border-gray-600" : ""
              }`
        }`}
      >
        <div className="relative flex-shrink-0">
          <div
            className={`rounded-full overflow-hidden transition-all duration-300 scale-100 flex items-center justify-center ${
              isCompact
                ? "w-8 h-8 sm:w-9 sm:h-9 bg-[#F5F1E8] border border-[#C6A56B] p-0.5"
                : "w-16 h-16 bg-forest-950/80 border border-gold-500/30 p-1.5"
            }`}
          >
            {/* Tai-Ahom Emblem rotating 360 degrees counterclockwise every 9s */}
            <img
              src={taiAhomEmblem}
              alt="Tai-Ahom Emblem"
              className="w-full h-full object-contain pointer-events-none select-none animate-spin-ccw-9s"
              style={{ animation: "spin-counterclockwise 9s linear infinite" }}
            />
          </div>
        </div>

        <div
          className={`shrink-0 ${
            isCompact ? "w-px h-6 bg-[#C6A56B]" : "w-px h-12 bg-gray-600"
          }`}
        />

        <div className={`flex-1 min-w-0 ${isCompact ? "w-full flex items-center" : "w-[500px]"}`}>
          <input
            data-testid="orb-input"
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={`${displayedText}${isTyping ? "|" : ""}`}
            aria-label={ariaLabel}
            className={`w-full bg-transparent border-none outline-none font-normal ${
              isCompact
                ? "text-[14px] sm:text-[15px] text-[#789B75] placeholder-[#789B75]/70 caret-[#789B75]"
                : "text-xl text-white placeholder-gray-400 font-light"
            }`}
          />
        </div>

        {isCompact && value && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search query"
            className="text-[12px] text-[#789B75] hover:text-[#5c7a59] font-medium shrink-0 px-2 py-0.5 rounded-full hover:bg-[#C6A56B]/15 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default OrbInput;
