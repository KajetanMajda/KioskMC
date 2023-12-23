import React from 'react';
import '../app/Style/index.css';
import Advertisements from '../app/Components/Advertisements/Advertisements';
import Navbar from '../app/Components/Navbar/Navbar';
import DiningButton from '../app/Components/DiningButton/DiningButton';

export default function Index() {
    return (
        <div className="main-container">
            <Navbar />
            <Advertisements />
            <DiningButton />
        </div>
    );
    }