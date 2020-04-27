const { gql } = require('apollo-server');

export default gql`
  type Message {
    id: String!
    content: String!
    author: String!
    time: String!
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
