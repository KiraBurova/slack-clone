const { gql } = require('apollo-server');

export default gql`
  type Chat {
    id: String!
  }
`;
