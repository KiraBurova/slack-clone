import React from 'react';
import { Row, Col } from 'antd';

import FormComponent from '../../components/Form';

const Registration = (): React.ReactElement => {
    return (
        <Row style={{ height: '100%' }} type="flex" justify="space-around" align="middle">
            <Col span={4}>
                <FormComponent registration />
            </Col>
        </Row>
    );
}

export default Registration;