import gql from 'graphql-tag';

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username,
      password
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      username,
      password,
      token
    }
  }
`;

export {
  REGISTER_USER,
  LOGIN_USER
}