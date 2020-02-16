const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        username: String!
        password: String!
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
        getPosts: [User]
      }
    type Mutation {
        registerUser(registerInput: RegisterInput): User!
        loginUser(loginInput: LoginInput): User!
    }
`;