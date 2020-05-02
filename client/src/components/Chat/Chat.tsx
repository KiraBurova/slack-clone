import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { useSubscription, useMutation, useQuery } from '@apollo/react-hooks';

import MessageList from '../Chat/Messages/MessagesList';
import ChatHeader from './ChatHeader';

import { MessageType } from '../../types/types';
import { MatchParams } from './types';

import { START_CHAT_MUTATION } from './mutations';
import { ME_QUERY } from './queries';
import { MESSAGE_SUBSCRIPTION } from './subscriptions';

const ChatComponent = (): React.ReactElement => {
  const match = useRouteMatch<MatchParams>('/chat/:name/:id');

  const [messages, setMessages] = useState<MessageType[]>([]);

  // const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION, {
  //   onSubscriptionData(data) {
  //     setMessages([...messages, data.subscriptionData.data.message]);
  //   },
  // });

  const [startChatMutation, { error: loginError, loading: loginLoading }] = useMutation(
    START_CHAT_MUTATION,
    {
      onError(error) {
        console.log(error);
      },
      onCompleted(data) {
        console.log(data);
      },
    },
  );

  const { data, error } = useQuery(ME_QUERY);

  console.log(data);

  useEffect(() => {
    startChatMutation({
      variables: {
        secondUserId: match?.params.id,
      },
    });
  }, [match?.params.id, data]);

  return (
    <>
      <ChatHeader match={match} />
      <MessageList messages={messages} />
    </>
  );
};

export default ChatComponent;
