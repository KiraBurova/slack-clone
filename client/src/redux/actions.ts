import { createAction } from '@reduxjs/toolkit';

const registerUser = createAction<Object, 'REGISTER_USER'>('REGISTER_USER');

export const actions = {
    registerUser
}