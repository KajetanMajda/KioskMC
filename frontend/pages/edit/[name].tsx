'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductDetailsEdit from '../../app/Components/ProductDetailsEdit/productDetailsEdit';

export default function Products() {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const {name} = router.query;
  
    useEffect(() => {
      fetch(`http://localhost:3030/edit/${name}`)
        .then(response => response.json())
        .then(data => setProduct(data));
    }, []);
  
    return (
      <div>
        {product && <ProductDetailsEdit productProp={product} /> }
      </div>
    )
  }