import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Spinner } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import Login from './Login';
import Signup from './Signup';
import ListTournaments from './ListTournaments';
import CreateTournament from './CreateTournament';
import './Home.css';

// Define the GET_CURRENT_USER query
const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
      email
      role
    }
  }
`;

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Use Apollo Client's useLazyQuery to fetch the current user on demand
  const [fetchCurrentUser, { data, loading, error }] = useLazyQuery(GET_CURRENT_USER, {
    onCompleted: (data) => {
      if (data.getCurrentUser) {
        console.log(data.getCurrentUser);
        setCurrentUser(data.getCurrentUser);
        Welcome(data.getCurrentUser);
      }
    },
    onError: () => {
      console.error('Error fetching current user:', error);
      setIsAuthenticated(false);
      setCurrentUser(null);
    },
    fetchPolicy: 'network-only', // Ensure the query is always sent to the server
  });

  // Fetch the current user when isAuthenticated becomes true
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      fetchCurrentUser();
    }
  }, [isAuthenticated, fetchCurrentUser]);

  const handleLogout = () => {
    // Clear the token cookie
    document.cookie = 'token=; Max-Age=0; path=/;'; // Clear the cookie
    setIsAuthenticated(false); // Update state
    setCurrentUser(null); // Clear user data
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    console.error('Error fetching current user:', error);
  }

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">GT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {isAuthenticated && currentUser?.role === 'ADMIN' && (
                  <Nav.Link as={Link} to="/create-tournament">Create Tournament</Nav.Link>
                )}
                {isAuthenticated ? (
                  <>
                    <Nav.Link as={Link} to="/tournaments">List Tournaments</Nav.Link>
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
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
        <Routes>
          <Route path="/" element={<Welcome user={currentUser} />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tournaments" element={isAuthenticated && <ListTournaments />} />
          <Route path='/create-tournament' element={<CreateTournament />} />
        </Routes>
      </div>
    </Router>
  );
}

// Welcome Component
function Welcome({ user }) {
  if (user !== null) {
    return (
      <>
        <h1 className="text-center mt-5">Welcome to Game Tournament, {user?.username}!</h1>
        <p>
          To join tournament go to List Tournaments and click on the tournament you want to join.
        </p>
      </>
    );
  } else {
    return (
      <>
        <h1 className="text-center mt-5">Welcome to Game Tournament!</h1>
        <p>
          Please login or signup to continue
        </p>
      </>
    );
  }
}

export default Home;