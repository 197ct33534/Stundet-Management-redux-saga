import * as React from 'react';
import { Outlet } from 'react-router-dom';

export interface StudentFeatureProps {}

export function StudentFeature(props: StudentFeatureProps) {
    React.useEffect(() => {
        console.log('student feature');
    }, []);
    return <Outlet />;
}
