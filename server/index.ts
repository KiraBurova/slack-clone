const express = require('express');
const graphQLHttp = require('express-graphql');

import schema from './schema';

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/graphql', graphQLHttp({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log('Connecting the server')
})