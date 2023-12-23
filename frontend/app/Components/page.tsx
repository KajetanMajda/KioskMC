"use client"
import React from 'react';
import '../Style/page.css';
import Advertisements from '../Components/Advertisements';
import { Link } from 'react-router-dom';

export default function StartPage() {
  return (
    <div className="main-container">
      <nav className="navbar-container">
        <p className="firstP">Kajetan's</p>
        <img src="/images/logo.png" alt="Logo"  className="image"/>
        <p className="secondP">Dining</p>
      </nav>

      <div className="advertisement-container">
        <Advertisements />
      </div>

      <div className="button-container">
        <Link to="/home" className="dining">Dine In</Link>
        <Link to="/home" className="dining">Take Out</Link>
      </div>
    </div>
  );
}