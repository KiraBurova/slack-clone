import { GraphQLSchema } from "graphql";
const { GraphQLObjectType, GraphQLString } = require('graphql');

const bcrypt = require('bcrypt');

import { UserModel } from './models/User';
import { User } from './types';

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
            resolve({ }, { username, password }) {
                const saltRounds = 10;

                if (!username || !password) {
                    throw new Error('Username and password are required!');
                }
                if (password.length < 6) {
                    throw new Error('Password must be minimum 6 characters!');
                }

                UserModel.findOne({ username }, (error: string, existingUser: User) => {
                    if (error) {
                        throw new Error(error);
                    }
                    if (existingUser) {
                        throw new Error('That username is already in use!');
                    }
                })

                bcrypt.genSalt(saltRounds, (error: string, salt: string) => {
                    if (error) {
                        throw new Error(error);
                    }
                    bcrypt.hash(password, salt, (error: string, hash: string) => {
                        if (error) {
                            throw new Error(error);
                        }
                        else {
                            const newUser = new UserModel({
                                username,
                                password: hash
                            });

                            newUser.save((error: string, user: User) => {
                                if (error) {
                                    throw new Error(error);
                                } else {
                                    console.log(user)
                                }
                            })

                        }
                    })
                })

            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})