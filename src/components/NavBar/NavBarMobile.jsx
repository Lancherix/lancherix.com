import React, { useState } from "react";
import "./NavBarMobile.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import logo1 from "../ArtWork/navBar.svg";

function NavBarMobile() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="NavBarMobile">
      <div className="NavBarMobile-Top">
        <Link to="/">
          <img className="NavBarMobile-Logo" src={logo1} alt={t('nav.logoAlt')} />
        </Link>

        <button
          className="NavBarMobile-Burger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="NavBarMobile-LogoMenu">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="NavBarMobile-LogoMenu">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      <div className={`NavBarMobile-FullMenu ${menuOpen ? "open" : ""}`}>
        <Link to="/studio" onClick={() => setMenuOpen(false)}>
          Studio
        </Link>

        <Link to="/card" onClick={() => setMenuOpen(false)}>
          Card
        </Link>

        <Link to="https://plumiers.lancherix.com" onClick={() => setMenuOpen(false)}>
          Plumiers
        </Link>

        <Link to="https://studio.lancherix.com/register" onClick={() => setMenuOpen(false)}>
          {t('nav.register')}
        </Link>

        <Link to="https://studio.lancherix.com/login" onClick={() => setMenuOpen(false)}>
          {t('nav.login')}
        </Link>
      </div>
    </div>
  );
}

export default NavBarMobile;