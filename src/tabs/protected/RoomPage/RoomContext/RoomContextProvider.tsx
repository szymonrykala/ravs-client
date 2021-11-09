import React, { createContext } from "react";
import { useParams } from "react-router-dom";
import Room, { DetailedRoom } from "../../../../models/Room";
import RoomService, { RoomUpdateParams, RoomViewParams } from "../../../../services/RoomService";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import RoomContextValue from "./RoomContextValue";
import { LogsQueryParams } from "../../../../services/interfaces";
import Image from "../../../../models/Image";
import LoadingView from "../../../../shared/components/LoadingView";


interface RoomContextProviderProps {
    children?: React.ReactNode
}

export const RoomContext: any = createContext(null);


export default function RoomContextProvider({
    children
}: RoomContextProviderProps) {
    const notify = useNotification();
    const urlParams = useParams<RoomViewParams>();
    const [room, setRoom] = React.useState<DetailedRoom>();

    React.useLayoutEffect(() => {
        RoomService.setPath(urlParams);

        return () => { }
    }, [urlParams.roomId]);

    React.useEffect(() => {
        RoomService.getView()
            .then(resp => setRoom(resp.data as DetailedRoom));

        // getRoom();
        return () => { }
    }, [urlParams.roomId]);

    const getRoom = async () => {
        const resp = await RoomService.getView();
        setRoom(resp.data as DetailedRoom);
    }

    const setOccupied = (state: boolean) => {
        if (room)
            setRoom({ ...room, occupied: state });
    };

    const updateRoom = async (body: RoomUpdateParams) => {
        try {
            await RoomService.update(body);
            room && setRoom({
                ...room,
                ...body
            });
            notify("Sala zaktualizowana!", 'success');
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }

    const deleteRoom = async () => {
        try {
            await RoomService.remove();
            notify("Sala usunięta", 'success');
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }

    const getLogs = async (queryParams: LogsQueryParams) => {
        try {
            return await RoomService.getLogs(queryParams);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }

    const uploadImage = async (image: Blob) => {
        try {
            const resp = await RoomService.uploadImage(image);
            room && resp?.data && setRoom({
                ...room,
                image: {
                    ...room.image,
                    id: Number(resp?.data)
                }
            });
            notify("Pomyślnie zmieniono obraz!", 'success');
            return resp;
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }

    const deleteImage = async (image: Image) => {
        await RoomService.removeImage(image);
    };

    const getChartsData = async (query: any) => {
        return RoomService.getChartsData(query)
    }

    const updateRFIDTag = async (key: string) => {
        try {
            await RoomService.updateRFID(key);
            room && setRoom({ ...room, RFIDTag: key });
            notify("Przypisano tag RFID", 'success');
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
            return false;
        }
    }

    const deleteRFIDTag = async () => {
        try {
            await RoomService.deleteRFIDTag();
            room && setRoom({ ...room, RFIDTag: null });
            notify("Usunięto tag RFID", "success");
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }

    const loaded = React.useMemo(() => {
        return Boolean(room);
    }, [room]);

    return (
        <RoomContext.Provider value={{
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
            <LoadingView
                open={!loaded}
                text="Ładowanie Sali"
            />
            {loaded && children}
        </RoomContext.Provider>
    );
}