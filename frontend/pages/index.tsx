// pages/index.tsx
import React from 'react';
import '../app/Style/page.css';
import Advertisements from '../app/Components/Advertisements';

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
        <button className="dining">Dine In</button>
        <button className="dining">Take Out</button>
      </div>
    </div>
    );
    }