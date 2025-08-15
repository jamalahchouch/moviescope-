import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">MovieScope</NavLink>
        <div className="links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'link active' : 'link'}>Accueil</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'link active' : 'link'}>À propos</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

