import { put, takeLatest, all } from 'redux-saga/effects';

export function* loginUser() {
  yield put({ type: 'LOGIN_USER' });
}

// Our watcher Saga: spawn a new LOGIN_USER task on the last WATCH_LOGIN_USER
export function* watchLoginUser() {
  yield takeLatest('WATCH_LOGIN_USER', loginUser);
}

export default function* rootSaga() {
  yield all([watchLoginUser()]);
}
