const { gql } = require('apollo-server-express');

const gameProgressTypeDefs = gql`
  type GameProgress {
    _id: ID!
    userId: ID!
    level: Int!
    experiencePoints: Int!
    score: Int!
    rank: Int
    achievements: [String]
    progress: String
    lastPlayed: String
    createdAt: String
    updatedAt: String
  }

  input GameProgressInput {
    level: Int
    experiencePoints: Int
    score: Int
    rank: Int
    achievements: [String]
    progress: String
    lastPlayed: String
  }

  type Query {
    leaderboard: [GameProgress]
    achievements(userId: ID!): [String]
    gameProgress(userId: ID!): GameProgress
  }

  type Mutation {
    updateGameProgress(userId: ID!, updates: GameProgressInput!): GameProgress
    addAchievement(userId: ID!, achievement: String!): GameProgress
    addGameProgress(userId: ID!, gameProgress: GameProgressInput!): GameProgress
  }
`;

module.exports = gameProgressTypeDefs;