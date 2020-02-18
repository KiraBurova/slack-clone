import React from 'react';
import { Row, Col } from 'antd';

import FormContainer from '../../components/Form';

const Registration = (): React.ReactElement => {
  return (
    <Row
      style={{ height: '100%' }}
      type='flex'
      justify='space-around'
      align='middle'
    >
      <Col span={4}>
        <FormContainer registration />
      </Col>
    </Row>
  );
};

export default Registration;
