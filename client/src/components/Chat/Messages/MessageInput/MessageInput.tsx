import React from 'react';

import { useMutation } from '@apollo/react-hooks';

import { Input } from 'antd';

import { SEND_MESSAGE } from './mutations';

const MessageInput = (): React.ReactElement => {
  const [sendMessageMutation, { error: loginError, loading: loginLoading }] = useMutation(
    SEND_MESSAGE,
    {
      onError(error) {
        return error;
      },
      onCompleted(data) {
        console.log(123);
      },
    },
  );
  const submitMessage = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    sendMessageMutation({
      variables: {
        messageInput: {
          content: e.currentTarget.value,
          id: '3',
          author: 'Han Solo',
          time: new Date().toLocaleString(),
        },
      },
    });
  };

  return (
    <Input
      size='large'
      placeholder='Enter your message and press Enter'
      onPressEnter={submitMessage}
    />
  );
};

export default MessageInput;
