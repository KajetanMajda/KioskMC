import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import '../app/Style/basket.css';
import Footer from '../app/Components/Footer/footer';

interface Product {
    name: string;
    price: number;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;
    ingredients: Ingredient[];
}

interface Ingredient {
    name: string;
    quantity: number;
    isEditable: boolean;
    minQuantity: number;
    maxQuantity: number;
}

export default function Basket() {
    const [cart, setCart] = React.useState<Product[]>([]);

    React.useEffect(() => {
        const initialCart = localStorage.getItem('cart');
        if (initialCart) {
            setCart(JSON.parse(initialCart));
        }
    }, []);

    const totalItems = cart.reduce((total, product) => total + (product.quantity || 0), 0);
    const totalPrice = cart.reduce((total, product) => total + (product.price || 0) * (product.quantity || 0), 0);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    if (!cart.length) {
        return <div>
            <p>Your cart is empty</p>
            <Link href="/home">
                <button>BACK</button>
            </Link>
        </div>;
    }

    function removeFromCart(index: number) {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    function decreaseQuantity(productIndex: number, ingredientIndex: number) {
        const newCart = [...cart];
        const product = newCart[productIndex];
        const ingredient = product.ingredients[ingredientIndex];
        if (ingredient.quantity > ingredient.minQuantity) {
            ingredient.quantity--;
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    function increaseQuantity(productIndex: number, ingredientIndex: number) {
        const newCart = [...cart];
        const product = newCart[productIndex];
        const ingredient = product.ingredients[ingredientIndex];
        if (ingredient.quantity < ingredient.maxQuantity) {
            ingredient.quantity++;
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    function generateOrderNumber() {
        let orderNumber;
        do {
            orderNumber = Math.floor(Math.random() * 1000);
        } while (localStorage.getItem(`orderNumber${orderNumber}`));
        localStorage.setItem(`orderNumber${orderNumber}`, 'true');
        return orderNumber;
    }

    return (

        <>
            <style>
                {`
              body {
                margin: 0;
              }
            `}
            </style>

            <div className='main-container-basket'>
                <div className="navbar-container-basket">
                    <h1 className='navabar-h1-basket'>Your Cart</h1>
                    <Link href="/home"><button>BACK</button></Link>
                    <button className='navar-button-basket' onClick={() => { setCart([]); localStorage.removeItem('cart'); }}>Clear Cart</button>
                    <button className='navar-button-basket' onClick={() => setIsModalOpen(true)}>Summary</button>
                    <p className='navar-paragraph-basket'>Total items: {totalItems}</p>
                    <p className='navar-paragraph-basket'>Total price: {totalPrice} €</p>
                </div>

                <Modal className="modal-main" isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <div className="modal-content">
                        {cart.map((product, index) => (
                            <p className='paragraph-modal' key={index}>
                                {`Name: ${product.name}, Quantity: ${product.quantity}, Price: ${product.price} €`}
                            </p>
                        ))}
                        <p className='paragraph-modal-total'>Total: {cart.reduce((sum, product) => sum + product.price * product.quantity, 0)} €</p>

                        <button className="pay-button" onClick={async () => {
                            const orderNumber = generateOrderNumber();
                            const summary = cart.map(product =>
                                `Name: ${product.name}, Quantity: ${product.quantity}, Price: ${product.price} €`
                            ).join('\n');
                            const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
                            const currentDate = new Date().toISOString().slice(0, 10);

                            const response = await fetch('http://localhost:3030/orders', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    orderNumber,
                                    total,
                                    date: currentDate,
                                    items: cart,
                                }),
                            });

                            if (response.ok) {
                                alert(`Payment successful!\nYour Order Number: ${orderNumber}`);
                                setCart([]);
                                localStorage.removeItem('cart');
                                setIsModalOpen(false);
                                router.push('/');
                            } else {
                                alert('Something went wrong!');
                            }
                        }}>Pay here</button>
                    </div>
                </Modal>

                <div className="basket-data-container">
                    {cart.map((product, productIndex) => (
                        <div className='ingredien-container-basket' key={productIndex}>
                            <h2 className='basket-name-h2'>{product.name}</h2>
                            <button className='basket-button' onClick={() => removeFromCart(productIndex)}>Remove</button>
                            {!isEditing ? (
                                <button className='basket-button' onClick={() => setIsEditing(true)}>Edit</button>
                            ) : (
                                <button className='basket-button' onClick={() => setIsEditing(false)}>Save</button>
                            )}
                            <p className='basket-price-paragraph'>Price: {product.price} €</p>
                            <p className='basket-quantity-paragraph'>Quantity: {product.quantity}</p>
                            {product.ingredients && product.ingredients.map((ingredient, ingredientIndex) => (
                                <div className='basket-container-ingredients' key={ingredientIndex}>
                                    <p className='basket-name-paragraph-ingredients'>Name: {ingredient.name}</p>
                                    <p className='basket-quantity-paragraph-ingredients'>Quantity: {ingredient.quantity}</p>
                                    {isEditing && ingredient.isEditable && (
                                        <>
                                            <button className='basket-button-ingredients' onClick={() => decreaseQuantity(productIndex, ingredientIndex)}>-</button>
                                            <button className='basket-button-ingredients' onClick={() => increaseQuantity(productIndex, ingredientIndex)}>+</button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="footer-container-basket">
                    <Footer />
                </div>
            </div>
        </>
    );
}