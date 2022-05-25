import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

export interface AddEditPageProps {}

export default function AddEditPage(props: AddEditPageProps) {
    const { studentID } = useParams();
    const [student, setStudent] = useState<Student>();
    const isEdit = Boolean(studentID);
    useEffect(() => {
        if (!studentID) {
            return;
        }
        (async () => {
            try {
                const data: Student = await studentApi.getById(studentID);
                setStudent(data);
            } catch (error) {
                console.log('lỗi' + error);
            }
        })();
    }, [studentID]);
    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        city: '',
        gender: 'male',
        ...student,
    } as Student;
    const handleStudentFormSubmit = (data: Student) => {};
    return (
        <Box>
            <Link to="/admin/students" style={{ textDecoration: 'none' }}>
                <Typography variant="button" display="flex" alignItems="center">
                    <ChevronLeft />
                    Back to list Student
                </Typography>
            </Link>
            <Typography variant="h4">{isEdit ? 'Edit Student' : 'Add Student'}</Typography>
            <Box mt={3}>
                {/* nếu là add hoặc có dữ liệu từ edit rồi thì mới hiển thị form */}
                {(!isEdit || Boolean(student)) && (
                    <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
                )}
            </Box>
        </Box>
    );
}
