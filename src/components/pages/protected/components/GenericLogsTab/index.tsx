import React from 'react';
import Loading from '../../../../../shared/components/Loading';

export { default as LogRow } from './LogRow';

const LazyGenericLogsTab = React.lazy(() => import('./GenericLogsTab'))

export default function GenericLogsTab() {
    return <React.Suspense fallback={<Loading />}>
        <LazyGenericLogsTab />
    </React.Suspense>
};
