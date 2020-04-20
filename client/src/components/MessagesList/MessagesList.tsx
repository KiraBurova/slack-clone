import React from 'react';

import { Comment } from 'antd';

import Message from '../Message';

import { MessageType } from '../../types';

interface MessageListProps {
  messages: MessageType[];
}

const MessageList = ({ messages }: MessageListProps): React.ReactElement => {
  return (
    <>
      {messages.map(
        (message: MessageType): React.ReactElement => (
          <Message author={message.author} content={message.content} time={message.time} />
        ),
      )}
    </>
  );
};

export default MessageList;
