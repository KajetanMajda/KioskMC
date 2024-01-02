  // const handleInputChange = (productName: string, ingredientIndex: number, field: string, value: string) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) => {
  //       if (product.name === productName) {
  //         return {
  //           ...product,
  //           ingredients: product.ingredients.map((ingredient, index) => {
  //             if (index === ingredientIndex) {
  //               let newValue = value;
  //               if (field === 'quantity') {
  //                 const parsedValue = Number(value);
  //                 if (parsedValue < ingredient.minQuantity) {
  //                   newValue = String(ingredient.minQuantity);
  //                 } else if (parsedValue > ingredient.maxQuantity) {
  //                   newValue = String(ingredient.maxQuantity);
  //                 }
  //               }
  //               return {
  //                 ...ingredient,
  //                 [field]: field === 'quantity' ? Number(newValue) : field === 'price' ? Number(newValue) : newValue,
  //               };
  //             }
  //             return ingredient;
  //           }),
  //         };
  //       }
  //       return product;
  //     })
  //   );
  // };
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
  id: number;
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
    const confirmed = window.confirm('Are you sure you want to update it?');
    if (confirmed) {
      try {
        const productToUpdate = products.find((product) => product.name === productName);
        if (productToUpdate) {
          const response = await axios.put(`http://localhost:3030/products/update/${productToUpdate.id}`, { newData: productToUpdate });
          console.log('Data sent successfully:', response.data);
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            <h3>
              {product.name}
              <button onClick={() => handleSendClick(product.name)}>Send</button>
            </h3>
            <p>
              Price:{' '}
              <input
                type="number"
                value={product.price}
                min={10}
                max={100}
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
                  <span>{ingredient.name} {'->'} </span>
                  {ingredient.isEditable ? (
                    <input
                      type="number"
                      value={ingredient.quantity}
                      min={0}
                      max={ingredient.maxQuantity}
                      onChange={(e) => handleInputChange(product.name, index, 'quantity', e.target.value)}
                    />
                  ) : (
                    <span>{ingredient.quantity} units</span>
                  )}
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