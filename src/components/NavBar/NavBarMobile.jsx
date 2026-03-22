import React, { useState } from "react";
import "./NavBarMobile.css";
import { Link } from "react-router-dom";
import logo1 from "../ArtWork/navBar.svg";

function NavBarMobile() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="NavBarMobile">

      {/* Top bar */}
      <div className="NavBarMobile-Top">

        <Link to="/">
          <img className="NavBarMobile-Logo" src={logo1} alt="Logo"/>
        </Link>

        <button
          className="NavBarMobile-Burger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Fullscreen menu */}
      <div className={`NavBarMobile-FullMenu ${menuOpen ? "open" : ""}`}>

        <Link to="https://studio.lancherix.com" onClick={()=>setMenuOpen(false)}>
          Studio
        </Link>

        <Link to="https://studio.lancherix.com/register" onClick={()=>setMenuOpen(false)}>
          Register
        </Link>

        <Link to="https://studio.lancherix.com/login" onClick={()=>setMenuOpen(false)}>
          Login
        </Link>

      </div>

    </div>
  );
}

export default NavBarMobile;