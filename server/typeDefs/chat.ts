const { gql } = require('apollo-server');

export default gql`
  type Chat {
    id: String!
    title: String!
    createdAt: String!
    users: [User!]!
    messages: [Message!]!
  }
`;
