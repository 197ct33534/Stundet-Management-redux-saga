import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import StudentTable from '../components/StudentTable';
import {
    selectStudentFilter,
    selectStudentList,
    selectStudentLoading,
    selectStudentPagination,
    studentActions,
} from '../studentSlice';

const ListPage = () => {
    const studentList = useAppSelector(selectStudentList);
    const studentPagination = useAppSelector(selectStudentPagination);
    const studentFilter = useAppSelector(selectStudentFilter);
    const loading = useAppSelector(selectStudentLoading);

    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(studentActions.fetchStudentList(studentFilter));
    }, [dispatch, studentFilter]);
    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        dispatch(
            studentActions.setFilter({
                ...studentFilter,
                _page: page,
            })
        );
    };
    return (
        <Box sx={{ position: 'relative', paddingTop: '12px' }}>
            {loading && (
                <LinearProgress sx={{ position: 'absolute', top: '-12px', width: '100%' }} />
            )}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexFlow: 'row nowarp',
                    alignItems: 'center',

                    marginBottom: '16px',
                }}
            >
                <Typography variant="h4"> Student</Typography>
                <Button variant="contained">Add new student</Button>
            </Box>
            {/* student table */}
            <StudentTable studentList={studentList} />
            {/* pagition */}
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '16px 0px' }}>
                <Pagination
                    page={studentPagination._page}
                    count={Math.ceil(studentPagination._totalRows / studentPagination._limit)}
                    color="secondary"
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
    );
};

export default ListPage;
