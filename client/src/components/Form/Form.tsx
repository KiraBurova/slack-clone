import React, { useState } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { FormComponentProps as AntFormProps } from "antd/lib/form/Form";
import { Link } from 'react-router-dom';
import { User } from '../../type';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      username,
      password
    }
  }
`;

interface FormComponentProps extends AntFormProps {
    registration?: boolean;
    loginUser: Function;
    registerUserAction: Function;
}

interface UserInput {
    username: string;
    password: string;
    repeat_password?: string;
}

const FormComponent = ({ form, registration, loginUser, registerUserAction }: FormComponentProps) => {
    const { getFieldDecorator } = form;
    const [validationError, setError] = useState('');
    const [registerUser] = useMutation(REGISTER_USER);

    const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        form.validateFields((err: Object, values: any): void => {
            if (!err && values.password === values.repeat_password) {
                setError('');
                registerUserAction();
                registerUser({ variables: { username: values.username, password: values.password } })
            } else {
                const errorMessage = 'The passwords must match!';
                setError(errorMessage);
            }
        });
    }

    const handleLoginUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        form.validateFields((err: Object, values: UserInput): void => {
            if (!err) {
                setError('');
                loginUser();
            } else {

            }
        });
    }

    const loginForm = <Form layout="vertical" onSubmit={handleLoginUser}>
        <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input placeholder="Username" prefix={<Icon type="user" />} />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password', {
                rules: [
                    { required: true, message: 'Please input your password!' },
                    { min: 6, message: 'Password must be minimum 6 characters.' },
                ],
            })(
                <Input placeholder="Password" type="password" prefix={<Icon type="lock" />} />
            )}
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" type="primary">Log in</Button>
        </Form.Item>
        Or <Link to="/register">register now!</Link>
    </Form>

    const registrationForm = <Form layout="vertical" onSubmit={handleRegisterUser}>
        <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input placeholder="Username" prefix={<Icon type="user" />} />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password', {
                rules: [
                    { required: true, message: 'Please input your password!' },
                    { min: 6, message: 'Password must be minimum 6 characters.' },
                ],
            })(
                <Input placeholder="Password" type="password" prefix={<Icon type="lock" />} />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('repeat_password', {
                rules: [
                    { required: true, message: 'Please input your password!' },
                ],
            })(
                <Input placeholder="Repeat password" type="password" prefix={<Icon type="lock" />} />
            )}
        </Form.Item>
        <Form.Item>
            {validationError && <Alert type="error" message={validationError} />}
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" type="primary">Register</Button>
        </Form.Item>
        Already registered? <Link to="/login">Login now!</Link>
    </Form>

    return registration ? registrationForm : loginForm;
    // return <div>dgdfgdfg</div>
}

export default Form.create<FormComponentProps>()(FormComponent);
// export default FormComponent;