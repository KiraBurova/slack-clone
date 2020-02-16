const express = require('express');
const mongoose = require('mongoose');
const graphQLHttp = require('express-graphql');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const cors = require('cors');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

app.use(cors());

app.listen(PORT, () => {
    console.log('Connecting the server', PORT)
})

server.applyMiddleware({ app });

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
