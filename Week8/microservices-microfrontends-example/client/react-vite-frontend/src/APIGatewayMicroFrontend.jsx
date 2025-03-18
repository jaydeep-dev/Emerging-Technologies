// APIGatewayMicroFrontend.js
import React, { useEffect, useState } from 'react';

function APIGatewayMicroFrontend() {
  const [products, setProducts] = useState(null);
  const [loginStatus, setLoginStatus] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/products');
        console.log('response', response);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  async function handleLogin() {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
      });
      const data = await response.text();
      setLoginStatus(data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <div>
      <h2>Product Microservice</h2>
      {products ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}

      <h2>User Authentication Microservice</h2>
      <button onClick={handleLogin}>Login</button>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
}

export default APIGatewayMicroFrontend;
