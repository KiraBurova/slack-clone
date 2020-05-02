const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import * as Joi from 'joi';
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

import { UserModel, ChatModel } from './models';
import { User } from './types';
import { registerUserSchema, startChat } from './schemas';

const generateToken = (user: User): string => {
  return jwt.sign(
    {
      _id: user._id,
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
    async users(): Promise<any> {
      try {
        const users = await UserModel.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    async user(_, { id }): Promise<any> {
      try {
        const user = await UserModel.findById(id);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    me: (root, args, context, info): Promise<any> => {
      return UserModel.findById(context.user._id);
    },
  },
  Mutation: {
    async registerUser(root, { registerInput }, context, info): Promise<any> {
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
    async loginUser(_, { loginInput }, context): Promise<any> {
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

      return {
        username: user.username,
        password: user.password,
        _id: user._id,
        token,
      };
    },

    sendMessage(_, { messageInput }, context): Object {
      pubsub.publish('MESSAGE_SENT', { message: messageInput });
      return {
        message: 'Message successfully sent!',
      };
    },

    async startChat(root, { secondUserId }, context, info): Promise<any> {
      const currentUserId = context.user._id;

      const currentUser = await UserModel.findById(currentUserId);
      const secondUser = await UserModel.findById(secondUserId);

      const title = `${currentUser.username} and ${secondUser.username}`;

      try {
        await Joi.validate({ currentUserId, secondUserId, title }, startChat);

        const chat = await ChatModel.create({ title, users: [currentUserId, secondUserId] });

        const a = await UserModel.updateMany(
          { _id: { $in: [currentUserId, secondUserId] } },
          {
            $push: { chats: chat },
          },
        );
        console.log(a);
      } catch (err) {
        console.log(err);
      }

      // const idsFound = await UserModel.where('_id').in(usersIds).countDocuments();

      // if (idsFound !== usersIds.length) {
      //   throw new Error('One or more User Ids are invalid');
      // }

      // userIds.push(userId);

      // const chat = await ChatModel.create({ title, users: [currentUserId, secondUserId] });

      // await UserModel.updateMany(
      //   { _id: { $id: userIds } },
      //   {
      //     $push: { chats: chat },
      //   },
      // );

      // return chat;
    },
  },
};
