const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

import { UserModel } from './models/User';
import { User } from './types';

const generateToken = (user: User): string => {
  return jwt.sign(
    {
      username: user.username,
    },
    process.env.SECRET_KEY,
  );
};

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await UserModel.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async registerUser(_, { registerInput }) {
      const { username, password } = registerInput;
      const saltRounds = 12;

      if (!username || !password) {
        throw new Error('Username and password are required!');
      }
      if (password.length < 6) {
        throw new Error('Password must be minimum 6 characters!');
      }

      const user = await UserModel.findOne(
        { username },
        (error: string, existingUser: User): void => {
          if (error) {
            throw new Error(error);
          }
          if (!error && !existingUser) {
            bcrypt.genSalt(saltRounds, (error: string, salt: string) => {
              if (error) {
                throw new Error(error);
              }
              bcrypt.hash(password, salt, (error: string, hash: string) => {
                if (error) {
                  throw new Error(error);
                } else {
                  const newUser = new UserModel({
                    username,
                    password: hash,
                  });

                  newUser.save((error: string, user: User) => {
                    if (error) {
                      throw new Error(error);
                    } else {
                    }
                  });
                }
              });
            });
          }
        },
      );

      if (user) {
        throw new Error('That username is already in use!');
      } else {
        return {
          message: 'Registration successful!',
        };
      }
    },
    async loginUser(_, { loginInput }, context) {
      const { username, password } = loginInput;

      const user = await UserModel.findOne({ username });

      if (!user) {
        return new Error('User does not exist!');
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new Error('Password is incorrect!');
      }

      const token = generateToken(user);
      context.res.set('Access-Control-Expose-Headers', 'x-token');
      context.res.set('x-token', token);

      return {
        username: user.username,
        password: user.password,
        token,
      };
    },
  },
};
