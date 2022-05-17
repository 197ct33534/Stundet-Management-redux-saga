import { useAppDispatch } from 'app/hooks';
import React from 'react';
import { login } from '../authSlice';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const handleClickLogin = () => {
        //todo get username and password from
        dispatch(login({ username: 'trung nghia', password: '123' }));
    };
    return (
        <div
            style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <div style={{ padding: '32px' }}>
                <h1>Stundet Management</h1>
                <button onClick={handleClickLogin}>fake login</button>
            </div>
        </div>
    );
};

export default LoginPage;
