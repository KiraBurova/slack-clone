const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    username: String!
    password: String!
    token: String!
  }
  type SuccessResponse {
    message: String!
  }
  type Message {
    content: String!
  }
  input RegisterInput {
    username: String!
    password: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  input MessageInput {
    content: String!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    registerUser(registerInput: RegisterInput): SuccessResponse!
    loginUser(loginInput: LoginInput): User!
    sendMessage(messageInput: MessageInput): SuccessResponse!
  }
  type Subscription {
    messageSent: Message!
  }
`;
