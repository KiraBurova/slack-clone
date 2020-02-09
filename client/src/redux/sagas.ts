import { put, takeLatest, all } from 'redux-saga/effects';

export function* registerUser() {
    yield put({ type: 'REGISTER_USER' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchRegisterUser() {
    yield takeLatest('WATCH_REGISTER_USER', registerUser);
}

export function* loginUser() {
    yield put({ type: 'LOGIN_USER' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoginUser() {
    yield takeLatest('WATCH_LOGIN_USER', loginUser);
}

export default function* rootSaga() {
    yield all([
        watchRegisterUser(),
        watchLoginUser()
    ]);
}