import React from 'react';
// import DefaultSidebar from '../partials/Sidebar';
// import { useSelector } from 'react-redux';
import NavBar from '../components/Navbar';

function Dashboard() {
  // const user = useSelector((state) => state.app.authUser);

  return (
    <div className='bg-white h-full'>
      <NavBar/>
    </div>
  );
}

export default Dashboard;