
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { FormComponentProps as AntFormProps } from "antd/lib/form/Form";
import { Link } from 'react-router-dom';

interface FormComponentProps extends AntFormProps {
    registration?: boolean;
    registerUser: Function;
    loginUser: Function;
}

const FormComponent = ({ form, registration, registerUser, loginUser }: FormComponentProps) => {
    const { getFieldDecorator } = form;

    const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        form.validateFields((err: Object, values: Object): void => {
            if (!err) {
                registerUser();
            }
        });
    }

    const handleLoginUser = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        form.validateFields((err: Object, values: Object): void => {
            if (!err) {
                loginUser();
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
            <Button htmlType="submit" type="primary">Register</Button>
        </Form.Item>
        Already registered? <Link to="/login">Login now!</Link>
    </Form>

    return registration ? registrationForm : loginForm;
}

export default Form.create<FormComponentProps>()(FormComponent);