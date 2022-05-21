import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import StudentTable from '../components/StudentTable';
import { selectStudentList, studentActions } from '../studentSlice';

const ListPage = () => {
    const studentList = useAppSelector(selectStudentList);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(studentActions.fetchStudentList({ _page: 1, _limit: 10 }));
        console.log('student feature');
    }, [dispatch]);
    return (
        <Box>
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
        </Box>
    );
};

export default ListPage;
