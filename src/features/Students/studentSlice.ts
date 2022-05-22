import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';
export interface studentState {
    loadding: boolean;
    list: Student[];
    pagination: PaginationParams;
    filter: ListParams;
}
const initialState: studentState = {
    loadding: false,
    list: [],
    pagination: {
        _limit: 8,
        _page: 1,
        _totalRows: 8,
    },
    filter: { _page: 1, _limit: 8 },
};
const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        fetchStudentList(state, action: PayloadAction<ListParams>) {
            state.loadding = true;
        },
        fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;

            state.loadding = false;
        },
        fetchStudentListFailed(state) {
            state.loadding = false;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    },
});

// actions
export const studentActions = studentSlice.actions;
// selector
export const selectStudentLoading = (state: RootState) => state.student.loadding;
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;
//reducers
const studentRedcer = studentSlice.reducer;
export default studentRedcer;
