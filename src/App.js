import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Foot from './components/Foot/Foot';
import Home from './components/Home/Home';
import Physics from './components/Physics/Physics';
import DeformationOfSolids from './components/Physics/components/DeformationOfSolids/DeformationOfSolids';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='App-NavBar'>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/physics" element={<Physics />} />
          <Route path="/physics/defomation-of-solids" element={<DeformationOfSolids />} />
        </Routes>
        <div className='App-Foot'>
          <Foot />
        </div>
      </div>
    </Router>
  );
}

export default App;