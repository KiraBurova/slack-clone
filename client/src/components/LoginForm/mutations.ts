import gql from 'graphql-tag';

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      _id
      username
      password
      token
    }
  }
`;

export { LOGIN_USER_MUTATION };
