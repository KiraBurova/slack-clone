const bcrypt = require('bcrypt')

import { UserModel } from './models/User';
import { User } from './types';

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await UserModel.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        registerUser(_, { registerInput }) {
            const { username, password } = registerInput;
            const saltRounds = 12;

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