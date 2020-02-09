import { put, takeLatest, all } from 'redux-saga/effects';

export function* incrementAsync() {
    yield put({ type: 'REGISTER_USER' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeLatest('REGISTER_USER', incrementAsync)
}

export default function* rootSaga() {
    yield all([
        watchIncrementAsync()
    ]);
}