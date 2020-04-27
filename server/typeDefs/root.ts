const { gql } = require('apollo-server');

export default gql`
  type Mutation {
    _: String
  }
  type Query {
    _: String
  }
  type Subscription {
    _: String
  }
`;
