import React from "react";
import useSession from "../../../../auth/useSession";


const defaultAccess = {
    'owner': false,
    'accessAdmin': false,
    'premisesAdmin': false,
    'keysAdmin': false,
    'reservationsAdmin': false,
    'reservationsAbility': false,
    'logsAdmin': false,
    'statsViewer': false,
    'myId': (id: number): boolean => false
}

export default function useResolvedAccess() {
    const { user } = useSession();

    const access = React.useMemo(() => {
        if (!user) return defaultAccess;

        const { owner,
            accessAdmin,
            premisesAdmin,
            keysAdmin,
            reservationsAdmin,
            reservationsAbility,
            logsAdmin,
            statsViewer
        } = user.access;

        return {
            'owner': owner,
            'accessAdmin': owner || accessAdmin,
            'premisesAdmin': owner || premisesAdmin,
            'keysAdmin': owner || keysAdmin,
            'reservationsAdmin': owner || reservationsAdmin,
            'reservationsAbility': owner || reservationsAbility,
            'logsAdmin': owner || logsAdmin,
            'statsViewer': owner || statsViewer,
            'myId': (id: number) => owner || (user.id === id)
        } as typeof defaultAccess;
    }, [user]);

    return access;
}
