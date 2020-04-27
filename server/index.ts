const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const cors = require('cors');

import typeDefs from './typeDefs';
const resolvers = require('./resolvers');

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

const getUser = (token: string): void => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET_KEY);
    }
    return null;
  } catch (error) {
    return null;
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);

    return {
      user,
    };
  },
});

app.use(cors());

server.applyMiddleware({
  app,
});

mongoose.connect(process.env.MONGOLAB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
