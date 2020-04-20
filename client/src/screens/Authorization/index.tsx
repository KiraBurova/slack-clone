import React from 'react';
import { Row, Col } from 'antd';

import LoginForm from '../../components/LoginForm';

const Auth = (): React.ReactElement => {
  return (
    <Row
      style={{ height: '100%' }}
      type='flex'
      justify='space-around'
      align='middle'
    >
      <Col span={4}>
        <LoginForm registration={false} />
      </Col>
    </Row>
  );
};

export default Auth;
