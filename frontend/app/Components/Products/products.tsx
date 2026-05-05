'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/productCard';
import './products.css';

interface Product {
  name: string;
  image: string;
  price: number;
  cuisine: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-card" key={product.name}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
