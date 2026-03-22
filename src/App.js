import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import NavBarMobile from './components/NavBar/NavBarMobile';
import Foot from './components/Foot/Foot';
import Home from './components/Home/Home';
import Reminders from './components/Reminders/Reminders';

// import logo from './components/ArtWork/logotypeVerticalBlueBlack.png';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*if (isMobile) {
    return (
      <div className="mobile-block">
        <div><img src={logo} alt='Lancherix' />
          This service is currently not available on mobile devices.
Access it from a desktop or laptop computer.</div>
      </div>
    );
  }*/

  return (
    <Router>
      <div className="App">
        <div className='App-NavBar'>
          {isMobile ? <NavBarMobile /> : <NavBar />}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
        <div className='App-Foot'>
          <Foot />
        </div>
      </div>
    </Router>
  );
}

export default App;