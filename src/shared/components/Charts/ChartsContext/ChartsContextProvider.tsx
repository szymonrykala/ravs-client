import React from "react";
import { useParams } from "react-router-dom";
import useSession from "../../../../auth/useSession";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { useQueryParams } from "../../../../contexts/QueryParamsContext";
import { AddressViewParams } from "../../../../services/AddressService";
import { BuildingViewParams } from "../../../../services/BuildingService";
import ChartService, { ChartsData, ChartsQueryData } from "../../../../services/ChartService";
import { AppURLParams } from "../../../../services/interfaces";
import { RoomViewParams } from "../../../../services/RoomService";
import { UserViewParams } from "../../../../services/UserService";


export const chartsContext: any = React.createContext(null);



interface ChartsContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}



export default function ChartsContextProvider(props: ChartsContextProviderProps) {
    const notify = useNotification();
    const urlParams = useParams<AppURLParams>();

    const { user } = useSession();
    const { queryParams } = useQueryParams<ChartsQueryData>();

    const [chartsData, setData] = React.useState<ChartsData | {}>({});


    const load = React.useCallback(async () => {
        let params = urlParams;
        if ('userId' in urlParams && urlParams.userId === 'me') {
            params = { userId: `${user?.id}` }
        }

        try {
            const resp = await ChartService.fetchData(params, queryParams);
            setData(resp.data as ChartsData);
        } catch (err: any) {
            notify(err.description, 'error');
            setData({});
        }
    }, [
        notify,
        queryParams,
        urlParams
    ]);

    React.useEffect(() => {
        load();
    }, [load]);


    if (Object.keys(chartsData).length === 0) return null;

    return (
        <chartsContext.Provider value={{
            chartsData
        }}>
            {props.children}
        </chartsContext.Provider>
    );
}