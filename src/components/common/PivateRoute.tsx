import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

export const PivateRoute = (props: RouteProps) => {
    const isLogggedin = Boolean(localStorage.getItem('access_token'));
    if (!isLogggedin) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};
