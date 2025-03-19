import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';

// GraphQL mutation to create a tournament
const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($name: String!, $game: String!, $date: Date!, $status: TournamentStatus!) {
    createTournament(name: $name, game: $game, date: $date, status: $status) {
      id
      name
      game
      date
      status
    }
  }
`;

const CreateTournament = () => {
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    date: '',
    status: 'UPCOMING',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createTournament, { loading }] = useMutation(CREATE_TOURNAMENT, {
    onCompleted: (data) => {
      setSuccessMessage(`Tournament "${data.createTournament.name}" created successfully!`);
      setFormData({ name: '', game: '', date: '', status: 'UPCOMING' });
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
    createTournament({
      variables: {
        name: formData.name,
        game: formData.game,
        date: formData.date,
        status: formData.status,
      },
    });
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Create Tournament</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Tournament Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tournament name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGame">
          <Form.Label>Game</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter game name"
            name="game"
            value={formData.game}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Create Tournament'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTournament;