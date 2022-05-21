import {
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

export interface StudentRankingListProps {
    studentList: Student[];
}

export default function StudentRankingList({ studentList }: StudentRankingListProps) {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Mark</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" align="center" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="right">{row.mark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
