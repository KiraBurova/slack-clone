import React from 'react';

import { UserType } from '../../../types';

import styles from './UserItem.module.scss';

interface UserItemProps {
  user: UserType;
}

const UserItem = ({ user }: UserItemProps): React.ReactElement => {
  return <div className={styles.user}>{user.username}</div>;
};

export default UserItem;
