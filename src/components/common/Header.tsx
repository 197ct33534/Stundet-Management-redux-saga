import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/auth/authSlice';
import * as React from 'react';

export function Header() {
    const dispatch = useAppDispatch();
    const handleClickLogout = () => {
        dispatch(logout());
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Student Management
                    </Typography>
                    <Button color="inherit" onClick={handleClickLogout}>
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
