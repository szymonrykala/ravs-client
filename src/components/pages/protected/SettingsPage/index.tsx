import React from 'react';
import Loading from '../../../../shared/components/Loading';

const LazySettingsPage = React.lazy(() => import('./SettingsPage'));


export default function SettingsPage() {
    return <React.Suspense fallback={<Loading />}>
        <LazySettingsPage />
    </React.Suspense>
};

