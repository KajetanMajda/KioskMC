import './productCard.css';
import React from 'react';

interface Product {
    name: string;
    image: string;
    price: number;
    cuisine: string;
}

export default function ProductCard({ product }: { product: Product }) {

  return (
    <div className="product-container">
        <h1 className="product-name">{product.name}</h1>
        <img className="product-image" src={product.image} alt="Product" />
        <p className='product-price'>Price: {product.price}</p>
        <p className='product-cuisine'>Cuisine: {product.cuisine}</p>
    </div>
  );
}