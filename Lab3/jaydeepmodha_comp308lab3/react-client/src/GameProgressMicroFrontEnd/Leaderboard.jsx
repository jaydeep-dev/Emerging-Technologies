import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import './Leaderboard.css'; // Import the CSS file

const GET_LEADERBOARD_QUERY = gql`
query Leaderboard {
    leaderboard {
    userId
    score
    experiencePoints
    level
  }
}
`;

function Leaderboard({ currentUser }) {
    // Generate 50 mock rank data
    const [leaderboardData, setLeaderboardData] = useState([]);

    const [leaderboardQuery, { loading }] = useLazyQuery(GET_LEADERBOARD_QUERY, {
        onCompleted: (data) => {
            console.log('Fetched Leaderboard Data:', data.leaderboard);
            setLeaderboardData(data.leaderboard)
        },
        onError: (err) => {
            console.error('Error fetching Leaderboard:', err);
            
        },
        fetchPolicy: 'network-only',
    });

    async function FetchLeaderboard() {
        try {
            await leaderboardQuery();
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        }
    }

    const [visibleRows, setVisibleRows] = useState(0); // Tracks how many rows are visible
    useEffect(() => {

        FetchLeaderboard();

        setVisibleRows(0); // Reset visible rows on data change

        const interval = setInterval(() => {
            setVisibleRows((prev) => {
                if (prev < leaderboardData.length) {
                    return prev + 1; // Show one more row
                } else {
                    clearInterval(interval); // Stop the interval when all rows are visible
                    return prev;
                }
            });
        }, 50); // Delay of 50ms between rows

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [leaderboardData.length]);

    return (
        <Container className="leaderboard-container">
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card className="leaderboard-card">
                        <Card.Body className="leaderboard-body">
                            <Card.Title className="leaderboard-title">Leaderboard</Card.Title>
                            <Card.Text className="leaderboard-text">
                                Top Players
                            </Card.Text>
                            <div className="table-responsive">
                                <Table striped borderless hover className="leaderboard-table">
                                    <thead>
                                        <tr>
                                            <th>Leaderboard Rank</th>
                                            <th>Player</th>
                                            <th>Score</th>
                                            <th>EXP</th>
                                            <th>Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboardData.slice(0, visibleRows).map((player, index) => (
                                            <tr
                                                key={player.userId}
                                                className={`leaderboard-row ${
                                                    player.userId === currentUser.id ? 'current-player-row' : ''
                                                }`} // Add a special class for the current player
                                            >
                                                <td>#{index + 1}</td>
                                                <td>{player.userId === currentUser.id ? currentUser.username : `Player ${index + 1}`}</td>
                                                <td>{player.score}</td>
                                                <td>{player.experiencePoints}</td>
                                                <td>{player.level}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Leaderboard;