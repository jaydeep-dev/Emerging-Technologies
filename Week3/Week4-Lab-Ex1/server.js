import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Start the server
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Server listening at: ${url}`);