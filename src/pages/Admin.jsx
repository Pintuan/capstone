import React, { useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Sidebar from '../partials/AdminSidebar';
import Header from '../partials/Header';
import Home from '../components/Admin/Home';
import Logs from '../components/Admin/Logs';
import Customers from '../components/Admin/Customers';
import Plans from '../components/Admin/Plans';
import Settings from '../components/Admin/Settings';
import PaymentSettings from '../components/Admin/PaymentSettings';
import Staff from '../components/Admin/Staff';
import Transactions from '../components/Admin/Transactions';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Plans' element={<Plans />} />
          <Route path='/Personal' element={<Settings />} />
          <Route path='/Staff' element={<Staff />} />
          <Route path='/Transactions' element={<Transactions />} />
          <Route path='/Customers' element={<Customers />} />
          <Route path='/Logs' element={<Logs />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;