import React from 'react';
import { Link } from 'react-router-dom';

import { ApolloError } from 'apollo-boost';

import { Form, Icon, Input, Button, Alert } from 'antd';

import { requiredField } from '../../helpers';
import { minimumPasswordMessage } from '../../constants';

interface FormComponentProp {
  form: any;
  registration: boolean;
  handleLoginUser: (event: React.FormEvent<HTMLFormElement>) => void;
  handleRegisterUser: (event: React.FormEvent<HTMLFormElement>) => void;
  validationError: string;
  loginError: ApolloError | undefined;
  registerError: ApolloError | undefined;
  loginLoading: boolean;
  registerLoading: boolean;
}

const FormComponent = ({
  form,
  handleLoginUser,
  handleRegisterUser,
  registration,
  validationError,
  loginError,
  loginLoading,
  registerError,
  registerLoading,
}: FormComponentProp) => {
  const { getFieldDecorator } = form;

  const loginForm = (
    <Form layout='vertical' onSubmit={handleLoginUser}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: requiredField('username') }],
        })(<Input placeholder='Username' prefix={<Icon type='user' />} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: requiredField('password') },
            { min: 6, message: minimumPasswordMessage },
          ],
        })(
          <Input
            placeholder='Password'
            type='password'
            prefix={<Icon type='lock' />}
          />,
        )}
      </Form.Item>
      {validationError && (
        <Form.Item>
          <Alert type='error' message={validationError} />
        </Form.Item>
      )}
      {loginError && (
        <Form.Item>
          <Alert type='error' message={loginError?.message} />
        </Form.Item>
      )}
      <Form.Item>
        <Button htmlType='submit' type='primary' loading={loginLoading}>
          Log in
        </Button>
      </Form.Item>
      Or <Link to='/register'>register now!</Link>
    </Form>
  );

  const registrationForm = (
    <Form layout='vertical' onSubmit={handleRegisterUser}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: requiredField('username') }],
        })(<Input placeholder='Username' prefix={<Icon type='user' />} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: requiredField('password') },
            { min: 6, message: minimumPasswordMessage },
          ],
        })(
          <Input
            placeholder='Password'
            type='password'
            prefix={<Icon type='lock' />}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('repeat_password', {
          rules: [{ required: true, message: requiredField('password') }],
        })(
          <Input
            placeholder='Repeat password'
            type='password'
            prefix={<Icon type='lock' />}
          />,
        )}
      </Form.Item>
      {validationError && (
        <Form.Item>
          <Alert type='error' message={validationError} />
        </Form.Item>
      )}
      {registerError && (
        <Form.Item>
          <Alert type='error' message={registerError?.message} />
        </Form.Item>
      )}
      <Form.Item>
        <Button htmlType='submit' type='primary' loading={registerLoading}>
          Register
        </Button>
      </Form.Item>
      Already registered? <Link to='/login'>Login now!</Link>
    </Form>
  );

  return registration ? registrationForm : loginForm;
};

export default FormComponent;
