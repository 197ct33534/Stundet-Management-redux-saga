import authSaga from 'features/auth/authSaga';
import dashboardSaga from 'features/Dashboard/DashboardSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    console.log('root saga');
    yield all([authSaga(), dashboardSaga()]);
}
