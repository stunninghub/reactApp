import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export function MainHeader() {

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      let currentScroll = window.scrollY;

      // If scrolling down
      if (currentScroll > lastScroll && currentScroll > 50) {
        setSticky(true);
      }
      // If scrolling up
      else {
        setSticky(false);
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`main_header ${sticky ? "sticky" : ""}`}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/portfolio" className={({ isActive }) => isActive ? "active" : ""}>
            <span>Portfolio</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            <span>About</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
            <span>Contact</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
