import React from 'react';

import { Row, Col } from 'antd';

import RegisterForm from '../../components/RegisterForm';

const Registration = (): React.ReactElement => {
  return (
    <Row style={{ height: '100%' }} type='flex' justify='space-around' align='middle'>
      <Col span={4}>
        <RegisterForm registration />
      </Col>
    </Row>
  );
};

export default Registration;
