import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export function SideBar() {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <NavLink to="dashboard" className="link">
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                    <NavLink to="students" className="link">
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PeopleAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="Students" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </nav>
        </Box>
    );
}
