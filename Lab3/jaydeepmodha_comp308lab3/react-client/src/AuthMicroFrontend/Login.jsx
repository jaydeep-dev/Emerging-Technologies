import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './Login.css'; // Optional: Add additional styles if needed

// Define the LOGIN mutation
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
    {
        id
        username
        role
    }
  }
`;

const Login = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Use the useMutation hook
    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            console.log('Login successful:', data.login.id);
            navigate('/'); // Redirect to the home page
            setIsLoggedIn(true); // Update authentication state
        },
        onError: (err) => {
            setError(err.message);
            setIsLoggedIn(false); // Update authentication state
            console.error('Login error:', err.message);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login({
                variables: {
                    username: formData.username,
                    password: formData.password,
                },
            });
        } catch (err) {
            console.error('Error during login:', err);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <Container className="login-container mt-5">
            <h1 className="text-center mb-4">Login</h1>
            <Form onSubmit={handleSubmit} className="login-form">
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
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
        </Container>
    );
};

export default Login;