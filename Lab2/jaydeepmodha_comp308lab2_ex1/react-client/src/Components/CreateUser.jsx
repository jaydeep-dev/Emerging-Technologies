import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

// GraphQL mutation to create a user
const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $role: Role!) {
    createUser(username: $username, password: $password, email: $email, role: $role) {
      id
      username
      email
      role
    }
  }
`;

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'PLAYER', // Default role
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      setSuccessMessage(`User "${data.createUser.username}" created successfully!`);
      setFormData({ username: '', password: '', email: '', role: 'PLAYER' });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: formData.role,
      },
    });
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Create User</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Username Field */}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Role Field */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="PLAYER">Player</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Create User'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateUser;