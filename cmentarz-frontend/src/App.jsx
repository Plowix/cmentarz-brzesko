import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouterContent from './RouterContent';

import 'leaflet-css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <RouterContent/>
    </Router>
  );
}

export default App;
