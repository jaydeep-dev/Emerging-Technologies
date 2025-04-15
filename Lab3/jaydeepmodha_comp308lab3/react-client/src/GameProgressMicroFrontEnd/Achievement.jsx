import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import './Achievement.css'; // Import the CSS file

// Make a card flip anim here

const GET_ACHIEVEMENTS_QUERY = gql`
query Achievement($userId: ID!) {
  achievements(userId: $userId)
}
`;

function Achievement({ currentUser }) {
    const [achievements, setAchievements] = useState([]);

    const [achievementsQuery, { loading }] = useLazyQuery(GET_ACHIEVEMENTS_QUERY, {
        onCompleted: (data) => {
            console.log('Fetched Achievements Data:', data.achievements);
            setAchievements(data.achievements);
        },
        onError: (err) => {
            console.error('Error fetching Achievements:', err);
            setAchievements([]);
        },
        fetchPolicy: 'network-only',
    });

    async function FetchAchievements() {
        try {
            await achievementsQuery({
                variables: { userId: currentUser.id }
            });
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    }

    useEffect(() => {

        FetchAchievements();

        return () => null; // Cleanup interval on component unmount
    }, []);

    return (
        <Container className="achievement-container">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card className="achievement-card">
                        <Card.Body className="achievement-body">
                            <Card.Title className="achievement-title">Achievements</Card.Title>
                            <Card.Text className="achievement-text">
                                Track your progress toward unlocking achievements!
                            </Card.Text>
                            <Row className="achievement-bars">
                                {achievements.length === 0 && (
                                    <Col md={12} className="mb-12">
                                        <h5 className="achievement-text">You Haven't Unlocked Any Achievements ☹️</h5>
                                    </Col>
                                )}
                                {achievements.length !== 0 &&
                                    Object.keys(achievements).map((key, index) => (
                                        <Col md={12} key={index} className="mb-4">
                                            <h5 className="achievement-label">{key.replace('achievement', 'Achievement ')}:</h5>
                                            <ProgressBar
                                                now={Math.round(100)}
                                                label={`${achievements[key]}`}
                                                className="achievement-progress-bar"
                                                max={100}
                                                animated={true}

                                            />
                                        </Col>
                                    ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Achievement;