const GameProgress = require('../models/GameProgress/GameProgress.js'); // Import the GameProgress model

const gameProgressResolvers = {
  Query: {
    // Fetch leaderboard rankings
    leaderboard: async () => {
      try {
        return await GameProgress.find()
          .sort({ score: -1 }) // Sort by score in descending order
          .limit(10); // Limit to top 10 players
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw new Error('Error fetching leaderboard');
      }
    },

    // Fetch achievements for a specific user
    achievements: async (_, { userId }) => {
      try {
        const progress = await GameProgress.findOne({ userId });
        if (!progress) {
          throw new Error('Game progress not found for the user');
        }
        return progress.achievements;
      } catch (error) {
        console.error('Error fetching achievements:', error);
        throw new Error('Error fetching achievements');
      }
    },

    // Fetch game progress for a specific user
    gameProgress: async (_, { userId }) => {
      try {
        const gameProgress = await GameProgress.findOne({ userId });
        console.log('gameprogress', gameProgress);

        if (!gameProgress) {
          gameProgress = await GameProgress.create({ userId });
          console.log('gameprogress', gameProgress);
        }
        return gameProgress;
      } catch (error) {
        console.error('Error fetching game progress:', error);
        throw new Error('Error fetching game progress');
      }
    },
  },

  Mutation: {
    // Update game progress for a user
    updateGameProgress: async (_, { userId, updates }) => {
      try {
        const updatesCopy = { ...updates };
        updatesCopy.lastPlayed = new Date();
        const updatedProgress = await GameProgress.findOneAndUpdate(
          { userId },
          updatesCopy,
          { new: true } // Return the updated document
        );
        if (!updatedProgress) {
          throw new Error('Game progress not found for the user');
        }
        console.log('Updated Game Progress:', updatedProgress);
        return updatedProgress;
      } catch (error) {
        console.error('Error updating game progress:', error);
        throw new Error('Error updating game progress');
      }
    },

    // Add an achievement for a user
    addAchievement: async (_, { userId, achievement }) => {
      try {
        const progress = await GameProgress.findOne({ userId });
        if (!progress) {
          throw new Error('Game progress not found for the user');
        }
        progress.achievements.push(achievement); // Add the new achievement
        await progress.save();
        return progress;
      } catch (error) {
        console.error('Error adding achievement:', error);
        throw new Error('Error adding achievement');
      }
    },

    // Add game progress for a user
    addGameProgress: async (_, { userId, gameProgress }) => {
      try {
        // Check if game progress already exists for the user
        const existingProgress = await GameProgress.findOne({ userId });
        if (existingProgress) {
          throw new Error('Game progress already exists for the user');
        }

        // Create a new game progress entry
        const newProgress = new GameProgress({
          userId,
          ...gameProgress,
        });

        // Save the new game progress to the database
        await newProgress.save();
        return newProgress;
      } catch (error) {
        console.error('Error adding game progress:', error);
        throw new Error('Error adding game progress');
      }
    },
  },
};

module.exports = gameProgressResolvers;