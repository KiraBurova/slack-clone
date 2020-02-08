const express = require('express');
const mongoose = require('mongoose');
const graphQLHttp = require('express-graphql');
const dotenv = require('dotenv');

import schema from './schema';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOLAB_URI, { useMongoClient: true });

app.use('/graphql', graphQLHttp({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log('Connecting the server')
})