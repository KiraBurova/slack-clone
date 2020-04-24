const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const graphQLHttp = require('express-graphql');
const { ApolloServer } = require('apollo-server-express');
const httpHeadersPlugin = require('apollo-server-plugin-http-headers');

const dotenv = require('dotenv');
const cors = require('cors');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

app.use(cors());

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongoose.connect(process.env.MONGOLAB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log('Connecting the server', PORT);
  const subPath = server.subscriptionsPath;
  console.log(`Subscriptions are at ws://localhost:${PORT}${subPath}`);
});
