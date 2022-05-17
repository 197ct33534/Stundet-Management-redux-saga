import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';
export interface AuthState {
    isLogggedin: boolean;
    logging?: boolean;
    currentUser?: User;
}
export interface LoggingPayload {
    username: string;
    password: string;
}
const initialState: AuthState = {
    isLogggedin: false,
    logging: false,
    currentUser: undefined,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoggingPayload>) => {
            state.logging = true;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.logging = false;
            state.isLogggedin = true;
            state.currentUser = action.payload;
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.logging = false;
        },
        logout: (state) => {
            state.isLogggedin = false;
            state.currentUser = undefined;
        },
    },
});
const { actions, reducer: authReducer } = authSlice;
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLogging = (state: any) => state.auth.logging;
export const { login, loginSuccess, loginFailed, logout } = actions;
export const authActions = authSlice.actions;
export default authReducer;
