import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import Tournament from './Tournament'; // Reuse the Tournament component
import './ListTournaments.css'; // Optional: Add custom styles if needed

const GET_ALL_PLAYERS = gql`
  query GetAllPlayers {
    getAllPlayers {
      id
      user {
        id
      }
      tournaments {
        id
        name
        game
        date
        status
      }
    }
  }
`;

const MyTournaments = ({ currentUser }) => {
  const { loading, error, data } = useQuery(GET_ALL_PLAYERS, {
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

  // Filter players where the current user is a participant
  const myPlayerDataList = data.getAllPlayers.filter((player) => player.user.id === currentUser.id);

  return (
    <Container className="tournament-container">
      <h1 className="tournament-title">My Tournaments</h1>
      <Row>
        {myPlayerDataList.length > 0 ? (
          myPlayerDataList.map((myPlayerData) =>
            myPlayerData.tournaments.map((tournament) => (
              <Tournament
                key={tournament.id}
                tournamentId={tournament.id}
                currentUser={currentUser}
                isJoinable={false}
                showEditBtn={false}
              />
            ))
          )
        ) : (
          <p className="text-center mt-5">You have not joined any tournaments yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default MyTournaments;