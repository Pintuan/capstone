import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Admin from './pages/Admin';
import Staff from './pages/Staff';
import Index from './pages/Index';

//window.host = 'http://localhost:7222';
window.host = 'http://13.211.183.92';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={sessionStorage.getItem('3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0') != null ? <Admin /> : <Navigate replace to="/" />} />
        <Route path="/staff/*" element={sessionStorage.getItem('3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0') != null ? <Staff /> : <Navigate replace to="/" />} />
        <Route path="/*" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
