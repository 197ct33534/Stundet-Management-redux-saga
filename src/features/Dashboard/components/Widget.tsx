import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export interface WidgetProps {
    title: string;
    children: any;
}

export default function Widget({ title, children }: WidgetProps) {
    return (
        <Paper sx={{ padding: '8px' }}>
            <Typography variant="button">{title}</Typography>
            <Box mt={2}>{children}</Box>
        </Paper>
    );
}
