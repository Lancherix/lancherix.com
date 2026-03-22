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
                    <img className="NavBarMobile-Logo" src={logo1} alt="Logo" />
                </Link>

                <button
                    className="NavBarMobile-Burger"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6" className="NavBarMobile-LogoMenu">
                        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                    </svg>
                </button>

            </div>

            {/* Fullscreen menu */}
            <div className={`NavBarMobile-FullMenu ${menuOpen ? "open" : ""}`}>

                <Link to="https://studio.lancherix.com" onClick={() => setMenuOpen(false)}>
                    Studio
                </Link>

                <Link to="https://studio.lancherix.com/register" onClick={() => setMenuOpen(false)}>
                    Register
                </Link>

                <Link to="https://studio.lancherix.com/login" onClick={() => setMenuOpen(false)}>
                    Login
                </Link>

            </div>

        </div>
    );
}

export default NavBarMobile;