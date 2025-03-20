import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Modal, Button, Form } from 'react-bootstrap';

// Define the updateTournament mutation
const UPDATE_TOURNAMENT = gql`
  mutation UpdateTournament($id: ID!, $name: String, $game: String, $date: Date, $status: TournamentStatus) {
    updateTournament(id: $id, name: $name, game: $game, date: $date, status: $status) {
      id
      name
      game
      date
      status
    }
  }
`;

const EditTournament = ({ tournament, show, handleClose, refetch }) => {
  const [formData, setFormData] = useState({
    name: tournament.name,
    game: tournament.game,
    date: tournament.date,
    status: tournament.status,
  });

  const [updateTournament, { loading, error }] = useMutation(UPDATE_TOURNAMENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTournament({
        variables: {
          id: tournament.id,
          ...formData,
        },
      });
      refetch(); // Refetch the tournament data after updating
      handleClose(); // Close the modal
    } catch (err) {
      console.error('Error updating tournament:', err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tournament</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTournamentName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTournamentGame">
            <Form.Label>Game</Form.Label>
            <Form.Control
              type="text"
              name="game"
              value={formData.game}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTournamentDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date.split('T')[0]} // Format date for input
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTournamentStatus">
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
          {error && <p className="text-danger">Error: {error.message}</p>}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTournament;