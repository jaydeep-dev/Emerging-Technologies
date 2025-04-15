import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import AuthMicrofrontend from './AuthMicroFrontend/AuthMicroFrontend'; ``
import Login from './AuthMicroFrontend/Login';
import Signup from './AuthMicroFrontend/Signup';

import GameProgress from './GameProgressMicroFrontEnd/GameProgress';
import Achievement from './GameProgressMicroFrontEnd/Achievement';
import Leaderboard from './GameProgressMicroFrontEnd/Leaderboard';
import SimulateGameProgress from './GameProgressMicroFrontEnd/SimulateGameProgress';

// Create an HTTP link to the GraphQL server
const authHttpLink = createHttpLink({
  uri: 'http://localhost:4001/graphql', // Replace with your GraphQL server URL
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
const authClient = new ApolloClient({
  link: authLink.concat(authHttpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(),
});

const gameProgressHttpLink = createHttpLink({
  uri: 'http://localhost:4002/graphql', // Replace with your GraphQL server URL
  credentials: 'include', // Include cookies in requests
});

const gameProgressClient = new ApolloClient({
  link: gameProgressHttpLink,
  cache: new InMemoryCache(),
});

// Define the GET_CURRENT_USER query
const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      role
    }
  }
`;

const LOG_OUT = gql`
  mutation Logout {
    logout
  }
`;

function Home() {

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate('/logout');
  };

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">🎮</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/game-progress">Game Progress</Nav.Link>
                  <Nav.Link as={Link} to="/achievement">Achievement</Nav.Link>
                  <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
                  <Nav.Link as={Link} to="/simulate">Simulate Game Progress</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes */}
      {!isAuthenticated &&
        <ApolloProvider client={authClient}>
          <AuthMicrofrontend authClient={authClient} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </ApolloProvider>
      }

      {isAuthenticated && currentUser && (
        <ApolloProvider client={gameProgressClient}>
          <Routes>
            <Route path="/" element={<GameProgress currentUser={currentUser} />} />
            <Route path="/game-progress" element={<GameProgress currentUser={currentUser} />} />
            <Route path="/achievement" element={<Achievement currentUser={currentUser} />} />
            <Route path="/leaderboard" element={<Leaderboard currentUser={currentUser} />} />
            <Route path="/simulate" element={<SimulateGameProgress currentUser={currentUser} />} />
          </Routes>
        </ApolloProvider>
      )}
    </div>
  );
}

export default Home;