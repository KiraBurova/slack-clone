import { createReducer } from '@reduxjs/toolkit';

import { actions } from '../actions';

const initialState = {
  user: {
    username: ''
  }
}

const user = createReducer(initialState, {
  [actions.registerUser.type]: (state, action) => {
    console.log(state)
  },
});

export default user;