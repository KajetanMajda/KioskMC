import React, { useReducer } from 'react';

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

interface State {
    product: Product;
}

interface Action {
    type: string;
    payload?: any;
}

const initialState: State = {
    product: {
        name: '',
        price: 0,
        quantity: 0,
        minQuantity: 0,
        maxQuantity: 0,
        ingredients: [],
    },
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_PRODUCT':
            return { ...state, product: action.payload };
        case 'INCREASE_PRODUCT_QUANTITY':
            if (state.product.quantity < state.product.maxQuantity) {
                return { ...state, product: { ...state.product, quantity: state.product.quantity + 1 } };
            }
            return state;
        case 'DECREASE_PRODUCT_QUANTITY':
            if (state.product.quantity > state.product.minQuantity) {
                return { ...state, product: { ...state.product, quantity: state.product.quantity - 1 } };
            }
            return state;
        case 'INCREASE_QUANTITY':
            const newIngredients = [...state.product.ingredients];
            if (
                newIngredients[action.payload].isEditable &&
                newIngredients[action.payload].quantity < newIngredients[action.payload].maxQuantity
            ) {
                newIngredients[action.payload].quantity++;
                return { ...state, product: { ...state.product, ingredients: newIngredients } };
            }
            return state;
        case 'DECREASE_QUANTITY':
            const newIngredients2 = [...state.product.ingredients];
            if (
                newIngredients2[action.payload].isEditable &&
                newIngredients2[action.payload].quantity > newIngredients2[action.payload].minQuantity
            ) {
                newIngredients2[action.payload].quantity--;
                return { ...state, product: { ...state.product, ingredients: newIngredients2 } };
            }
            return state;
        default:
            return state;
    }
}

export default function ProductDetailsEdit({ productProp }: { productProp: Product }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { product } = state;

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

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={decreaseProductQuantity}>-</button>
            <button onClick={increaseProductQuantity}>+</button>
            <button>Buy Now</button>
            <button>Continue shopping</button>

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