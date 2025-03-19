import React from 'react';
import { Card, Col } from 'react-bootstrap';
import './Tournament.css'; // Reuse the existing styles

const Tournament = ({ tournament }) => {
  return (
    <Col md={4} className="mb-4">
      <Card className="tournament-card">
        <Card.Body>
          <Card.Title className="tournament-card-title">{tournament.name}</Card.Title>
          <Card.Text className="tournament-card-text">
            <strong>Game:</strong> {tournament.game}
          </Card.Text>
          <Card.Text className="tournament-card-text">
            <strong>Date:</strong> {new Date(tournament.date).toLocaleDateString()}
          </Card.Text>
          <Card.Text className="tournament-card-text">
            <strong>Status:</strong> {tournament.status}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Tournament;