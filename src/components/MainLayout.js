import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import { Container } from 'react-bootstrap';
// -------------------------------------------------------------------------------------

function MainLayout() {
  return (
    <div className="MainLayout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

      <Footer style={{ flexShrink: 0 }} />

    </div>
  );
}

export default MainLayout;
