import './AssameseDivider.css';
import gamosaDivider from '../assets/images/gamosa-divider.png';
import japiEmblem from '../assets/images/japi-emblem.png';

/**
 * Traditional Assamese cultural divider.
 * Two long and wide authentic Gamosa strips spanning 90-100% of the width,
 * meeting under the central Japi emblem with ornamental antique-gold flourishes.
 */
export function AssameseDivider() {
  return (
    <section className="assamese-divider" aria-label="Assamese cultural divider">
      {/* Left Gamosa strip: begins at far-left and extends inward toward center */}
      <div className="assamese-divider__gamosa-wrap assamese-divider__gamosa-wrap--left" aria-hidden="true">
        <img
          src={gamosaDivider}
          alt=""
          className="assamese-divider__gamosa-img assamese-divider__gamosa-img--left"
        />
      </div>

      {/* Central Japi emblem layered above the inner ends of both Gamosa strips */}
      <div className="assamese-divider__japi-wrap" aria-hidden="true">
        <img
          src={japiEmblem}
          alt="Traditional Assamese Japi emblem with ornamental flourishes"
          className="assamese-divider__japi-img"
        />
      </div>

      {/* Right Gamosa strip: begins at far-right and extends inward toward center */}
      <div className="assamese-divider__gamosa-wrap assamese-divider__gamosa-wrap--right" aria-hidden="true">
        <img
          src={gamosaDivider}
          alt=""
          className="assamese-divider__gamosa-img assamese-divider__gamosa-img--right"
        />
      </div>
    </section>
  );
}

export default AssameseDivider;
