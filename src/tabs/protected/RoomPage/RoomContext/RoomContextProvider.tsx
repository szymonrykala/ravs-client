import React, { createContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { DetailedRoom } from "../../../../models/Room";
import RoomService, { RoomUpdateParams, RoomViewParams } from "../../../../services/RoomService";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import RoomContextValue from "./RoomContextValue";
import { LogsQueryParams } from "../../../../services/interfaces";
import Image from "../../../../models/Image";
import useResourceMap from "../../../../contexts/ResourceMapContext/useResourceMap";


interface RoomContextProviderProps {
    children?: React.ReactNode
}

export const RoomContext: any = createContext(null);


export default function RoomContextProvider({
    children
}: RoomContextProviderProps) {
    const { getBuildingLink } = useResourceMap();
    const notify = useNotification();
    const urlParams = useParams<RoomViewParams>();
    const [room, setRoom] = React.useState<DetailedRoom>();


    React.useLayoutEffect(() => {
        RoomService.setPath(urlParams);
    }, [urlParams]); // set new urlParams to service so it get data for propper room


    const getRoom = React.useCallback(async () => {
        const resp = await RoomService.getView();
        setRoom(resp.data as DetailedRoom);
    }, [urlParams]); // recompute after change of room


    const getLogs = React.useCallback(async (queryParams: LogsQueryParams) => {
        try {
            return await RoomService.getLogs(queryParams);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify, urlParams]); // urlParams, because we need to pass logs getter for a new room


    const getChartsData = React.useCallback(async (query: any) => {
        return RoomService.getChartsData(query)
    }, [urlParams]);


    const setOccupied = React.useCallback((state: boolean) => {
        setRoom(old => {
            if (old)
                return { ...old, occupied: state };
        });
    }, []);


    const updateRoom = React.useCallback(async (body: RoomUpdateParams) => {
        try {
            await RoomService.update(body);
            setRoom(old => {
                if (old)
                    return { ...old, ...body };
            });
            notify("Sala zaktualizowana!", 'success');
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify]);


    const deleteRoom = React.useCallback(async () => {
        try {
            await RoomService.remove();
            notify("Sala usunięta", 'success');
        } catch (err: any) {
            room &&
                notify(err.description, 'error', () => <Redirect to={getBuildingLink(room.building.id)} />);
        }
    }, [notify, room]);


    const uploadImage = React.useCallback(async (image: Blob) => {
        try {
            const resp = await RoomService.uploadImage(image);
            setRoom(old => {
                if (old && resp.data)
                    return {
                        ...old,
                        image: {
                            ...old.image,
                            id: Number(resp.data)
                        }
                    };
            });
            notify("Pomyślnie zmieniono obraz!", 'success');
            return resp;
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify]);


    const deleteImage = React.useCallback(async (image: Image) => {
        await RoomService.removeImage(image);
    }, []);


    const updateRFIDTag = React.useCallback(async (key: string) => {
        try {
            await RoomService.updateRFID(key);
            setRoom(old => {
                if (old)
                    return { ...old, RFIDTag: key };
            });

            notify("Przypisano tag RFID", 'success');
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
            notify("Usunięto tag RFID", "success");
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
            getLogs,
            uploadImage,
            deleteImage,
            getChartsData,
            updateRFIDTag,
            deleteRFIDTag,
            setOccupied
        } as RoomContextValue}>
            {children}
        </RoomContext.Provider>
    );
}
