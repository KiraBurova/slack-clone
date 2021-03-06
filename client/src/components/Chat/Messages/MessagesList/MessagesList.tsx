import React from 'react';

import Message from '../Message';

import { MessageType } from '../../../../types/types';

interface MessageListProps {
  messages: MessageType[];
}

const MessageList = ({ messages }: MessageListProps): React.ReactElement => {
  return (
    <>
      {messages.map(
        (message: MessageType): React.ReactElement => (
          <Message
            key={message.id}
            id={message.id}
            author={message.author}
            content={message.content}
            time={message.time}
          />
        ),
      )}
    </>
  );
};

export default MessageList;
