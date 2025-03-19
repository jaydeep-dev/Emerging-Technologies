require('dotenv').config(); // Load environment variables
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const configureMongoose = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors'); // Import CORS middleware
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

  // Step 2: Create Express app
  const app = express();

  // Step 3: Add middleware
  app.use(cookieParser()); // Parse cookies
  app.use(authMiddleware); // Add authentication middleware

  // Enable CORS with best practices
  app.use(
    cors({
      origin: 'http://localhost:3000', // Replace with your frontend's URL
      credentials: true, // Allow cookies to be sent with requests
    })
  );

  // Step 4: Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
  await server.start();

  // Use Apollo Server as middleware with Express
  app.use(
    '/graphql',
    express.json(), // Parse JSON requests
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }), // Pass req and res to resolvers
    })
  );

  // Step 5: Start the Express server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
  });
};

// Start the server
startServer();
