import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useSession from "../../auth/useSession";
import Reservation from "../../models/Reservation";
import { AddressViewParams } from "../../services/AddressService";
import { BuildingViewParams } from "../../services/BuildingService";
import ReservationService, { CreateReservationData, ReservationsQueryParams, UpdateReservationData } from "../../services/ReservationService";
import { RoomViewParams } from "../../services/RoomService";
import { UserViewParams } from "../../services/UserService";
import { useRoomContext } from "../../tabs/protected/RoomPage/RoomContext";
import useNotification from "../NotificationContext/useNotification";
import { useQueryParams } from "../QueryParamsContext";
import ReservationModalContext from "../ReservationModalContext";
import useResourceMap from "../ResourceMapContext/useResourceMap";
import ReservationsContextValue from "./ReservationsContextValue";


export const reservationsContext: any = React.createContext(null);


interface ReservationsContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}



export default function ReservationsContextProvider(props: ReservationsContextProviderProps) {
    const { queryParams, setQueryParams } = useQueryParams<ReservationsQueryParams>();
    const notify = useNotification();
    const { getRoomLink } = useResourceMap();
    const roomContext = useRoomContext();
    const { user } = useSession();
    const urlParams = useParams<(
        UserViewParams |
        AddressViewParams |
        BuildingViewParams |
        RoomViewParams |
        {}
    )>();

    const [reservations, setReservations] = React.useState<Reservation[]>();


    const load = React.useCallback(async () => {
        // if user or queryParams (pagination etc) is not set then do nothing
        if (Object.keys(queryParams).length === 0 || !user) return;
        try {
            let params = urlParams;
            if (
                Object.keys(params).length === 0 ||
                ('userId' in urlParams && urlParams.userId === 'me')
            ) {
                params = { userId: `${user?.id}` }
            }
            const resp = await ReservationService.getReservations(params, queryParams);

            resp.pagination && setQueryParams((old) => ({
                ...old,
                pagesCount: resp.pagination?.pagesCount,
            }));
            setReservations(resp.data as Reservation[]);
        } catch (err: any) {
            notify(err.description ?? err.message, 'error');
        }
    }, [
        queryParams.currentPage,
        queryParams.itemsOnPage,
        queryParams.from,
        queryParams.search,
        setQueryParams,
        notify,
        user
    ]);


    // when loading function is recalculated - trigger the loading
    React.useEffect(() => {
        load();
    }, [load]);


    const triggerReload = () => setQueryParams(old => Object.assign({}, old));


    const pingKeyForReservation = React.useCallback(async (id: number, key: string) => {
        if (!reservations) return;
        try {
            const reservation = reservations.find(item => item.id === id);
            if (!reservation) return false;

            const resp = await ReservationService.pingKey(id, key);

            setReservations(old => {
                old && old.forEach(item => {
                    if (item.id !== id) return;

                    if (item.actualStart) {
                        item.actualEnd = new Date().toISOString();
                    } else {
                        item.actualStart = new Date().toISOString();
                    }

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
            setReservations(old => old && old.filter(({ id }) => id !== reservationId));
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
            setReservations((old) => {
                return old && old.map(item => {
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


    if (!reservations) return null;

    return (
        <reservationsContext.Provider value={{
            reservations,
            updateReservation,
            deleteReservation,
            createReservation,
            pingKeyForReservation,
        } as ReservationsContextValue}>
            <ReservationModalContext>
                {props.children}
            </ReservationModalContext>
        </reservationsContext.Provider>
    );
}