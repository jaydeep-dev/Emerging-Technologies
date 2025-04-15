const User = require('../models/User/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const resolvers = {
  Query: {
    authMessage: () => 'Hello from Auth Microservice!',
    currentUser: (_, __, { req }) => {
      // Assuming the JWT token is sent via an HTTP-only cookie named 'token'
      const token = req.cookies['token'];
      //console.log('token', token);
      if (!token) {
        return null; // No user is logged in
      }

      try {
        // Verify and decode the JWT. Note: Make sure to handle errors appropriately in a real app
        const decoded = jwt.verify(token, 'your_secret_key');
        console.log('decoded', decoded);
        return decoded;
      } catch (error) {
        // Token verification failed
        return null;
      }
    },
  },

  Mutation: {
    login: async (_, { username, password }, { res }) => {
      // In a real app, validate username and password against a database
      console.log('login', username);
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error('Invalid password');
      }
      //
      const token = jwt.sign({ username: user.username, role: user.role, id: user.id }, 'your_secret_key', { expiresIn: '1d' });
      res.cookie('token', token, {
        httpOnly: true,
        //sameSite: 'None',
        //secure: false, // Set to true if your site is served over HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      return user;
    },
    register: async (_, { username, password, email }) => {

      console.log('register', username);
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username is already taken');
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new Error('Email is already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username: username, password: hashedPassword, email: email });
      await newUser.save();
      return newUser;
    },
    logout: (_, __, { res }) => {
      res.clearCookie('token', {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'Lax',
      });
      return true;
    },
  },
};

module.exports = resolvers;