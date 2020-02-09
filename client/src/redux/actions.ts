import { createAction } from '@reduxjs/toolkit';

const registerUser = createAction<Object, 'REGISTER_USER'>('REGISTER_USER');
const loginUser = createAction<Object, 'LOGIN_USER'>('LOGIN_USER');

export const actions = {
    registerUser,
    loginUser
}