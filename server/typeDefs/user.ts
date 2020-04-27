const { gql } = require('apollo-server');

export default gql`
  type User {
    id: ID!
    username: String!
    password: String!
    chats: [Chat!]!
    token: String!
  }

  input RegisterInput {
    username: String!
    password: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  extend type Mutation {
    registerUser(registerInput: RegisterInput): SuccessResponse!
    loginUser(loginInput: LoginInput): User!
  }
  extend type Query {
    users: [User]
  }
`;
