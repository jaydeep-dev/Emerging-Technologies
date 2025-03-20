import React, { useState, useEffect } from 'react';
import { Card, Col, Button, Spinner } from 'react-bootstrap';
import { gql, useMutation, useQuery } from '@apollo/client';
import EditTournament from './EditTournament'; // Import the EditTournament component
import './Tournament.css'; // Reuse the existing styles

// Define the createPlayer mutation
const CREATE_PLAYER = gql`
  mutation CreatePlayer($userId: ID!, $ranking: Int!, $tournamentId: ID!) {
    createPlayer(userId: $userId, ranking: $ranking, tournamentId: $tournamentId) {
      id
    }
  }
`;

// Define the fetchTournament query
const GET_TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    getTournament(id: $id) {
      id
      name
      game
      date
      status
      players {
        id
      }
    }
  }
`;

const Tournament = ({ tournamentId, currentUser, isJoinable, showEditBtn }) => {
  const [createPlayer, { loading: createLoading, error: createError }] = useMutation(CREATE_PLAYER);
  const { data, loading: fetchLoading, error: fetchError, refetch } = useQuery(GET_TOURNAMENT, {
    variables: { id: tournamentId },
    fetchPolicy: 'network-only', // Ensure fresh data is fetched from the server
  });

  const [hasJoined, setHasJoined] = useState(!isJoinable); // Track if the user has joined
  const [playerCount, setPlayerCount] = useState(0); // Track player count
  const [showEditModal, setShowEditModal] = useState(false);

  // Update player count when data is fetched
  useEffect(() => {
    if (data && data.getTournament) {
      setPlayerCount(data.getTournament.players.length);
    }
  }, [data]);

  const handleJoin = async () => {
    try {
      if (!currentUser) {
        alert('You must be logged in to join a tournament.');
        return;
      }

      // Create a new player
      await createPlayer({
        variables: {
          userId: currentUser.id, // Pass the current user's ID
          ranking: 0, // Default ranking for a new player
          tournamentId: tournamentId, // Pass the tournament ID
        },
      });

      // Refetch the tournament data to update the player count
      await refetch();

      // Update the joined state
      setHasJoined(true);
    } catch (err) {
      console.error('Error joining tournament:', err);
      alert('Failed to join the tournament. Please try again.');
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  if (fetchLoading) {
    return (
      <Col md={4} className="mb-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  if (fetchError) {
    return (
      <Col md={4} className="mb-4">
        <p className="text-danger">Error fetching tournament: {fetchError.message}</p>
      </Col>
    );
  }

  return (
    <Col md={4} className="mb-4">
      <Card className="tournament-card">
        <Card.Body>
          <Card.Title className="tournament-card-title">{data.getTournament.name}</Card.Title>
          <Card.Text className="tournament-card-text">
            <strong>Game:</strong> {data.getTournament.game}
          </Card.Text>
          <Card.Text className="tournament-card-text">
            <strong>Date:</strong> {new Date(data.getTournament.date).toLocaleDateString()}
          </Card.Text>
          <Card.Text className="tournament-card-text">
            <strong>Status:</strong> {data.getTournament.status}
          </Card.Text>
          <Card.Text className="tournament-card-text">
            <strong>Player Count:</strong> {playerCount}
          </Card.Text>
          <Button
            variant={hasJoined ? 'success' : 'primary'} // Change button color to green if joined
            onClick={handleJoin}
            disabled={hasJoined || createLoading} // Disable button if joined or loading
          >
            {hasJoined ? 'Joined' : createLoading ? 'Joining...' : 'Join Tournament'}
          </Button>
          {currentUser?.role === 'ADMIN' && showEditBtn && ( // Conditionally render the Edit button for ADMIN users
            <Button
            variant="warning"
            onClick={handleEdit}
            >
              Edit
            </Button>
          )}
          {createError && <p className="text-danger mt-2">Error: {createError.message}</p>}
        </Card.Body>
      </Card>
      <EditTournament
        tournament={data.getTournament}
        show={showEditModal}
        handleClose={handleCloseEditModal}
        refetch={refetch}
      />
    </Col>
  );
};

export default Tournament;