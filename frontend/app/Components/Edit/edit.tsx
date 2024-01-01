import { useEffect, useState } from 'react';
import axios from 'axios';

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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:3030/productsAll'); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (productName: string, ingredientIndex: number, field: string, value: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.name === productName) {
          return {
            ...product,
            [field]: field === 'quantity' ? Number(value) : value,
            ingredients: product.ingredients.map((ingredient, index) => {
              if (index === ingredientIndex) {
                return {
                  ...ingredient,
                  [field]: field === 'quantity' ? Number(value) : value,
                };
              }
              return ingredient;
            }),
          };
        }
        return product;
      })
    );
  };

  const handleSendClick = async (productName: string) => {
    try {
        const productToUpdate = products.find((product) => product.name === productName);
        if (productToUpdate) {
            const response = await axios.put(`http://localhost:3030/products/update/${productName}`, { newData: productToUpdate });
            console.log('Data sent successfully:', response.data);
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
};

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            <h3>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleInputChange(product.name, 0, 'name', e.target.value)}
              />
              <button onClick={() => handleSendClick(product.name)}>Send</button>
            </h3>
            <p>
              Price:{' '}
              <input
                type="number"
                value={product.price}
                onChange={(e) => handleInputChange(product.name, 0, 'price', e.target.value)}
              />
            </p>
            {/* <p>
              Quantity:{' '}
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleInputChange(product.name, 0, 'quantity', e.target.value)}
              />
            </p> */}
            <p>Ingredients:</p>
            <ul>
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleInputChange(product.name, index, 'name', e.target.value)}
                  />{' ->'}
                  {' '}
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) => handleInputChange(product.name, index, 'quantity', e.target.value)}
                  />{' '}
                  units
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
