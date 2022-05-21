import authSaga from 'features/auth/authSaga';
import dashboardSaga from 'features/Dashboard/DashboardSaga';
import studentSaga from 'features/Students/studentSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([authSaga(), dashboardSaga(), studentSaga()]);
}
