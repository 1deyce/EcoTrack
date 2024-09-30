import React from 'react'
import SideBar from './SideBar.1';
import Dashboard from '../../pages/Dashboard';
// import Main from './Main';
import Analytics from "./Analytics";
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css';

const DashHome = () => {
  return (
    <div className='flex'>
      <div className='basis-[4%] h-[100vh]'>
        <SideBar />
      </div>
      <div className='basis-[96%]'>
        <Dashboard />
        <div >
          <Analytics />
        </div>
      </div>
    </div>
  )
};

export default DashHome;