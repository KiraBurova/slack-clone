import React from 'react';
import { match } from 'react-router';

import { MatchParams } from '../Chat';

interface ChatHeaderProps {
  match: match<MatchParams> | null;
}

const ChatHeader = ({ match }: ChatHeaderProps): React.ReactElement => {
  return (
    <>
      <div>j</div>
    </>
  );
};

export default ChatHeader;
