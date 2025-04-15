import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import './SimulateGameProgress.css'; // Import the new CSS file

const GET_GAME_PROGRESS_QUERY = gql`
  query GameProgress($userId: ID!) {
    gameProgress(userId: $userId) {
      experiencePoints
      level
      rank
      score
      achievements
      progress
      lastPlayed
    }
  }
`;

const UPDATE_GAME_PROGRESS_MUTATION = gql`
  mutation UpdateGameProgress($userId: ID!, $gameProgress: GameProgressInput!) {
    updateGameProgress(userId: $userId, updates: $gameProgress) {
      level
      experiencePoints
      score
      rank
      achievements
      progress
      lastPlayed
      createdAt
      updatedAt
      lastPlayed
    }
  }
`;

function SimulateGameProgress({ currentUser }) {
  const [level, setLevel] = useState('');
  const [experiencePoints, setExperiencePoints] = useState('');
  const [score, setScore] = useState('');
  const [rank, setRank] = useState('');
  const [achievements, setAchievements] = useState('');
  const [progress, setProgress] = useState('');

  const [gameProgress, { loading: loadingQuery }] = useLazyQuery(GET_GAME_PROGRESS_QUERY, {
    onCompleted: (data) => {
      const { experiencePoints, level, rank, score, achievements, progress } = data.gameProgress;
      console.log('Game Progress Data:', data.gameProgress);
      setExperiencePoints(experiencePoints);
      setLevel(level);
      setRank(rank);
      setScore(score);
      setAchievements(achievements.join(', ')); // Convert array to comma-separated string
      setProgress(progress);
    },
    onError: (err) => {
      console.error('Error fetching game progress:', err);
    },
    fetchPolicy: 'network-only',
  });

  const [updateGameProgress, { loading: loadingMutation, error }] = useMutation(UPDATE_GAME_PROGRESS_MUTATION, {
    onCompleted: (data) => {
      console.log('Game progress updated:', data.updateGameProgress);
      alert('Game progress updated successfully!');
    },
    onError: (err) => {
      console.error('Error updating game progress:', err);
      alert('Failed to update game progress.');
    },
  });

  useEffect(() => {
    console.log('currentUser', currentUser);
    fetchGameProgress();
  }, []);

  async function fetchGameProgress() {
    try {
      await gameProgress({
        variables: { userId: currentUser.id },
      });
    } catch (error) {
      console.error('Error fetching game progress:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    updateGameProgress({
      variables: {
        userId: currentUser.id,
        gameProgress: {
          level: parseInt(level),
          experiencePoints: parseInt(experiencePoints),
          score: parseInt(score),
          rank: parseInt(rank),
          achievements: achievements.split(',').map((achievement) => achievement.trim()), // Convert string to array
          progress,
        },
      },
    });
  };

  return (
    <Container className="simulate-game-progress-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="simulate-game-progress-card">
            <Card.Body className="simulate-game-progress-body">
              <Card.Title className="simulate-game-progress-title">Update Game Progress</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formLevel">
                  <Form.Label>Level</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formExperiencePoints">
                  <Form.Label>Experience Points</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter experience points"
                    value={experiencePoints}
                    onChange={(e) => setExperiencePoints(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formScore">
                  <Form.Label>Score</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRank">
                  <Form.Label>Rank</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter rank"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAchievements">
                  <Form.Label>Achievements</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter achievements (comma-separated)"
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formProgress">
                  <Form.Label>Progress</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter progress (e.g., 50%, Boss defeated, etc.)"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loadingMutation}>
                  {loadingMutation ? 'Updating...' : 'Update Progress'}
                </Button>
              </Form>
              {error && <p className="text-danger mt-3">Error: {error.message}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SimulateGameProgress;