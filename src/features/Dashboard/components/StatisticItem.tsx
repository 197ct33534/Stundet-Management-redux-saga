import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';

export interface StatisticItemProps {
    label: string;
    value: string | number;
    icon: React.ReactElement;
}
const Root = styled(Paper)({
    display: 'flex',
    flexFlow: 'row nowarp',
    justifyContent: 'space-between',

    padding: '16px',
});
export default function StatisticItem({ icon, value, label }: StatisticItemProps) {
    return (
        <Root>
            <Box>{icon}</Box>
            <Box>
                <Typography variant="h5" align="right">
                    {value}
                </Typography>
                <Typography variant="caption">{label}</Typography>
            </Box>
        </Root>
    );
}
