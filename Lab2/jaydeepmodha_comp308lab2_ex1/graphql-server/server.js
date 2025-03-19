// server.js is the entry point for the GraphQL server. 
// It connects to MongoDB, creates an Apollo Server, and starts
// the server on port 4000.
require('dotenv').config(); // Load environment variables
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const configureMongoose = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const express = require('express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Get token from HTTP-only cookie
  if (token) {
    try {
      const user = jwt.verify(token, JWT_SECRET); // Verify token
      req.user = user; // Attach user info to the request
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }
  next();
};

// Initialize the application
const startServer = async () => {
  // Step 1: Connect to MongoDB
  await configureMongoose();

  // Step 2: Create Express app for cookie handling
  const app = express();
  app.use(cookieParser()); // Parse cookies
  app.use(authMiddleware); // Add authentication middleware

  // Step 3: Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }), // Pass req and res to resolvers
  });

  // Step 4: Start Apollo Server with Express
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({ req, res }), // Pass req and res to Apollo context
  });

  console.log(`🚀 GraphQL server ready at ${url}`);
};

// Start the server
startServer();

