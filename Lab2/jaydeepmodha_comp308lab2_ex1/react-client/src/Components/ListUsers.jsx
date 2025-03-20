import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import './ListTournaments.css'; // Optional: Reuse styles from ListTournaments

// GraphQL query to fetch all tournaments with players and users
const GET_ALL_TOURNAMENTS_WITH_PLAYERS = gql`
  query GetAllTournamentsWithPlayers {
    getAllTournaments {
      id
      name
      game
      date
      status
      players {
        id
        user {
          id
          username
        }
      }
    }
  }
`;

const ListUsers = () => {
  const { loading, error, data } = useQuery(GET_ALL_TOURNAMENTS_WITH_PLAYERS, {
    fetchPolicy: 'network-only', // Always fetch fresh data from the server
  });

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
      <h1 className="tournament-title">Tournaments with Players</h1>
      <Row>
        {data.getAllTournaments.length > 0 ? (
          data.getAllTournaments.map((tournament) => (
            <Col md={6} lg={4} key={tournament.id} className="mb-4">
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
                  <Card.Text className="tournament-card-text">
                    <strong>Players:</strong>
                    {tournament.players.length > 0 ? 
                        tournament.players.map((player) => (
                          <li key={player.id}>
                            {player.user.username}
                          </li>
                        ))
                     : (
                      <span> No players joined yet.</span>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center mt-5">No tournaments available!</p>
        )}
      </Row>
    </Container>
  );
};

export default ListUsers;