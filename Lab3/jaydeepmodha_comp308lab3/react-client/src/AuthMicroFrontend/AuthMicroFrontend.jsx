import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import Login from './Login';
import Signup from './Signup';

import './AuthMicroFrontend.css';

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

function AuthMicroFrontend({ isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser }) {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Use Apollo Client's useLazyQuery to fetch the current user on demand
  const [fetchCurrentUser, { loading, error }] = useLazyQuery(GET_CURRENT_USER, {
    onCompleted: (data) => {
      console.log('Current User Data:', data);
      if (data.currentUser) {
        console.log('Current User', data.currentUser);
        setCurrentUser(data.currentUser);
        setIsAuthenticated(true);
      }
    },
    onError: () => {
      console.error('Error fetching current user:', error);
      setIsAuthenticated(false);
      setCurrentUser(null);
    },
    fetchPolicy: 'network-only', // Ensure the query is always sent to the server
  });

  const [logout] = useMutation(LOG_OUT, {
    onCompleted: () => {
      console.log('Logout successful');
      setIsAuthenticated(false);
      setCurrentUser(null);
      navigate('/'); // Redirect to the home page after logout
    },
    onError: (error) => {
      console.error('Error during logout:', error);
    },
  });

  // Fetch the current user when isAuthenticated becomes true
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    fetchCurrentUser(); // Fetch current user data
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout(); // Call the logout mutation
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
      {/* Routes */}
      <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<LogoutHandler handleLogout={handleLogout} />} />
      </Routes>
    </div>
  );
}

// Component to handle logout logic
function LogoutHandler({ handleLogout }) {
  useEffect(() => {
    console.log('Logging out...');
    handleLogout(); // Call the logout function when this component is mounted
  }, [handleLogout]);

  return null; // Render nothing
}

// Welcome Component
function Welcome() {
  return (
    <>
      <h1 className="text-center mt-5">Welcome to Your Game Progress Tracker! 🎮</h1>
      <p>Please login or signup to continue.</p>
    </>
  );
}

export default AuthMicroFrontend;