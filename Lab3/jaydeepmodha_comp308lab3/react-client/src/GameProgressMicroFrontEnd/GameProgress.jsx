import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './GameProgress.css'; // Import the CSS file
import { gql, useLazyQuery } from '@apollo/client';

const GET_GAME_PROGRESS_QUERY = gql`
query GameProgress($userId: ID!) {
  gameProgress(userId: $userId) {
    experiencePoints
    level
    rank
    score
    progress
    lastPlayed
  }
}
`;

function GameProgress({ currentUser }) {
    const [experiencePoints, setExperiencePoints] = useState(0);
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [rank, setRank] = useState(0);
    const [progress, setProgress] = useState("");
    const [lastPlayed, setLastPlayed] = useState("");

    const [gameProgress, { loading }] = useLazyQuery(GET_GAME_PROGRESS_QUERY, {
        onCompleted: (data) => {
            console.log('Fetched Game Progress Data:', data.gameProgress);
            const { experiencePoints, level, rank, score, progress, lastPlayed } = data.gameProgress;
            setExperiencePoints(experiencePoints);
            setLevel(level);
            setRank(rank);
            setScore(score);
            setProgress(progress);
            setLastPlayed(lastPlayed);
        },
        onError: (err) => {
            console.error('Error fetching game progress:', err);
        },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        console.log('currentUser', currentUser);
        fetchGameProgress();
    }, []);

    async function fetchGameProgress() {
        try {
            await gameProgress({
                variables: { userId: currentUser.id }, // Replace with actual user ID
            });
        } catch (error) {
            console.error('Error fetching game progress:', error);
        }
    }

    return (
        <Container className="game-progress-container">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card className="game-progress-card">
                        <Card.Body className="game-progress-body">
                            <Card.Title className="game-progress-title">Game Progress</Card.Title>
                            <Card.Text className="game-progress-text">
                                {currentUser.username}! Your Stats . . .
                            </Card.Text>
                            <Row className="game-progress-dials">
                                <Col md={6} className="d-flex justify-content-center">
                                    <RadialDial label={`EXP: ${Math.round(experiencePoints)}%`} radialValue={experiencePoints} max={100} />
                                </Col>
                                <Col md={6} className="d-flex justify-content-center">
                                    <RadialDial label={`Level: ${Math.round(level)}`} radialValue={level} max={10} />
                                </Col>
                                <Col md={6} className="d-flex justify-content-center">
                                    <RadialDial label={`Score: ${Math.round(score)}`} radialValue={score} max={1000} />
                                </Col>
                                <Col md={6} className="d-flex justify-content-center">
                                    <RadialDial label={`Rank: ${Math.round(rank)}`} radialValue={rank} max={25} />
                                </Col>
                            </Row>

                            <Row className="game-progress-currentProgress">
                                <Col md={6} className="d-flex justify-content-center align-items-center">
                                    <h5 className="game-progress-label">Current Progress: "{progress}"</h5>    
                                </Col>
                                <Col md={6} className="d-flex justify-content-center align-items-center">
                                    <h5 className="game-progress-label">
                                        Last Played: {lastPlayed ? new Date(Number(lastPlayed)).toLocaleDateString() : 'N/A'}
                                    </h5>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

function RadialDial({ label, radialValue, max }) {
    return (
        <div className="radial-progress-container">
            <div className="radial-dial">
                <CircularProgressbar
                    value={radialValue}
                    text={label}
                    maxValue={max}
                    styles={buildStyles({
                        textColor: '#FFD93D',
                        pathColor: '#FF8400',
                        trailColor: '#d6d6d6',
                        pathTransition: 'stroke-dashoffset 4s ease 0s',
                    })}
                />
            </div>
        </div>
    );
}

export default GameProgress;