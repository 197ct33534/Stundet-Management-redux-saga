import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
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
    console.log({
        loading,
        HighestStudentsList,
        DashboardStatistics,
        LowestStudentsList,
        RankingByCityList,
    });
    useEffect(() => {
        dispatch(dashboardAction.fetchData());
    }, [dispatch]);

    return <div>Dashboard</div>;
}
