const { gql } = require('apollo-server');

export default gql`
  type Message {
    id: ID!
    content: String!
    author: User!
    createdAt: String!
  }
  input MessageInput {
    content: String!
    author: String!
    time: String!
    id: String!
  }
  extend type Mutation {
    sendMessage(messageInput: MessageInput): SuccessResponse!
  }
  extend type Subscription {
    message: Message!
  }
`;
