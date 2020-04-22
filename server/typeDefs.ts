const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    username: String!
    password: String!
    token: String!
  }
  type SuccessRespose {
    message: String!
  }
  input RegisterInput {
    username: String!
    password: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    registerUser(registerInput: RegisterInput): SuccessRespose!
    loginUser(loginInput: LoginInput): User!
  }
`;
