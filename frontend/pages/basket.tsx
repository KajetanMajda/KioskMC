import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

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
        <div>
            <h1>Your Cart</h1>
            <Link href="/home">
                <button>BACK</button>
            </Link>
            <button onClick={() => {
                setCart([]);
                localStorage.removeItem('cart');
            }}>Clear Cart</button>
            <button onClick={() => setIsModalOpen(true)}>Summary</button>

            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                {cart.map(product =>
                    `Name: ${product.name}, Quantity: ${product.quantity}, Price: ${product.price}`
                ).join('\n')}
                Total: {cart.reduce((sum, product) => sum + product.price * product.quantity, 0)}
                <button onClick={() => {
                    const orderNumber = generateOrderNumber();
                    alert(`Payment successful!\nYour Order Number: ${orderNumber}`);
                    setCart([]);
                    localStorage.removeItem('cart');
                    setIsModalOpen(false);
                    router.push('/');
                }}>Zapłać</button>
            </Modal>

            <p>Total items: {totalItems}</p>
            <p>Total price: {totalPrice}</p>

            {cart.map((product, productIndex) => (
                <div key={productIndex}>
                    <h2>{product.name}</h2>
                    <button onClick={() => removeFromCart(productIndex)}>Remove</button>
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    ) : (
                        <button onClick={() => setIsEditing(false)}>Save</button>
                    )}
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    {product.ingredients && product.ingredients.map((ingredient, ingredientIndex) => (
                        <div key={ingredientIndex}>
                            <p>Name: {ingredient.name}</p>
                            <p>Quantity: {ingredient.quantity}</p>
                            {isEditing && ingredient.isEditable && (
                                <>
                                    <button onClick={() => decreaseQuantity(productIndex, ingredientIndex)}>-</button>
                                    <button onClick={() => increaseQuantity(productIndex, ingredientIndex)}>+</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}