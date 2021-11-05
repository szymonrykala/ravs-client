import React from "react";
import Reservation from "../../models/Reservation";
import { APIResponse } from "../../services/interfaces";
import { ReservationsQueryParams } from "../../services/ReservationService";
import LoadingView from "../../shared/components/LoadingView";
import useNotification from "../NotificationContext/useNotification";
import ReservationModalContext from "../ReservationModalContext";
import ReservationsContextValue from "./ReservationsContextValue";
import { defaultContextValue } from "./ReservationsContextValue";



export const reservationsContext = React.createContext(defaultContextValue);


interface ReservationsContextProviderProps {
    children: React.ReactNode | React.ReactNodeArray
}



export default function ReservationsContextProvider(props: ReservationsContextProviderProps) {
    const notify = useNotification();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [reservations, setReservations] = React.useState<Reservation[]>([]);

    const [queryParams, setQueryParams] = React.useState<ReservationsQueryParams>({});
    const [loader, _setLoader] = React.useState<(queryParams: ReservationsQueryParams) => Promise<APIResponse>>();

    // proxy for setting loader function to the state
    const setLoader = React.useCallback((callback: (queryParams: ReservationsQueryParams) => Promise<APIResponse>) => {
        _setLoader(() => callback)
    }, []);


    const load = React.useCallback(async () => {
        if (loader === undefined) return;
        setLoading(true);
        try {
            const resp = await loader(queryParams);
            setReservations(resp.data as Reservation[]);
        } catch (err: any) {
            notify(err.description ?? err.message, 'error');
        }
        setLoading(false);
    }, [loader, queryParams]);


    React.useEffect(() => {
        console.log('use effect')
        load();
    }, [loader, queryParams]);

    return (
        <>
            <LoadingView
                open={loading}
                text="Ładowanie Rezerwacji"
            />
            <reservationsContext.Provider value={{
                setLoader,
                reservations,
                setQueryParams
            } as ReservationsContextValue}>
                <ReservationModalContext>
                    {props.children}
                </ReservationModalContext>
            </reservationsContext.Provider>
        </>
    );
}