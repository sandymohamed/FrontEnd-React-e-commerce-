import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import { Container } from 'react-bootstrap';
// -------------------------------------------------------------------------------------

function MainLayout() {
  return (
    <div className="MainLayout">
      <Header />

      <Outlet />
      <div className='relative-bottom mt-3'>
      <Footer />

      </div>

    </div>
  );
}

export default MainLayout;
