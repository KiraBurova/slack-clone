import gql from 'graphql-tag';

const MESSAGE_SUBSCRIPTION = gql`
  subscription onMessageSend {
    messageSent {
      content
    }
  }
`;

export { MESSAGE_SUBSCRIPTION };
