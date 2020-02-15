import { GraphQLSchema } from "graphql";

const { GraphQLObjectType, GraphQLString } = require('graphql');

// User type
const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            resolve() {
                console.log(123)
            }
        }
    }
})
const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(username, password) {
                console.log(username, password, 123)
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})