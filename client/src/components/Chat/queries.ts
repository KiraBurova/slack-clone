import gql from 'graphql-tag';

const ME_QUERY = gql`
  query Me {
    me {
      username
      _id
    }
  }
`;

export { ME_QUERY };
