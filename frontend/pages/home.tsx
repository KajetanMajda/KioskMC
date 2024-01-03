import React from 'react';
import '../app/Style/home.css';
import Product from '../app/Components/Products/products';
import NavbarBetterOne from '../app/Components/NavbarBetterOne/navbarBetterOne';
import Footer from "../app/Components/Footer/footer";

export default function Home() {
  return (

    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
        }
        
      `}
      </style>
      <div className='home-container'>
        <div className='up-container'>
          <NavbarBetterOne />
        </div>
        <div className='center-container'>
          <Product />
        </div>
        <div className="botom-container">
          <Footer />
        </div>
      </div>
    </>
  )
}