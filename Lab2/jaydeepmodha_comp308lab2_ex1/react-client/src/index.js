import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';

// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URL
  credentials: 'include', // Include cookies in requests
});

// Middleware to dynamically add the token to the headers
const authLink = setContext((_, { headers }) => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
