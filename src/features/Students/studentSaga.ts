import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';
function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
        yield put(studentActions.fetchStudentListSuccess(response));
    } catch (error) {
        console.log(
            '🚀 ~ file: studentSaga.ts ~ line 11 ~ function*fetchStudentList ~ error',
            error
        );
        yield put(studentActions.fetchStudentListFailed());
    }
}
export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
}
