const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import * as Joi from 'joi';
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

import { UserModel, ChatModel } from './models';
import { User } from './types';
import { registerUserSchema, startChat } from './schemas';
import user from './typeDefs/user';

const generateToken = (user: User): string => {
  return jwt.sign(
    {
      username: user.username,
    },
    process.env.SECRET_KEY,
  );
};

module.exports = {
  Subscription: {
    message: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_SENT']),
    },
  },
  Query: {
    async users() {
      try {
        const users = await UserModel.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    async user(_, { id }) {
      try {
        const user = await UserModel.findById(id);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async registerUser(root, { registerInput }, context, info) {
      const { username, password } = registerInput;
      const saltRounds = 12;

      try {
        await Joi.validate(registerInput, registerUserSchema);
      } catch (err) {
        throw new Error(err);
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

    sendMessage(_, { messageInput }, context) {
      pubsub.publish('MESSAGE_SENT', { message: messageInput });
      return {
        message: 'Message successfully sent!',
      };
    },

    async startChat(root, args, context, info) {
      const userId = context.req.session;
      const { title, userIds } = args;

      await Joi.validate(args, startChat(userId), { abortEarly: false });

      const idsFound = await UserModel.where('_id').in(userIds).countDocuments();

      if (idsFound !== userIds.length) {
        throw new Error('One or more User Ids are invalid');
      }

      userIds.push(userId);

      const chat = await ChatModel.create({ title, users: userIds });

      await UserModel.updateMany(
        { _id: { $id: userIds } },
        {
          $push: { chats: chat },
        },
      );

      return chat;
    },
  },
};
