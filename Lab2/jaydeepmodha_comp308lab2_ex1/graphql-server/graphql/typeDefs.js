// typeDefs.js is a file that contains the GraphQL 
// schema definition language (SDL) that defines the types, 
// queries, and mutations that the GraphQL server supports. 
// The schema is defined using the GraphQL schema definition 
// language (SDL).
const typeDefs = `#graphql
  scalar Date

  enum Role {
    ADMIN
    PLAYER
  }

  enum TournamentStatus {
    UPCOMING
    ONGOING
    COMPLETED
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    role: Role!
  }

  type Player {
    id: ID!
    user: User!
    ranking: Int!
    tournaments: [Tournament]
  }

  type Tournament {
    id: ID!
    name: String!
    game: String!
    date: Date!
    players: [Player]
    status: TournamentStatus!
  }

  type Query {
    # User queries
    getUser(id: ID!): User

    # Tournament queries
    getTournament(id: ID!): Tournament
    getAllTournaments: [Tournament]

    # Player queries
    getPlayer(id: ID!): Player
    getAllPlayers: [Player]
  }

  type Mutation {
    # User mutations
    createUser(username: String!, password: String!, email: String!, role: Role!): User
    updateUser(id: ID!, username: String, password: String, email: String, role: Role): User
    deleteUser(id: ID!): String

    # Tournament mutations
    createTournament(name: String!, game: String!, date: Date!, status: TournamentStatus!): Tournament
    updateTournament(id: ID!, name: String, game: String, date: Date, status: TournamentStatus, playerId: ID): Tournament
    deleteTournament(id: ID!): String

    # Player mutations
    createPlayer(userId: ID!, ranking: Int!, tournamentId: ID): Player
    updatePlayer(id: ID!, ranking: Int): Player
    deletePlayer(id: ID!): String

    # Fetching mutations (custom use case)
    fetchUser(id: ID!): User
    fetchTournament(id: ID!): Tournament
    fetchPlayer(id: ID!): Player
  }
`;

module.exports = typeDefs;
