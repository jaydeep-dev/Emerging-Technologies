// server/auth-microservice.js
require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../graphql/models/User/User.js');
const typeDefs = require('../graphql/typedefs/user_typeDefs').default;
const resolvers = require('../graphql/resolvers/user_resolvers');
//
const app = express();
const PORT = 4001;
//
// Add cors middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001',
    'http://localhost:3002', 'https://studio.apollographql.com'], // Adjust the origin according to your micro frontends' host
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());

// MongoDB connection setup
const mongoUri = 'mongodb://localhost:27017/JaydeepModha-COMP308Lab3-auth-service-db';
console.log('MONGO_URI_AUTH:', mongoUri);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const ensureAdminExists = async () => {
  const existingAdmin = await User.findOne({ role: "ADMIN" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("1234567890", 10); // Hash the password
    const user = new User({ username: "admin", email: "admin@admin.com", password: hashedPassword, role: "ADMIN", createdAt: Date.now() });
    await user.save();
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });
  //
  app.listen(PORT, async () => {
    await ensureAdminExists();
    console.log(`🚀 Auth Server ready at http://localhost:4001${server.graphqlPath}`)
  });
});


