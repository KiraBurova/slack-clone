import React from 'react';
import { Row, Col } from 'antd';

import CreateRoom from '../CreateRoom';

import styles from './Sidebar.module.scss';

const Sidebar = (): React.ReactElement => {
  return (
    <div className={styles.sidebar}>
      <CreateRoom className={styles.createRoom} />
    </div>
  );
};

export default Sidebar;
