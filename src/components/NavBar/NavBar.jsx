import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo1 from '../ArtWork/navBar.svg';
import searchIcon from '../ArtWork/search.svg';

function NavBar() {
  const { t } = useTranslation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  useEffect(() => {
    console.log("Hovered item:", hoveredItem);
  }, [hoveredItem]);

  return (
    <div className="NavBar">
      <div className="NavBar-Top">
        <Link to="/"><img className="NavBar-Logo1" src={logo1} alt={t('nav.logoAlt')} /></Link>
        <div
          className="NavBar-Store"
          onMouseEnter={() => handleMouseEnter('store')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/studio" className="Link"><button className='NavBar-button'>Studio</button></Link>
        </div>
        <div
          className="NavBar-Store"
          onMouseEnter={() => handleMouseEnter('store')}
          onMouseLeave={handleMouseLeave}
        >
          <Link target='_blanck' to="https://plumiers.lancherix.com" className="Link"><button className='NavBar-button'>Plumiers</button></Link>
        </div>
        <div
          className="NavBar-Register"
          onMouseEnter={() => handleMouseEnter('register')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="https://studio.lancherix.com/register" className="Link"><button className='NavBar-button'>{t('nav.register')}</button></Link>
        </div>
        <div
          className="NavBar-Login"
          onMouseEnter={() => handleMouseEnter('login')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="https://studio.lancherix.com/login" className="Link"><button className='NavBar-button'>{t('nav.login')}</button></Link>
        </div>
        <Link to="/"><img className="NavBar-searchIcon" src={searchIcon} alt={t('nav.searchAlt')} /></Link>
      </div>
    </div>
  );
}

export default NavBar;