import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import cors from 'cors';
import connectDB from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import { loggerPlugin } from './middlewares/loggerHandler';
import 'dotenv/config';
import { resolvers, typeDefs } from './graphql';

async function apolloServer() {
  const PORT = process.env.PORT || 8000;

  connectDB();
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const header = req.headers.authorization || '';
      if (header) {
        return { token: header.split(' ')[1] };
      }
      return { token: '' };
    },
    formatError: errorHandler,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), loggerPlugin],
  });
  await server.start();
  app.use(cors({ credentials: true }));

  server.applyMiddleware({ app, path: '/graphql' });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

apolloServer();
