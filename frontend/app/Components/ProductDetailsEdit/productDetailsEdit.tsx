import React, { useReducer } from 'react';
import './productDetailsEdit.css';
import Link from 'next/link';
import Footer from "../Footer/footer";

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
    const [product, dispatch] = useReducer(productReducer, { ...productProp, quantity: 1 });
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
        <div className="main-container-deatails">
            <div className="nav-container-details-div">
                <nav className="navbar-container-deatails">
                    <div className="left-container-deatails">
                        <button className="button-qunatity-deatails" onClick={decreaseProductQuantity}>-</button>
                        <button className="button-qunatity-deatails" onClick={increaseProductQuantity}>+</button>
                        <p className="product-qunatity-deatails">Quantity: {product.quantity}</p>
                    </div>
                    <div className="center-container-deatails">
                        <h2 className="product-name-and-price-deatails">{product.name} Price:{product.price}€</h2>
                    </div>
                    <div className="right-container-deatails">
                        <Link href='/home'>
                            <button className="navbar-button-deatails" onClick={addToCart}>Add to basket</button>
                            <button className="navbar-button-deatails">Back</button>
                        </Link>
                    </div>
                </nav>
            </div>


            <div className="ingredients-deatails">
                {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item-deatails">
                        <p className="ingredient-info-deatails">Name: {ingredient.name}</p>
                        <p className="ingredient-info-deatails">Quantity: {ingredient.quantity}</p>
                        {ingredient.isEditable && (
                            <>
                                <button className="ingredient-button-deatails" onClick={() => increaseQuantity(index)}>+</button>
                                <button className="ingredient-button-deatails" onClick={() => decreaseQuantity(index)}>-</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="footer-container-detailProduct">
                <Footer />
            </div>
        </div>
    );


}