import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'antd';

import { useMutation } from '@apollo/react-hooks';

import { User } from '../../type';
import { FormComponentProps } from './types';
import { REGISTER_USER, LOGIN_USER } from './mutations';

import FormComponent from './FormComponent';

const FormContainer = ({
  form,
  registration,
  loginUserAction,
  registerUserAction,
}: FormComponentProps) => {
  const history = useHistory();
  const [validationError, setError] = useState('');
  const [
    registerUserMutation,
    { error: registerError, loading: registerLoading },
  ] = useMutation(REGISTER_USER, {
    onError(error) {
      return error;
    },
    onCompleted() {
      history.push('/login');
    },
  });
  const [
    loginUserMutation,
    { error: loginError, loading: loginLoading },
  ] = useMutation(LOGIN_USER, {
    onError(error) {
      return error;
    },
    onCompleted(data) {
      const token = data.loginUser.token;

      if (token) {
        history.push('/chat');
      }
    },
  });

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    form.validateFields((err: Object, values: User): void => {
      if (!err && values.password === values.repeat_password) {
        setError('');
        registerUserAction();
        registerUserMutation({
          variables: {
            registerInput: {
              username: values.username,
              password: values.password,
            },
          },
        });
      } else if (
        values.password &&
        values.repeat_password &&
        values.password !== values.repeat_password
      ) {
        const errorMessage = 'The passwords must match!';

        setError(errorMessage);
      }
    });
  };

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    form.validateFields(
      ['username', 'password'],
      (err: Object, values: User): void => {
        if (!err) {
          setError('');
          loginUserAction(true);
          loginUserMutation({
            variables: {
              loginInput: {
                username: values.username,
                password: values.password,
              },
            },
          });
        } else {
          const errorMessage = 'The passwords must match!';
          loginUserAction(false);
          setError(errorMessage);
        }
      },
    );
  };

  return (
    <FormComponent
      loginError={loginError}
      loginLoading={loginLoading}
      registerError={registerError}
      registerLoading={registerLoading}
      validationError={validationError}
      form={form}
      handleLoginUser={handleLoginUser}
      handleRegisterUser={handleRegisterUser}
      registration={registration}
    />
  );
};

export default Form.create<FormComponentProps>()(FormContainer);
