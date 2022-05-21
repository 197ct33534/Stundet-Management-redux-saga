import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Student } from 'models';
import * as React from 'react';
import { capitalizeString, getMarkColor } from 'utils';

export interface StudentTableProps {
    studentList: Student[];
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, onRemove, onEdit }: StudentTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Mark</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((student) => (
                        <TableRow
                            key={student.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {student.id}
                            </TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{capitalizeString(student.gender)}</TableCell>
                            <TableCell>
                                <Box color={getMarkColor(student.mark)} fontWeight="bold">
                                    {student.mark}
                                </Box>
                            </TableCell>
                            <TableCell>{student.city}</TableCell>

                            <TableCell align="right">
                                <Box>
                                    <Button color="secondary" onClick={() => onEdit?.(student)}>
                                        Edit
                                    </Button>
                                    <Button color="warning" onClick={() => onRemove?.(student)}>
                                        Remove
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
