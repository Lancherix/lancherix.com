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
          <Link to="/store" className="Link"><button className='NavBar-button'>Store</button></Link>
          {hoveredItem === 'store' && (
            <div
              className="NavBar-SubMenu"
              onMouseEnter={() => handleSubMenuMouseEnter('store')}
              onMouseLeave={handleSubMenuMouseLeave}
            >
              <div className="NavBar-Item">
                <Link to="/store/option1">Option 1</Link>
                <Link to="/store/option2">Option 2</Link>
                <Link to="/store/option3">Option 3</Link>
              </div>
            </div>
          )}
        </div>
        <div
          className="NavBar-Physics"
          onMouseEnter={() => handleMouseEnter('physics')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="physics.lancherix.com" target='_blank' className="Link"><button className='NavBar-button'>Physics</button></Link>
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
                <Link to="physics.lancherix.com">Quantities and units</Link>
                <Link to="physics.lancherix.com">Kinematics</Link>
                <Link to="physics.lancherix.com">Dynamics</Link>
              </div>
              <div className="NavBar-Item">
                <Link to="physics.lancherix.com">Forces, density and pressure</Link>
                <Link to="physics.lancherix.com">Work, energy and power</Link>
                <Link to="physics.lancherix.com">Deformation of solids</Link>
              </div>
              <div className="NavBar-Item">
                <Link to="physics.lancherix.com">Waves</Link>
                <Link to="physics.lancherix.com">Superposition</Link>
                <Link to="physics.lancherix.com">Electricity</Link>
              </div>
              <div className="NavBar-Item">
                <Link to="physics.lancherix.com">D.C. circuitsy</Link>
                <Link to="physics.lancherix.com">Particle physics</Link>
              </div>
            </div>
          )}
        </div>
        <div
          className="NavBar-Register"
          onMouseEnter={() => handleMouseEnter('register')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/" className="Link"><button className='NavBar-button'>Register</button></Link>
          {hoveredItem === 'music' && (
            <div
              className="NavBar-SubMenu"
              onMouseEnter={() => handleSubMenuMouseEnter('register')}
              onMouseLeave={handleSubMenuMouseLeave}
            >
              <div className="NavBar-Item">
                <Link to="/music/option1">Option 1</Link>
                <Link to="/music/option2">Option 2</Link>
                <Link to="/music/option3">Option 3</Link>
              </div>
            </div>
          )}
        </div>
        <div
          className="NavBar-Login"
          onMouseEnter={() => handleMouseEnter('login')}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/sports" className="Link"><button className='NavBar-button'>Login</button></Link>
          {hoveredItem === 'login' && (
            <div
              className="NavBar-SubMenu"
              onMouseEnter={() => handleSubMenuMouseEnter('login')}
              onMouseLeave={handleSubMenuMouseLeave}
            >
              <div className="NavBar-Item">
                <Link to="/sports/option1">Option 1</Link>
                <Link to="/sports/option2">Option 2</Link>
                <Link to="/sports/option3">Option 3</Link>
              </div>
            </div>
          )}
        </div>
        <Link to="/"><img className="NavBar-searchIcon" src={searchIcon} alt="Search" /></Link>
      </div>
    </div>
  );
}

export default NavBar;