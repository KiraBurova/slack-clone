import React from 'react';
import { Link } from 'react-router-dom';

import { UserType } from '../../../types/types';

import styles from './UserItem.module.scss';

interface UserItemProps {
  user: UserType;
}

const UserItem = ({ user }: UserItemProps): React.ReactElement => {
  return (
    <Link className={styles.user} to={`/chat/${user.username}`}>
      {user.username}
    </Link>
  );
};

export default UserItem;
