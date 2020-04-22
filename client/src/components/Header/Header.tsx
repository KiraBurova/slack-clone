import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Layout } from 'antd';

import styles from './Header.module.scss';

const { Header } = Layout;

const HeaderComponent = (): React.ReactElement => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem('token');
      history.push('/login');
    }
  };
  return (
    <>
      <Header className={styles.header}>
        {token && (
          <Button className={styles.button} onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Header>
    </>
  );
};

export default HeaderComponent;
