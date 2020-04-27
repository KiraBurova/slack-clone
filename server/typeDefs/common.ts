const { gql } = require('apollo-server');

export default gql`
  type SuccessResponse {
    message: String!
  }
`;
