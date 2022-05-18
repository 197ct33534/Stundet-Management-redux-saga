import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { history } from 'utils';
import { LoggingPayload, login, loginFailed, loginSuccess, logout } from './authSlice';

function* handleLogin(payload: LoggingPayload) {
    try {
        // console.log('login');
        yield delay(1000);
        localStorage.setItem('access_token', '197CT33534');
        yield put(
            loginSuccess({
                id: '1',
                name: '197ct33534',
            })
        );
        history.push('/admin/dashboard');
    } catch (error) {
        yield put(loginFailed('login thất bại'));
    }
}
function* handleLogout() {
    yield delay(1000);
    // console.log('logout');
    localStorage.removeItem('access_token');
    //redirect
    history.push('/login');
}
function* watchLoginFlow() {
    while (true) {
        // console.log('watchLoginFlow');
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<LoggingPayload> = yield take(login.type);
            yield fork(handleLogin, action.payload);
        }

        yield take(logout.type);
        // dứng đợi thực hiện xong handleLogout , nếu dùng fork mà hàm handleLogout
        // có delay thì sẽ sai
        // yield fork(handleLogout);
        yield call(handleLogout);
    }
}
export default function* authSaga() {
    yield fork(watchLoginFlow);
}
