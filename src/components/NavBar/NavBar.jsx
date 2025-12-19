import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo1 from '../ArtWork/navBar.svg';
import searchIcon from '../ArtWork/search.svg';

function NavBar() {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleSubMenuMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleSubMenuMouseLeave = () => {
    setHoveredItem(null);
  };

  useEffect(() => {
    console.log("Hovered item:", hoveredItem);
  }, [hoveredItem]);

  return (
    <div className="NavBar">
      <div className="NavBar-Top">
        <Link to="/"><img className="NavBar-Logo1" src={logo1} alt="Logo" /></Link>
        <div
          className="NavBar-Store"
          onMouseEnter={() => handleMouseEnter('store')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="https://studio.lancherix.com" className="Link"><button className='NavBar-button'>Studio</button></Link>
        </div>
        <div
          className="NavBar-Physics"
          onMouseEnter={() => handleMouseEnter('physics')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/reminders" className="Link"><button className='NavBar-button'>Physics</button></Link>
          {hoveredItem === 'physics' && (
            <div
              className="NavBar-SubMenu"
              onMouseEnter={() => handleSubMenuMouseEnter('physics')}
              onMouseLeave={handleSubMenuMouseLeave}
            >
              <div className='NavBar-ItemTitle'>
                <Link to="/physics">Physics</Link>
              </div>
              <div className="NavBar-Item">
                <Link to="https://physics.lancherix.com">Quantities and units</Link>
                <Link to="https://physics.lancherix.com">Kinematics</Link>
                <Link to="https://physics.lancherix.com">Dynamics</Link>
              </div>
              <div className="NavBar-Item">
                <Link to="https://physics.lancherix.com">Forces, density and pressure</Link>
                <Link to="https://physics.lancherix.com">Work, energy and power</Link>
                <Link to="https://physics.lancherix.com">Deformation of solids</Link>
              </div>
              <div className="NavBar-Item">
                <Link to="https://physics.lancherix.com">Waves</Link>
                <Link to="https://physics.lancherix.com">Superposition</Link>
                <Link to="https://physics.lancherix.com">Electricity</Link>
              </div>
              <div className="NavBar-Item">
                <Link to="https://physics.lancherix.com">D.C. circuitsy</Link>
                <Link to="https://physics.lancherix.com">Particle physics</Link>
              </div>
            </div>
          )}
        </div>
        <div
          className="NavBar-Register"
          onMouseEnter={() => handleMouseEnter('register')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="https://studio.lancherix.com/register" className="Link"><button className='NavBar-button'>Register</button></Link>
        </div>
        <div
          className="NavBar-Login"
          onMouseEnter={() => handleMouseEnter('login')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="https://studio.lancherix.com/login" className="Link"><button className='NavBar-button'>Login</button></Link>
        </div>
        <Link to="/"><img className="NavBar-searchIcon" src={searchIcon} alt="Search" /></Link>
      </div>
    </div>
  );
}

export default NavBar;