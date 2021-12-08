import React, { createContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { DetailedRoom } from "../../../../models/Room";
import RoomService, { RoomUpdateParams, RoomViewParams } from "../../../../services/RoomService";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import RoomContextValue from "./RoomContextValue";
import useResourceMap from "../../../../contexts/ResourceMapContext/useResourceMap";
import useTrigger from "../../hooks/useTrigger";


interface RoomContextProviderProps {
    children?: React.ReactNode
}

export const RoomContext: any = createContext(null);


export default function RoomContextProvider({
    children
}: RoomContextProviderProps) {
    const { getBuildingLink, reloadMap } = useResourceMap();
    const notify = useNotification();
    const urlParams = useParams<RoomViewParams>();
    const [room, setRoom] = React.useState<DetailedRoom>();
    const refresh = useTrigger(60_000);

    React.useLayoutEffect(() => {
        RoomService.setPath(urlParams);
    }, [urlParams]); // set new urlParams to service so it get data for propper room


    const getRoom = React.useCallback(async () => {
        const resp = await RoomService.getView();
        setRoom(resp.data as DetailedRoom);
    }, [
        urlParams,
        refresh
    ]); // recompute after change of room


    const setOccupied = React.useCallback((state: boolean) => {
        setRoom(old => {
            if (old)
                return { ...old, occupied: state };
        });
    }, []);


    const updateRoom = React.useCallback(async (body: RoomUpdateParams) => {
        if (!room) return false;

        try {
            await RoomService.update(body);
            setRoom(old => {
                if (old)
                    return { ...old, ...body };
            });
            notify("Sala została zaktualizowana", 'success');

            if (('name' in body && body.name !== room.name)
                || ('buildingId' in body && body.buildingId !== room?.building.id)
            ) {
                reloadMap();
            }
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [notify, reloadMap, room]);


    const deleteRoom = React.useCallback(async () => {
        if (!room) return;

        try {
            await RoomService.remove();
            reloadMap();
            notify("Sala została usunięta", 'success', () => <Redirect to={getBuildingLink(room.building.id)} />);

        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify, room, reloadMap]);


    const updateRFIDTag = React.useCallback(async (key: string) => {
        try {
            await RoomService.updateRFID(key);
            setRoom(old => {
                if (old)
                    return { ...old, RFIDTag: key };
            });

            notify("Tag został przypisany", 'success');
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
            return false;
        }
    }, [notify]);


    const deleteRFIDTag = React.useCallback(async () => {
        try {
            await RoomService.deleteRFIDTag();
            setRoom(old => {
                if (old)
                    return { ...old, RFIDTag: null };
            });
            notify("Tag został usunięty", "success");
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify]);


    React.useEffect(() => {
        getRoom();
        return () => { }
    }, [getRoom]);


    return (
        !Boolean(room) ? null : <RoomContext.Provider value={{
            room,
            updateRoom,
            deleteRoom,
            updateRFIDTag,
            deleteRFIDTag,
            setOccupied
        } as RoomContextValue}>
            {children}
        </RoomContext.Provider>
    );
}
