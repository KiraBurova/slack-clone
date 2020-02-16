import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Icon, Input, Button, Alert } from 'antd';

import { useMutation } from '@apollo/react-hooks';

import { requiredField } from '../../helpers';
import { minimumPasswordMessage } from '../../constants';
import { User } from '../../type';
import { FormComponentProps } from './types';
import { REGISTER_USER } from './mutations';

const FormComponent = ({ form, registration, loginUserAction, registerUserAction }: FormComponentProps) => {
    const history = useHistory();
    const { getFieldDecorator } = form;
    const [validationError, setError] = useState('');
    const [registerUserMutation, { error, loading }] = useMutation(REGISTER_USER, {
        onError(error) {
            console.log(history)
            return error;
        },
        onCompleted() {
            history.push('/login');
        }
    });

    const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        form.validateFields((err: Object, values: User): void => {
            if (!err && values.password === values.repeat_password) {
                setError('');
                registerUserAction();
                registerUserMutation({ variables: { registerInput: { username: values.username, password: values.password } } })
            } else if (values.password && values.repeat_password && values.password !== values.repeat_password) {
                const errorMessage = 'The passwords must match!';
                setError(errorMessage);
            }
        });
    }

    const handleLoginUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        form.validateFields((err: Object, values: User): void => {
            if (!err) {
                setError('');
                loginUserAction();
            } else {

            }
        });
    }

    const loginForm = <Form layout="vertical" onSubmit={handleLoginUser}>
        <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: requiredField('username') }],
            })(
                <Input placeholder="Username" prefix={<Icon type="user" />} />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password', {
                rules: [
                    { required: true, message: requiredField('password') },
                    { min: 6, message: minimumPasswordMessage },
                ],
            })(
                <Input placeholder="Password" type="password" prefix={<Icon type="lock" />} />
            )}
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>Log in</Button>
        </Form.Item>
        Or <Link to="/register">register now!</Link>
    </Form>

    const registrationForm = <Form layout="vertical" onSubmit={handleRegisterUser}>
        <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: requiredField('username') }],
            })(
                <Input placeholder="Username" prefix={<Icon type="user" />} />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password', {
                rules: [
                    { required: true, message: requiredField('password') },
                    { min: 6, message: minimumPasswordMessage },
                ],
            })(
                <Input placeholder="Password" type="password" prefix={<Icon type="lock" />} />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('repeat_password', {
                rules: [
                    { required: true, message: requiredField('password') },
                ],
            })(
                <Input placeholder="Repeat password" type="password" prefix={<Icon type="lock" />} />
            )}
        </Form.Item>
        {validationError && <Form.Item>
            <Alert type="error" message={validationError} />
        </Form.Item>}
        {error &&
            <Form.Item>
                <Alert type="error" message={error?.message} />
            </Form.Item>}
        <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>Register</Button>
        </Form.Item>
        Already registered? <Link to="/login">Login now!</Link>
    </Form>
    return registration ? registrationForm : loginForm;
}

export default Form.create<FormComponentProps>()(FormComponent);