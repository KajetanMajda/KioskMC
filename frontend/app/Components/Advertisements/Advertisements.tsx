import React, { useState, useLayoutEffect } from 'react';
import './advertisements.css';

export default function Advertisements() {
    const advertisements = [
        {
            title: 'Indulge in Culinary Excellence at Our Gourmet Haven!',
            content: 'Welcome to a culinary journey like no other, where each bite is a celebration of flavors and every dish tells a story. Our restaurant is a haven for food enthusiasts seeking an extraordinary dining experience. With a passion for excellence, our chefs craft each dish with precision, using only the finest ingredients sourced locally and globally.'
        },
        {
            title: 'A Symphony of Flavors for Every Palate',
            content: 'Embark on a gastronomic adventure with our diverse menu that caters to all tastes. From mouthwatering appetizers to delectable main courses and irresistible desserts, our menu is a symphony of flavors that promises to satisfy even the most discerning palate. Whether you crave a sizzling steak, crave exotic seafood, or savor vegetarian delights.'
        },
        {
            title: 'Elegant Ambiance for Unforgettable Moments',
            content: 'Immerse yourself in the sophisticated yet inviting ambiance of our restaurant. Our thoughtfully designed space creates the perfect backdrop for intimate dinners, family gatherings, and celebratory events. Every corner reflects our commitment to providing an exceptional dining atmosphere where you can relax, unwind, and create unforgettable memories.'
        },
        {
            title: 'Exceptional Service, Every Time',
            content: 'At our restaurant, we believe that exceptional service is the cornerstone of a memorable dining experience. Our attentive and friendly staff is dedicated to ensuring your comfort and satisfaction. From the moment you step through our doors until the last bite, you can expect personalized service that goes beyond expectations.'
        },
        {
            title: 'Sustainable Dining, Fresh and Locally Sourced',
            content: 'We take pride in our commitment to sustainability. Our chefs work closely with local farmers and suppliers to bring you the freshest and highest quality ingredients. By supporting local businesses, we not only contribute to the community but also ensure that our dishes are a celebration of seasonality and environmental responsibility.'
        }
    ];

    const [currentAd, setCurrentAd] = useState(0);

    useLayoutEffect(() => {
        const timer = setInterval(() => {
            setCurrentAd((currentAd + 1) % advertisements.length);
        }, 30000);

        return () => {
            clearInterval(timer);
        };
    }, [currentAd, advertisements.length]);

  return (
    <div className="advertisement-container">
      <div className="section">
        <h1>{advertisements[currentAd].title}</h1>
        <p>{advertisements[currentAd].content}</p>
      </div>
    </div>
  );
}