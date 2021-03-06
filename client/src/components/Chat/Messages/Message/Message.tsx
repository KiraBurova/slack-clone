import React from 'react';

import { Comment } from 'antd';

import { MessageType } from '../../../../types/types';

import styles from './Message.module.scss';

const Message = ({ author, content, time }: MessageType): React.ReactElement => {
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
