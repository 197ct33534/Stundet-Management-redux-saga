import { NotFound, PivateRoute } from 'components/common/index';
import { AdminLayout } from 'components/Layout/index';
import LoginPage from 'features/auth/Page/LoginPage';
import { Dashboard } from 'features/Dashboard';
import AddEditPage from 'features/Students/Pages/AddEditPage';
import ListPage from 'features/Students/Pages/ListPage';
import { StudentFeature } from 'features/Students/StudentFeature';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/admin" element={<PivateRoute />}>
                    <Route path="" element={<AdminLayout />}>
                        <Route path="" element={<Navigate replace to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="students" element={<StudentFeature />}>
                            <Route path="add" element={<AddEditPage />}></Route>
                            <Route path=":studentID" element={<AddEditPage />}></Route>
                            <Route path="" element={<ListPage />}></Route>
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
