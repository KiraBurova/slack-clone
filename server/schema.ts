import { GraphQLSchema } from "graphql";

const { GraphQLObjectType, GraphQLString } = require('graphql');

// User type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: UserType
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})