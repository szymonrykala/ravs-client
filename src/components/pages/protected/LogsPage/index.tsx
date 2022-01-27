import React from 'react';
import Loading from '../../../../shared/components/Loading';

const LazyLogsPage = React.lazy(() => import('./LogsPage'));


export default function LogsPage() {
    return <React.Suspense fallback={<Loading />}>
        <LazyLogsPage />
    </React.Suspense>
}
