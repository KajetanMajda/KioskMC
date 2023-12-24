import React from 'react';
import '../app/Style/home.css';
import Product from '../app/Components/Products/products';
import NavbarBetterOne from '../app/Components/NavbarBetterOne/navbarBetterOne';

export default function Home() {
  return (
    <div className='home-container'>
        <div className='up-container'>
            <NavbarBetterOne/>
        </div>
        <div className='center-container'>
            <Product/>
        </div>
        <div className="botom-container">

        </div>
    </div>
  )
}