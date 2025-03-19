import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './Signup.css'; // Optional: Add additional styles for the signup form

// Define the CREATE_USER mutation
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $role: Role!) {
    createUser(username: $username, password: $password, email: $email, role: $role) {
      id
      username
      email
    }
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Use the useMutation hook
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      alert('Signup successful!');
      navigate('/login'); // Redirect to login page after successful signup
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    createUser({
      variables: {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: 'PLAYER', // Default role
      },
    });
  };

  return (
    <Container className="signup-container mt-5">
      <h1 className="text-center mb-4">Signup</h1>
      <Form onSubmit={handleSubmit} className="signup-form">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;