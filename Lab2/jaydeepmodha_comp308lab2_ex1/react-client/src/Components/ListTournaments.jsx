import { useQuery, gql } from '@apollo/client';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import Tournament from './Tournament'; // Import the Tournament component
import './ListTournaments.css'; // Optional: Add custom styles if needed

// GraphQL query to fetch all tournaments
const GET_ALL_TOURNAMENTS = gql`
  query GetAllTournaments {
    getAllTournaments {
      id
    }
  }
`;

// GraphQL query to fetch all players
const GET_ALL_PLAYERS = gql`
  query GetAllPlayers {
    getAllPlayers {
      id
      user {
        id
      }
      tournaments {
        id
      }
    }
  }
`;

const ListTournaments = ({ currentUser }) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_TOURNAMENTS, {
    fetchPolicy: 'network-only', // Always fetch fresh data from the server
  });

  const AllPlayerQuery = useQuery(GET_ALL_PLAYERS, {
    fetchPolicy: 'network-only', // Always fetch fresh data from the server
  });

  if (loading || AllPlayerQuery.loading) {
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

  // Extract the list of tournament IDs joined by the current user
  const joinedTournamentIds = AllPlayerQuery.data.getAllPlayers
    .filter((player) => player.user.id === currentUser.id) // Filter players for the current user
    .flatMap((player) => player.tournaments.map((tournament) => tournament.id)); // Extract tournament IDs

  return (
    <Container className="tournament-container">
      <h1 className="tournament-title">All Tournaments</h1>
      <Row>
        {data.getAllTournaments.length > 0 ? (
          data.getAllTournaments.map((tournament) => {
            // Check if the tournament ID exists in the joinedTournamentIds array
            const isJoinable = !joinedTournamentIds.includes(tournament.id);

            return (
              <Tournament
                key={tournament.id}
                tournamentId={tournament.id}
                currentUser={currentUser}
                isJoinable={isJoinable}
              />
            );
          })
        ) : (
          <p className="text-center mt-5">There are no tournaments going on! Check back later!</p>
        )}
      </Row>
    </Container>
  );
};

export default ListTournaments;