// server/product-microservice.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//
const mongoose = require('mongoose');

// MongoDB connection setup
const mongoUri = 'mongodb://localhost:27017/JaydeepModha-COMP308Lab3-gameprogress-service-db'; // Replace with your MongoDB URI
console.log('MONGO_URI_GAMEPROGRESS:', mongoUri);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Merge type definitions and resolvers
const typeDefs = require('../graphql/typedefs/gameprogress_typeDefs');
const resolvers = require('../graphql/resolvers/gameprogress_resolvers');

// Initialize express and configure middleware
const app = express();
const PORT = 4002;
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://studio.apollographql.com'],
  credentials: true,
}));
app.use(cookieParser());

// Create and start Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.cookies['token'];
    if (token) {
      try {
        const user = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
        return { user };
      } catch (e) {
        throw new Error('Your session expired. Sign in again.');
      }
    }
  },
});
//


server.start().then(() => {
  server.applyMiddleware({ app, cors: false });
  app.listen(PORT, async () => {
    console.log(`Game progress - Microservice ready! 🚀`)
  }
  );
});
