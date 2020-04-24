import React from 'react';
import { match } from 'react-router';

import { PageHeader } from 'antd';

import { MatchParams } from '../Chat';

interface ChatHeaderProps {
  match: match<MatchParams> | null;
}

const ChatHeader = ({ match }: ChatHeaderProps): React.ReactElement => {
  const privateChat = `Chatting with ${match?.params.id}`;

  return (
    <>
      <PageHeader title={privateChat} />,
    </>
  );
};

export default ChatHeader;
