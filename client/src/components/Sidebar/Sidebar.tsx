import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import CreateRoom from '../CreateRoom';
import UserItem from '../UserItem';

import { GET_USERS_QUERY } from './queries';

import { UserType } from '../../types/types';

import styles from './Sidebar.module.scss';

const Sidebar = (): React.ReactElement => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);

  return (
    <div className={styles.sidebar}>
      <div className={styles.usersHolder}>
        {data && data.users.map((user: UserType) => <UserItem user={user} key={user._id} />)}
      </div>
      <CreateRoom className={styles.createRoom} />
    </div>
  );
};

export default Sidebar;
