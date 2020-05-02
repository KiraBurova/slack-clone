const { gql } = require('apollo-server');

export default gql`
  type Chat {
    _id: String!
    title: String!
    createdAt: String!
    users: [User!]!
    messages: [Message!]!
  }
  extend type Mutation {
    startChat(secondUserId: ID!, title: String): Chat
  }
`;
