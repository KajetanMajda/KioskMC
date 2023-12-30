import React from 'react';
import '../app/Style/index.css';
import Advertisements from '../app/Components/Advertisements/Advertisements';
import Navbar from '../app/Components/Navbar/Navbar';
import DiningButton from '../app/Components/DiningButton/DiningButton';

export default function Index() {
    return (
        <>
          <style>
            {`
              body {
                font-family: Arial, sans-serif;
                background-color: rgb(172,148,244);
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
            `}
          </style>
          <div className="main-container">
            <Navbar />
            <Advertisements />
            <DiningButton />
          </div>
        </>
        
    );
    }