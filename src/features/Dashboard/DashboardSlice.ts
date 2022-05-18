import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models';
export interface DashboardStatistics {
    maleCount: number;
    femaleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}
export interface RankingByCity {
    cityId: string;
    rankingByCity: Student[];
}
export interface DashboardState {
    loading: boolean;
    statistics: DashboardStatistics;
    highestStudents: Student[];
    lowestStudents: Student[];
    rankingByCity: RankingByCity[];
}
const initialState: DashboardState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0,
    },
    highestStudents: [],
    lowestStudents: [],
    rankingByCity: [],
};
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
        },
        fetchDataSuccess(state) {
            state.loading = false;
        },
        fetchDataFailed(state) {
            state.loading = false;
        },

        setStatistics(state, action: PayloadAction<DashboardStatistics>) {
            state.statistics = action.payload;
        },
        setHighestStudents(state, action: PayloadAction<Student[]>) {
            state.highestStudents = action.payload;
        },
        setLowestStudents(state, action: PayloadAction<Student[]>) {
            state.lowestStudents = action.payload;
        },
        setRankingByCity(state, action: PayloadAction<RankingByCity[]>) {
            state.rankingByCity = action.payload;
        },
    },
});

// action
export const dashboardAction = dashboardSlice.actions;
// selectort
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentsList = (state: RootState) => state.dashboard.highestStudents;
export const selectLowestStudentsList = (state: RootState) => state.dashboard.lowestStudents;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCity;

// reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
