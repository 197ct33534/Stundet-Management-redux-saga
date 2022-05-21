import { AirlineStops, Female, LowPriority, Male } from '@mui/icons-material';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
    dashboardAction,
    selectDashboardLoading,
    selectDashboardStatistics,
    selectHighestStudentsList,
    selectLowestStudentsList,
    selectRankingByCityList,
} from './DashboardSlice';

export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const HighestStudentsList = useAppSelector(selectHighestStudentsList);
    const DashboardStatistics = useAppSelector(selectDashboardStatistics);
    const LowestStudentsList = useAppSelector(selectLowestStudentsList);
    const RankingByCityList = useAppSelector(selectRankingByCityList);

    useEffect(() => {
        dispatch(dashboardAction.fetchData());
    }, [dispatch]);

    return (
        <Box sx={{ position: 'relative', paddingTop: '12px' }}>
            {loading && (
                <LinearProgress sx={{ position: 'absolute', top: '-12px', width: '100%' }} />
            )}
            {/* statistic item */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<Male fontSize="large" />}
                        label="male"
                        value={DashboardStatistics.maleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<Female fontSize="large" />}
                        label="female"
                        value={DashboardStatistics.femaleCount}
                    />
                </Grid>{' '}
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<AirlineStops fontSize="large" />}
                        label="highMarkCount"
                        value={DashboardStatistics.highMarkCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<LowPriority fontSize="large" />}
                        label="lowMarkCount"
                        value={DashboardStatistics.lowMarkCount}
                    />
                </Grid>
            </Grid>
            {/*         HighestStudentsList - LowestStudentsList item */}
            <Box mt={4}>
                <Typography variant="h4">All Student</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Widget title={'danh sách học sinh có điểm cao nhất'}>
                            <StudentRankingList studentList={HighestStudentsList} />
                        </Widget>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Widget title={'danh sách học sinh có điểm thấp nhất'}>
                            <StudentRankingList studentList={LowestStudentsList} />
                        </Widget>
                    </Grid>
                </Grid>
            </Box>
            {/*       Ranking list city item */}
            <Box mt={4}>
                <Typography variant="h4">All City</Typography>
                <Grid container spacing={3}>
                    {RankingByCityList.map((item) => (
                        <Grid item xs={12} md={6} lg={3} key={item.cityId}>
                            <Widget title={`Thành phố ${item.cityName}`}>
                                <StudentRankingList studentList={item.rankingByCity} />
                            </Widget>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
