import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cityMap, selectCityList } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
    selectStudentFilter,
    selectStudentList,
    selectStudentLoading,
    selectStudentPagination,
    studentActions,
} from '../studentSlice';

const ListPage = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const studentList = useAppSelector(selectStudentList);
    const studentPagination = useAppSelector(selectStudentPagination);
    const studentFilter = useAppSelector(selectStudentFilter);
    const loading = useAppSelector(selectStudentLoading);
    const selectCityMap = useAppSelector(cityMap);
    const cityList = useAppSelector(selectCityList);
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
    const onSearchChange = (newFilter: ListParams) => {
        // console.log('🚀 ~ file: ListPage.tsx ~ line 35 ~ onSearchChange ~ newFilter', newFilter);
        dispatch(studentActions.setFilterWithDebounce(newFilter));
    };
    const onFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    };
    const hadnleRemoveStudent = async (student: Student) => {
        try {
            await studentApi.remove(student.id as string);
            const clondeFilter = { ...studentFilter };
            dispatch(studentActions.setFilter(clondeFilter));

            toast.success('xóa thành công');
        } catch (error) {
            toast.error('Lỗi không thể xóa được', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const handleEditStudent = async (student: Student) => {
        navigate(`${pathname}/${student.id}`);
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
                <Link to={`${pathname}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Add new student</Button>
                </Link>
            </Box>
            <Box mb={3}>
                <StudentFilters
                    onChange={onFilterChange}
                    cityList={cityList}
                    filter={studentFilter}
                    onSearchChange={onSearchChange}
                />
            </Box>
            {/* student table */}
            <StudentTable
                studentList={studentList}
                cityMap={selectCityMap}
                onRemove={hadnleRemoveStudent}
                onEdit={handleEditStudent}
            />
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
