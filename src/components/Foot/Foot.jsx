import React, { useState, useEffect } from 'react';
import './Foot.css';
import { Link } from 'react-router-dom';

import lancherixArt from '../ArtWork/navBar.svg';

function Foot() {
  return (
    <div className="Foot">
      <div className='Foot-component1'><img src={lancherixArt} alt="Lancherix" className='Foot-mainLogo' /><p>Colombia</p></div>
      {/*<div className='Foot-component2'>
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
          <p>Option 1</p>
          <p>Option 2</p>
          <p>Option 3</p>
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
      </div>*/}
      <div className='Foot-component3'>
        <div>Copyright © 2026 Lancherix Inc. All rights reserved.</div>
        <div className='Foot-terms'><p>Designed and built by Andrés Lancheros</p></div>
      </div>
    </div>
  );
}

export default Foot;