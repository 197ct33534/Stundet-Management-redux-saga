import { Header, SideBar } from 'components/common';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './admin.scss';

export const AdminLayout = () => {
    return (
        <div className="root">
            <div className="header">
                <Header />
            </div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
};
