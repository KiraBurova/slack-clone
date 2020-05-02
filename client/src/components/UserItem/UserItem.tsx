import React from 'react';
import { Link } from 'react-router-dom';

import { UserItemProps } from './types';

import styles from './UserItem.module.scss';

const UserItem = ({ user }: UserItemProps): React.ReactElement => {
  return (
    <Link className={styles.user} to={`/chat/${user.username}/${user._id}`}>
      {user.username}
    </Link>
  );
};

export default UserItem;
