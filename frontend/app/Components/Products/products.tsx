'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/productCard';
import './products.css';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3030/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}