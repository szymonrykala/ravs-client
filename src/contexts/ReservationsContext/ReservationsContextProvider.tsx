import React from "react";
import { Redirect } from "react-router-dom";
import Reservation from "../../models/Reservation";
import { APIResponse } from "../../services/interfaces";
import ReservationService, { CreateReservationData, ReservationsQueryParams, UpdateReservationData } from "../../services/ReservationService";
import LoadingView from "../../shared/components/LoadingView";
import { useRoomContext } from "../../tabs/protected/RoomPage/RoomContext";
import useNotification from "../NotificationContext/useNotification";
import usePagination from "../PaginationContext/usePagination";
import ReservationModalContext from "../ReservationModalContext";
import useResourceMap from "../ResourceMapContext/useResourceMap";
import ReservationsContextValue from "./ReservationsContextValue";


export const reservationsContext: any = React.createContext(null);


interface ReservationsContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}



export default function ReservationsContextProvider(props: ReservationsContextProviderProps) {
    const notify = useNotification();
    const { pagination, setPagination } = usePagination();
    const { getRoomLink } = useResourceMap();
    const roomContext = useRoomContext();

    const [loading, setLoading] = React.useState<boolean>(true);
    const [reservations, setReservations] = React.useState<Reservation[]>([]);

    const [queryParams, setQueryParams] = React.useState<ReservationsQueryParams>({});
    const [loader, _setLoader] = React.useState<(queryParams: ReservationsQueryParams) => Promise<APIResponse>>();


    // proxy for setting loader function to the state
    const setLoader = React.useCallback((callback: (queryParams: ReservationsQueryParams) => Promise<APIResponse>) => {
        _setLoader(() => callback)
    }, []);


    const load = React.useCallback(async () => {
        if (loader === undefined) return;
        try {
            const resp = await loader(queryParams);

            resp.pagination && setPagination(resp.pagination);
            setReservations(resp.data as Reservation[]);
        } catch (err: any) {
            notify(err.description ?? err.message, 'error');
        }
    }, [loader, queryParams, notify, setPagination]);


    const triggerReload = () => setQueryParams(old => Object.assign({}, old));


    const pingKeyForReservation = React.useCallback(async (id: number, key: string) => {
        try {
            const reservation = reservations.find(item => item.id === id);
            if (!reservation) return false;

            const resp = await ReservationService.pingKey(id, key);

            setReservations(old => {
                old.forEach(item => {
                    if (item.id !== id) return;

                    if (item.actualStart) {
                        item.actualEnd = new Date().toISOString();
                    }
                    item.actualStart = new Date().toISOString();
                });
                return Object.assign([], old);
            });

            roomContext && roomContext.setOccupied(!reservation.room.occupied);
            resp?.data && notify(resp.data.toString(), 'success');
        } catch (err: any) {
            notify(err.description, 'error');
            return false;
        }
        return true;
    }, [reservations, roomContext, notify]);


    const createReservation = React.useCallback(async (data: CreateReservationData) => {
        try {
            await ReservationService.createOne(data);

            triggerReload();
            notify("Rezerwacja utworzona prawidłowo!", 'success');
        } catch (err: any) {
            notify(err.description, 'error');
            return false;
        }
        return true
    }, [notify]);


    const deleteReservation = React.useCallback(async (reservationId: number) => {
        try {
            await ReservationService.remove(reservationId);
            setReservations(old => old.filter(({ id }) => id !== reservationId));
        } catch (err: any) {
            notify(err.description, 'error');
            return false;
        }
        return true;
    }, [notify]);


    const updateReservation = React.useCallback(async (id: number, data: UpdateReservationData) => {
        try {
            await ReservationService.update(id, data); //call to API

            //update state
            setReservations((old: Reservation[]) => {
                return old.map(item => {
                    if (item.id === id)
                        ['plannedStart', 'plannedEnd', 'description', 'title']
                            .forEach(field => {
                                if (field in data) {
                                    item[field] = data[field];
                                }
                            });
                    return item;
                });
            });

            // when reservation room is changing
            if ('roomId' in data) {
                data.roomId && notify(
                    'Rezerwacja zaktualizowana i przeniesiona!',
                    'success',
                    () => <Redirect to={getRoomLink(Number(data.roomId))} />
                )
            } else {
                notify('Rezerwacja zaktualizowana!', 'success');
            }

        } catch (err: any) {
            notify(err.description, 'error');
            return false;
        }
        return true;
    }, [getRoomLink, notify]);


    // when loading function is recalculated - trigger the loading
    React.useEffect(() => {
        load()
            .finally(() => setLoading(false));
    }, [load]);


    React.useEffect(() => {
        setQueryParams(old => ({
            ...old,
            itemsOnPage: pagination.itemsOnPage,
            currentPage: pagination.currentPage
        }));
    }, [pagination.itemsOnPage, pagination.currentPage]);


    if (loading) return null;

    return (
        <>
            <LoadingView
                open={loading}
                text="Ładowanie Rezerwacji"
            />
            <reservationsContext.Provider value={{
                setLoader,
                reservations,
                setQueryParams,
                updateReservation,
                deleteReservation,
                createReservation,
                pingKeyForReservation,
            } as ReservationsContextValue}>
                <ReservationModalContext>
                    {props.children}
                </ReservationModalContext>
            </reservationsContext.Provider>
        </>
    );
}