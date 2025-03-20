import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import Login from './Login';
import Signup from './Signup';

// Admin Components
import CreateUser from './CreateUser';
import CreateTournament from './CreateTournament';

// User Components
import ListTournaments from './ListTournaments';
import MyTournaments from './MyTournaments';

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
  const navigate = useNavigate(); // Initialize useNavigate

  // Use Apollo Client's useLazyQuery to fetch the current user on demand
  const [fetchCurrentUser, { data, loading, error }] = useLazyQuery(GET_CURRENT_USER, {
    onCompleted: (data) => {
      if (data.getCurrentUser) {
        console.log('Current User', data.getCurrentUser);
        setCurrentUser(data.getCurrentUser);
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
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
      fetchCurrentUser();
    }
  }, [isAuthenticated, fetchCurrentUser]);

  const handleLogout = () => {
    // Clear the token cookie
    document.cookie = 'token=; Max-Age=0; path=/;'; // Clear the cookie
    setIsAuthenticated(false); // Update state
    setCurrentUser(null); // Clear user data
    navigate('/'); // Redirect to root
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
    <div className="App">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">GT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated && currentUser && currentUser?.role === 'ADMIN' && (
                <>
                  <Nav.Link as={Link} to="/create-user">Create User</Nav.Link>
                  <Nav.Link as={Link} to="/create-tournament">Create Tournament</Nav.Link>
                </>
              )}
              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/my-tournaments">My Tournaments</Nav.Link>
                  <Nav.Link as={Link} to="/tournaments">List Tournaments</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Converted to Nav.Link */}
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
        {currentUser && currentUser.role === 'ADMIN' && (
          <>
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='/create-tournament' element={<CreateTournament />} />
          </>
        )}
        {isAuthenticated && (
          <>
            <Route path="/tournaments" element={<ListTournaments currentUser={currentUser} />} />
            <Route path='/my-tournaments' element={<MyTournaments currentUser={currentUser} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

// Welcome Component
function Welcome({ user }) {
  if (user !== null) {
    return (
      <>
        <h1 className="text-center mt-5">Welcome to Game Tournament, {user?.username}!</h1>
        <p>
          To join tournament go to List Tournaments and click join tournament button.
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