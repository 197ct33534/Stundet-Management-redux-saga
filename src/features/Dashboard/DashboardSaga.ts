import { dashboardAction, RankingByCity } from './DashboardSlice';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import cityApi from 'api/cityApi';

function* fetchStatistics() {
    const responseList: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
        call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
        call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
        call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
    ]);
    // [{data:[],pagination:{_totalRows: ,_limits ,page: }}] => [_totalRows,...]
    const statistics = responseList.map((x) => x.pagination._totalRows);
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statistics;
    yield put(
        dashboardAction.setStatistics({
            maleCount,
            femaleCount,
            highMarkCount,
            lowMarkCount,
        })
    );
}
function* fetchHighestStudents() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc',
    });
    yield put(dashboardAction.setHighestStudents(data));
}
function* fetchLowestStudentsList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc',
    });
    yield put(dashboardAction.setLowestStudents(data));
}
function* fetchRankingByCityList() {
    // get all city
    const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
    // get student in city
    const callList = cityList.map((x) =>
        call(studentApi.getAll, {
            _page: 1,
            _limit: 5,
            _sort: 'mark',
            _order: 'desc',
            city: x.code,
        })
    );

    const ListResponse: Array<ListResponse<Student>> = yield all(callList);
    //create rabking by city from list response and citiList
    const rankingByCity: Array<RankingByCity> = ListResponse.map((x, idx) => ({
        cityId: cityList[idx].code,
        rankingByCity: x.data,
    }));
    // update state
    yield put(dashboardAction.setRankingByCity(rankingByCity));
}

function* fetchDashboardData() {
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudents),
            call(fetchLowestStudentsList),
            call(fetchRankingByCityList),
        ]);
        yield put(dashboardAction.fetchDataSuccess());
    } catch (error) {
        console.log('failed fetchData ', error);
        yield put(dashboardAction.fetchDataFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData);
}
