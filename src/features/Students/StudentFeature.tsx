import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export interface StudentFeatureProps {}

export function StudentFeature(props: StudentFeatureProps) {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(cityActions.fetchCityList());
    }, [dispatch]);
    return <Outlet />;
}
