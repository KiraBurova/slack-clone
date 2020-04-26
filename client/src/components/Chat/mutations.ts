import gql from 'graphql-tag';

const MESSAGE_SUBSCRIPTION = gql`
  subscription onMessageSend {
    message {
      content
      author
      time
      id
    }
  }
`;

export { MESSAGE_SUBSCRIPTION };
