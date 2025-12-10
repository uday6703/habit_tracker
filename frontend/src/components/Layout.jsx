import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="layout">
    <Navbar />
    <main>{children}</main>
  </div>
);

export default Layout;
