import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }) => {
  return isActive ? 'nav-link active-link' : 'nav-link';
};

function Navbar() {
  // A button for mobile
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    // base on isNavOpen use nav-open class
    <nav className={isNavOpen ? 'navbar nav-open' : 'navbar'}>
      <div className="navbar-brand">
        <NavLink 
          to="/" 
          className="navbar-logo" 
          end
          onClick={() => setIsNavOpen(false)} 
        >
          Sudoku
        </NavLink>
      </div>

      {/* only displays in mobile css */}
      <button 
        className="nav-toggle" 
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle navigation"
      >
        <span className="hamburger-icon"></span>
      </button>

      {/* *** add .nav-menu-wrapper 
        *** This div help in mobile
      */}
      <div className="nav-menu-wrapper">
        <ul className="navbar-links">
          <li>
            <NavLink to="/games/easy" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              Easy (6x6)
            </NavLink>
          </li>
          <li>
            <NavLink to="/games/normal" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              Normal (9x9)
            </NavLink>
          </li>
          <li>
            <NavLink to="/rules" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              Game Rules
            </NavLink>
          </li>
        </ul>

        {/* Link */}
        <ul className="navbar-links-mocked">
          <li>
            <NavLink to="/scores" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              HighScores
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              LogIn
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={getNavLinkClass} onClick={() => setIsNavOpen(false)}>
              SignUp
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;