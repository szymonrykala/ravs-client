import React, { createContext } from "react";
import { useParams } from "react-router-dom";
import Room, { DetailedRoom } from "../../../../models/Room";
import RoomService, { RoomUpdateParams, RoomViewParams } from "../../../../services/RoomService";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import RoomContextValue from "./RoomContextValue";
import { LogsQueryParams } from "../../../../services/interfaces";
import Image from "../../../../models/Image";


interface RoomContextProviderProps {
    children?: React.ReactNode
}

export const RoomContext: any = createContext(null);


export default function RoomContextProvider({
    children
}: RoomContextProviderProps) {
    const notify = useNotification();
    const urlParams = useParams<RoomViewParams>();
    const [room, setRoom] = React.useState<Room | DetailedRoom>();

    React.useLayoutEffect(() => {
        RoomService.setPath(urlParams);
    }, [urlParams.roomId]);

    React.useEffect(() => {
        getRoom();
    }, [urlParams.roomId]);

    const getRoom = async () => {
        const resp = await RoomService.getView();
        setRoom(resp.data as Room | DetailedRoom);
    }

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

    return (
        <RoomContext.Provider value={{
            room,
            updateRoom,
            deleteRoom,
            getLogs,
            uploadImage,
            deleteImage,
            getChartsData
        } as RoomContextValue}>
            {children}
        </RoomContext.Provider>
    );
}