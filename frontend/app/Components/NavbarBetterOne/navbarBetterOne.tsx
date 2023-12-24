import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import './navbarBetterOne.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function navbarBetterOne() {
  const [placeholder, setPlaceholder] = useState('');
  const [isPause, setIsPause] = useState(false);
  const [products, setProducts] = useState<string[]>([]);
  const productIndex = useRef(0);
  const letterIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    fetch('http://localhost:3030/productsName')
  .then(response => response.json())
  .then(data => setProducts(data.map((item: { name: string }) => item.name)))
  .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPause || products.length === 0) return;
      setPlaceholder(prev => {
        let next;
        if (deleting.current) {
          next = prev.slice(0, -1);
          if (next.length === 0) {
            deleting.current = false;
            productIndex.current = (productIndex.current + 1) % products.length;
            letterIndex.current = 0;
            setIsPause(true);
            setTimeout(() => setIsPause(false), 2000); // 2 seconds pause
          }
        } else {
          next = products[productIndex.current].slice(0, letterIndex.current + 1);
          if (next.length === products[productIndex.current].length) {
            deleting.current = true;
            setIsPause(true);
            setTimeout(() => setIsPause(false), 2000); // 2 seconds pause
          } else {
            letterIndex.current++;
          }
        }
        return next;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [isPause, products]);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Link href="/login">
            <img src="/images/logo2.png" alt="Logo" className="image"/>
        </Link>
      </div>
      <div className='search-bar'>
        <input className='search-input' type='text' placeholder={placeholder} />
      </div>
      <div className='icon-container'>
            <Link href="/login" className="icon-button">
                <FontAwesomeIcon icon={faUser} className='admin-icon'/>
            </Link>
            <Link href="/basket" className="icon-button">
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            </Link>
      </div>
    </div>
  )
}