import React, { useState, useEffect } from 'react';
import './Foot.css';
import { Link } from 'react-router-dom';

import lancherixArt from '../ArtWork/navBar.svg';

function Foot() {
  return (
    <div className="Foot">
      <div className='Foot-component1'><img src={lancherixArt} alt="Lancherix" className='Foot-mainLogo' /><p>Colombia</p></div>
      <div className='Foot-component2'>
        <div className='Foot-subComponent'>
          <b>Home</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
        <div className='Foot-subComponent'>
          <b>Store</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
        <div className='Foot-subComponent'>
          <b>Physics</b>
          <p>Introduction</p>
          <p>Quantities and units</p>
          <p>Kinematics</p>
          <p>Dynamics</p>
          <p>Forces, density and pressure</p>
          <p>Work, energy and power</p>
          <p>Deformation of solids</p>
          <p>Waves</p>
          <p>Superposition</p>
          <p>Electricity</p>
          <p>D.C. circuitsy</p>
          <p>Particle physics</p>
        </div>
        <div className='Foot-subComponent'>
          <b>Music</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
        <div className='Foot-subComponent'>
          <b>Sports</b>
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
        </div>
      </div>
      <div className='Foot-component3'>
        <div>Copyright © 2025 Lancherix Inc. All rights reserved.</div>
        <div className='Foot-terms'><a href="">Privacy policy</a><p>|</p><a href="">Terms of Use</a></div>
      </div>
    </div>
  );
}

export default Foot;