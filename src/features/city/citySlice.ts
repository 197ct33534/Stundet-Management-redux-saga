import { ListResponse, City } from './../../models';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface cityState {
    list: City[];
    loading: boolean;
}
const initialState: cityState = {
    loading: false,
    list: [],
};
const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.list = action.payload.data;
            state.loading = false;
        },
        fetchCityListFailed(state) {
            state.loading = false;
        },
    },
});

// action
export const cityActions = citySlice.actions;
//selector
export const selectCityList = (state: RootState) => state.city.list;

export const cityMap = createSelector(selectCityList, (cityList) =>
    cityList.reduce((map: { [key: string]: City }, city) => {
        map[city.code] = city;
        return map;
    }, {})
);
// reducer

const cityReducer = citySlice.reducer;
export default cityReducer;
