const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GraphQLScalarType, Kind } = require('graphql');
const User = require('../models/User'); // Assuming you have a User model
const Tournament = require('../models/Tournament'); // Assuming you have a Tournament model
const Player = require('../models/Player'); // Assuming you have a Player schema

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar type for Date',
    serialize(value) {
      // Convert outgoing Date to ISO string
      return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value) {
      // Convert incoming ISO string to Date
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        // Convert hard-coded AST string to Date
        return new Date(ast.value);
      }
      return null;
    },
  }),

  Query: {

    getCurrentUser: async (_, __, { req }) => {
      try {
        
        // Check if the token exists in the request headers
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          throw new Error('No token provided');
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
          throw new Error('Invalid token');
        }

        // Fetch the user from the database
        const user = await User.findById(decoded.id);
        if (!user) {
          throw new Error('User not found');
        }

        // Return the user details
        return user;
      } catch (error) {
        console.error('Error fetching current user:', error);
        throw new Error('Failed to fetch current user');
      }
    },

    // Fetch a user by ID
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error(`User with ID ${id} not found`);
        }
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    },

    // Fetch a tournament by ID
    getTournament: async (_, { id }) => {
      try {
        const tournament = await Tournament.findById(id).populate('players');
        if (!tournament) {
          throw new Error(`Tournament with ID ${id} not found`);
        }
        return tournament;
      } catch (error) {
        console.error('Error fetching tournament:', error);
        throw new Error('Failed to fetch tournament');
      }
    },

    // Fetch all tournaments
    getAllTournaments: async () => {
      try {
        // Populate players and their associated user details
        const tournaments = await Tournament.find()
          .populate({
            path: 'players',
            populate: {
              path: 'user', // Populate the user field inside players
              model: 'User',
            },
          });

        return tournaments;
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        throw new Error('Failed to fetch tournaments');
      }
    },

    // Fetch a player by ID
    getPlayer: async (_, { id }) => {
      try {
        const player = await Player.findById(id).populate('user').populate('tournaments');
        if (!player) {
          throw new Error(`Player with ID ${id} not found`);
        }
        return player;
      } catch (error) {
        console.error('Error fetching player:', error);
        throw new Error('Failed to fetch player');
      }
    },

    // Fetch all players
    getAllPlayers: async () => {
      try {
        const players = await Player.find().populate('user').populate('tournaments');
        return players;
      } catch (error) {
        console.error('Error fetching players:', error);
        throw new Error('Failed to fetch players');
      }
    },
  },

  Mutation: {
    // Create a new user
    createUser: async (_, { username, password, email, role }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email, role });
        const newUser = await user.save();
        return newUser;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }
    },

    // Update an existing user
    updateUser: async (_, { id, username, password, email, role }) => {
      try {
        const updateData = {};
        if (username) updateData.username = username;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        if (email) updateData.email = email;
        if (role) updateData.role = role;

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
      }
    },

    // Delete a user
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        return `User with ID ${id} deleted successfully`;
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
      }
    },

    // Create a new tournament
    createTournament: async (_, { name, game, date, status }) => {
      try {
        const tournament = new Tournament({ name, game, date, status });
        const newTournament = await tournament.save();
        return newTournament;
      } catch (error) {
        console.error('Error creating tournament:', error);
        throw new Error('Failed to create tournament');
      }
    },

    // Update an existing tournament
    updateTournament: async (_, { id, name, game, date, status, playerId }) => {
      try {
        const updateData = {};
        if (name) updateData.name = name;
        if (game) updateData.game = game;
        if (date) updateData.date = date;
        if (status) updateData.status = status;

        // Find the tournament
        const tournament = await Tournament.findById(id);
        if (!tournament) {
          throw new Error(`Tournament with ID ${id} not found`);
        }

        // Add player to the tournament if playerId is provided
        if (playerId) {
          const player = await Player.findById(playerId);
          if (!player) {
            throw new Error(`Player with ID ${playerId} not found`);
          }

          // Check if the player is already in the tournament
          if (!tournament.players.includes(playerId)) {
            tournament.players.push(playerId);
          }
        }

        // Update the tournament with other fields
        Object.assign(tournament, updateData);
        const updatedTournament = await tournament.save();

        return updatedTournament.populate('players');
      } catch (error) {
        console.error('Error updating tournament:', error);
        throw new Error('Failed to update tournament');
      }
    },

    // Delete a tournament
    deleteTournament: async (_, { id }) => {
      try {
        const deletedTournament = await Tournament.findByIdAndDelete(id);
        if (!deletedTournament) {
          throw new Error(`Tournament with ID ${id} not found`);
        }
        return `Tournament with ID ${id} deleted successfully`;
      } catch (error) {
        console.error('Error deleting tournament:', error);
        throw new Error('Failed to delete tournament');
      }
    },

    // Create a new player
    createPlayer: async (_, { userId, ranking, tournamentId }) => {
      try {
        // Validate the tournamentId if provided
        let tournament = null;
        if (tournamentId) {
          tournament = await Tournament.findById(tournamentId);
          if (!tournament) {
            throw new Error(`Tournament with ID ${tournamentId} not found`);
          }
          if (tournament.status !== 'UPCOMING') {
            throw new Error(`Cannot add player to a tournament with status ${tournament.status}`);
          }
        }

        // Create the player
        const player = new Player({ user: userId, ranking, tournaments: tournamentId ? [tournamentId] : [] });
        const newPlayer = await player.save();

        // Add the player to the tournament if tournamentId is provided
        if (tournament) {
          tournament.players.push(newPlayer._id);
          await tournament.save();
        }

        return newPlayer;
      } catch (error) {
        console.error('Error creating player:', error);
        throw new Error('Failed to create player');
      }
    },

    // Update an existing player
    updatePlayer: async (_, { id, ranking }) => {
      try {
        const updateData = {};
        if (ranking !== undefined) updateData.ranking = ranking;

        const updatedPlayer = await Player.findByIdAndUpdate(id, updateData, { new: true }).populate('user').populate('tournaments');
        if (!updatedPlayer) {
          throw new Error(`Player with ID ${id} not found`);
        }
        return updatedPlayer;
      } catch (error) {
        console.error('Error updating player:', error);
        throw new Error('Failed to update player');
      }
    },

    // Delete a player
    deletePlayer: async (_, { id }) => {
      try {
        const deletedPlayer = await Player.findByIdAndDelete(id);
        if (!deletedPlayer) {
          throw new Error(`Player with ID ${id} not found`);
        }
        return `Player with ID ${id} deleted successfully`;
      } catch (error) {
        console.error('Error deleting player:', error);
        throw new Error('Failed to delete player');
      }
    },

    // Fetching mutations
    fetchUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error(`User with ID ${id} not found`);
        }
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    },
    fetchTournament: async (_, { id }) => {
      try {
        const tournament = await Tournament.findById(id).populate('players');
        if (!tournament) {
          throw new Error(`Tournament with ID ${id} not found`);
        }
        return tournament;
      } catch (error) {
        console.error('Error fetching tournament:', error);
        throw new Error('Failed to fetch tournament');
      }
    },
    fetchPlayer: async (_, { id }) => {
      try {
        const player = await Player.findById(id).populate('user').populate('tournaments');
        if (!player) {
          throw new Error(`Player with ID ${id} not found`);
        }
        return player;
      } catch (error) {
        console.error('Error fetching player:', error);
        throw new Error('Failed to fetch player');
      }
    },

    login: async (_, { username, password }) => {
      try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('Invalid username or password');
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid username or password');
        }

        // Generate a JWT token
        const token = jwt.sign(
          { id: user._id, username: user.username, role: user.role },
          JWT_SECRET,
          { expiresIn: '1h' }
        );

        return token; // Return the JWT token
      } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Failed to login');
      }
    },
  },
};

module.exports = resolvers;