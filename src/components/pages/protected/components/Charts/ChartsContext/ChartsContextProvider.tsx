import React from "react";
import { useParams } from "react-router-dom";
import useSession from "../../../../../../auth/useSession";
import useNotification from "../../../../../../contexts/NotificationContext/useNotification";
import { useQueryParams } from "../../../../../../contexts/QueryParamsContext";
import ChartService, { ChartsData, ChartsQueryData } from "../../../../../../services/ChartService";
import { AppURLParams } from "../../../../../../services/interfaces";
import Loading from "../../../../../../shared/components/Loading";
import useTrigger from "../../../hooks/useTrigger";


export const chartsContext: any = React.createContext(null);



interface ChartsContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}



export default function ChartsContextProvider(props: ChartsContextProviderProps) {
    const notify = useNotification();
    const urlParams = useParams<AppURLParams>();
    const refresh = useTrigger(60_000);

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
        urlParams,
        user?.id,
    ]);

    React.useEffect(() => {
        load();
    }, [
        load,
        refresh
    ]);

    if (Object.keys(chartsData).length === 0) return <Loading />;

    return (
        <chartsContext.Provider value={{
            chartsData
        }}>
            {props.children}
        </chartsContext.Provider>
    );
}