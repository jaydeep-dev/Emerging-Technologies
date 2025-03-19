import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import Tournament from './Tournament'; // Import the Tournament component
import './ListTournaments.css'; // Optional: Add custom styles if needed

// GraphQL query to fetch all tournaments
const GET_ALL_TOURNAMENTS = gql`
  query GetAllTournaments {
    getAllTournaments {
      id
      name
      game
      date
      status
    }
  }
`;

const ListTournaments = () => {
  const { loading, error, data } = useQuery(GET_ALL_TOURNAMENTS);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error fetching tournaments: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container className="tournament-container">
      <h1 className="tournament-title">All Tournaments</h1>
      <Row>
        {data.getAllTournaments.map((tournament) => (
          <Tournament key={tournament.id} tournament={tournament} />
        ))}
      </Row>
    </Container>
  );
};

export default ListTournaments;