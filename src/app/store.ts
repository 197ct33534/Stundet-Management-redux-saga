import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from 'features/auth/authSlice';
import rootSaga from './rootSaga';
import dashboardReducer from 'features/Dashboard/DashboardSlice';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
