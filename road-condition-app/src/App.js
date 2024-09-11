// road-condition-app/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // The component with the form
import ProcessRoad from './ProcessRoad'; // The component for processing roads

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/process-road/:roadId" element={<ProcessRoad />} />
      </Routes>
    </Router>
  );
}

export default App;
