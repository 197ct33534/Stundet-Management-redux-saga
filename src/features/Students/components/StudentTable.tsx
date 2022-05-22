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
import { Student, City } from 'models';
import * as React from 'react';
import { capitalizeString, getMarkColor } from 'utils';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export interface StudentTableProps {
    studentList: Student[];
    cityMap: {
        [key: string]: City;
    };
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}

export default function StudentTable({
    studentList,
    onRemove,
    onEdit,
    cityMap,
}: StudentTableProps) {
    const [open, setOpen] = React.useState(false);
    const [selectStudent, SetSelectStudent] = React.useState({} as Student);

    const handleClickOpen = (student: Student) => {
        SetSelectStudent(student);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirmRemove = (student: Student) => {
        onRemove?.(student);
        setOpen(false);
    };
    return (
        <>
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
                                <TableCell>{cityMap[student.city]?.name}</TableCell>

                                <TableCell align="right">
                                    <Box>
                                        <Button color="secondary" onClick={() => onEdit?.(student)}>
                                            Edit
                                        </Button>
                                        <Button
                                            color="warning"
                                            onClick={() => handleClickOpen(student)}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa sinh viên</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn xóa sinh viên " {selectStudent.name} "<br />
                        Nếu không chắc chắn hãy chọn Cancel
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleConfirmRemove(selectStudent)}
                        autoFocus
                        color="warning"
                        variant="contained"
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
