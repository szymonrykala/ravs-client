import React from 'react';
import Loading from '../../../../shared/components/Loading';

const LazyAccessPage = React.lazy(() => import('./AccessPage'));


export default function AccessPage() {
    return <React.Suspense fallback={<Loading />}>
        <LazyAccessPage />
    </React.Suspense>
}
