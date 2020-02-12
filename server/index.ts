const express = require('express');
const mongoose = require('mongoose');
const graphQLHttp = require('express-graphql');
const dotenv = require('dotenv');
const cors = require('cors');

const schema = require('./schema');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())

app.use('/graphql', graphQLHttp({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log('Connecting the server', PORT)
})