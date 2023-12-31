import React, { useReducer } from 'react';
import Link from 'next/link';

interface Ingredient {
    name: string;
    quantity: number;
    isEditable: boolean;
    minQuantity: number;
    maxQuantity: number;
}

interface Product {
    name: string;
    price: number;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;
    ingredients: Ingredient[];
}

type Action = 
    | { type: 'SET_PRODUCT', payload: Product }
    | { type: 'INCREASE_PRODUCT_QUANTITY' }
    | { type: 'DECREASE_PRODUCT_QUANTITY' }
    | { type: 'INCREASE_QUANTITY', payload: number }
    | { type: 'DECREASE_QUANTITY', payload: number };

function productReducer(product: Product, action: Action): Product {
    let ingredients;
    switch (action.type) {
        case 'SET_PRODUCT':
            return action.payload;
        case 'INCREASE_PRODUCT_QUANTITY':
            if (product.quantity < product.maxQuantity) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        case 'DECREASE_PRODUCT_QUANTITY':
            if (product.quantity > product.minQuantity) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
            case 'INCREASE_QUANTITY':
                ingredients = [...product.ingredients];
                if (ingredients[action.payload].quantity < ingredients[action.payload].maxQuantity) {
                    ingredients[action.payload].quantity += 1;
                }
                return { ...product, ingredients };
            case 'DECREASE_QUANTITY':
                ingredients = [...product.ingredients];
                if (ingredients[action.payload].quantity > ingredients[action.payload].minQuantity) {
                    ingredients[action.payload].quantity -= 1;
                }
                return { ...product, ingredients };
            default:
                return product;
        }
    }
type CartAction = 
| { type: 'ADD_TO_CART', payload: Product }
| { type: 'REMOVE_FROM_CART', payload: number }
| { type: 'CLEAR_CART' };

function cartReducer(cart: Product[], action: CartAction): Product[] {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newCart = [...cart, action.payload];
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        case 'REMOVE_FROM_CART':
            const updatedCart = [...cart];
            updatedCart.splice(action.payload, 1);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        case 'CLEAR_CART':
            localStorage.removeItem('cart');
            return [];
        default:
            return cart;
    }
}

export default function ProductDetailsEdit({ productProp }: { productProp: Product }) {
    const [product, dispatch] = useReducer(productReducer, {...productProp, quantity:1});
    const initialCart = localStorage.getItem('cart');
    const [cart, dispatchCart] = useReducer(cartReducer, initialCart ? JSON.parse(initialCart) : []);

    React.useEffect(() => {
        dispatch({ type: 'SET_PRODUCT', payload: productProp });
    }, [productProp]);

    const increaseProductQuantity = () => {
        dispatch({ type: 'INCREASE_PRODUCT_QUANTITY' });
    };

    const decreaseProductQuantity = () => {
        dispatch({ type: 'DECREASE_PRODUCT_QUANTITY' });
    };

    const increaseQuantity = (index: number) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: index });
    };

    const decreaseQuantity = (index: number) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: index });
    };

    if (!product || !product.ingredients) {
        return <div>Loading...</div>;
    }

    const addToCart = () => {
        dispatchCart({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={decreaseProductQuantity}>-</button>
            <button onClick={increaseProductQuantity}>+</button>
            <Link href='/home'>
                <button onClick={addToCart}>Add to basket</button>
                <button>Cancel</button>
            </Link>

            {product.ingredients.map((ingredient, index) => (
                <div key={index}>
                    <p>Name: {ingredient.name}</p>
                    <p>Quantity: {ingredient.quantity}</p>
                    {ingredient.isEditable && (
                        <>
                            <button onClick={() => decreaseQuantity(index)}>-</button>
                            <button onClick={() => increaseQuantity(index)}>+</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}