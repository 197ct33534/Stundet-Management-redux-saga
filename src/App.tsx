import Button from '@mui/material/Button';
import cityApi from 'api/cityApi';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PivateRoute } from 'components/common/index';
import { AdminLayout } from 'components/Layout/index';
import { logout } from 'features/auth/authSlice';
import LoginPage from 'features/auth/Page/LoginPage';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
    useEffect(() => {
        cityApi.getAll().then((response) => console.log(response));
    }, []);
    const dispatch = useAppDispatch();
    const handleClickLogout = () => {
        dispatch(logout());
    };
    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickLogout}>
                logout
            </Button>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/admin" element={<PivateRoute />}>
                    <Route path="" element={<AdminLayout />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
