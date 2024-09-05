import React from 'react';
import { Outlet } from 'react-router-dom'; // Assuming you're using react-router for routing
import Footer from './Footer'; // Your footer component

export default function Layout() {
  return (
    <div className="layout">
      <main>
        <Outlet /> {/* Renders the current page */}
      </main>
      <Footer />
    </div>
  );
}
