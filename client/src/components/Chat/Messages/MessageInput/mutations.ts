import gql from 'graphql-tag';

const SEND_MESSAGE = gql`
  mutation SendMessage($messageInput: MessageInput) {
    sendMessage(messageInput: $messageInput) {
      message
    }
  }
`;

export { SEND_MESSAGE };
