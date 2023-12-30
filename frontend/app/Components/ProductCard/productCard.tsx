import './productCard.css';
import Link from 'next/link';
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
        <Link href={`/edit/${product.name}`} className="product-button" >Add to Basket</Link>
    </div>
  );
}