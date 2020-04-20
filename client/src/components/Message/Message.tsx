import React from 'react';

import { Comment } from 'antd';

import styles from './Message.module.scss';

interface Message {
  author: string;
  content: string;
  time: string;
}

const Message = ({ author, content, time }: Message): React.ReactElement => {
  return (
    <Comment
      className={styles.comment}
      author={<a>{author}</a>}
      content={<p>{content}</p>}
      datetime={time}
    />
  );
};

export default Message;
