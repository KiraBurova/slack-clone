import { createReducer } from '@reduxjs/toolkit';

import { registerUserAction } from '../actions';

const initialState = {
  user: {
    username: ''
  }
}

const user = createReducer(initialState, {
  [registerUserAction.type]: (state, action) => {
    console.log(state)
  },
});

export default user;