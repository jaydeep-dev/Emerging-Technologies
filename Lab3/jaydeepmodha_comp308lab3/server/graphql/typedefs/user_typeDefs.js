import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    role: String!
  }

  type Query {
    currentUser: User
    authMessage: String
  }
    
  type Mutation {
    login(username: String!, password: String!): User
    register(username: String!, password: String!, email: String!): User
    logout: Boolean
  }
`;

export default typeDefs;