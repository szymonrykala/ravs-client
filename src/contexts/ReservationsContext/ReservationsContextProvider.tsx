import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useSession from "../../auth/useSession";
import Reservation from "../../models/Reservation";
import { AddressViewParams } from "../../services/AddressService";
import { BuildingViewParams } from "../../services/BuildingService";
import ReservationService, { CreateReservationData, ReservationsQueryParams, UpdateReservationData } from "../../services/ReservationService";
import { RoomViewParams } from "../../services/RoomService";
import { UserViewParams } from "../../services/UserService";
import LoadingView from "../../shared/components/LoadingView";
import { useRoomContext } from "../../tabs/protected/RoomPage/RoomContext";
import useNotification from "../NotificationContext/useNotification";
import usePagination from "../PaginationContext/usePagination";
import { useQueryParams } from "../QueryParamsContext";
import ReservationModalContext from "../ReservationModalContext";
import useResourceMap from "../ResourceMapContext/useResourceMap";
import ReservationsContextValue from "./ReservationsContextValue";


export const reservationsContext: any = React.createContext(null);


interface ReservationsContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}



export default function ReservationsContextProvider(props: ReservationsContextProviderProps) {
    const notify = useNotification();
    const { user } = useSession();
    const urlParams = useParams<(
        UserViewParams |
        AddressViewParams |
        BuildingViewParams |
        RoomViewParams |
        {}
    )>();
    const { pagination, setPagination } = usePagination();
    const { getRoomLink } = useResourceMap();
    const roomContext = useRoomContext();
    const { queryParams, setQueryParams } = useQueryParams<ReservationsQueryParams>();

    const [loading, setLoading] = React.useState<boolean>(true);
    const [reservations, setReservations] = React.useState<Reservation[]>([]);


    const load = React.useCallback(async () => {
        try {
            let params = urlParams;
            if (
                Object.keys(params).length === 0 ||
                ('userId' in urlParams && urlParams.userId === 'me')
            ) {
                params = { userId: `${user?.id}` }
            }
            const resp = await ReservationService.getReservations(params, queryParams);

            resp.pagination && setPagination(resp.pagination);
            setReservations(resp.data as Reservation[]);
        } catch (err: any) {
            notify(err.description ?? err.message, 'error');
        }
    }, [queryParams, notify, setPagination]);


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
        </>
    );
}