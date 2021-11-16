import React from "react";
import Room from "../../../../../models/Room";
import ScrollableHorizaontalList, { RoomListItem } from "../../../../../shared/components/ScrolableHorizaontalList";
import { useBuilding } from "../../BuildingContext";
import { CreateRoomForm } from "../../Forms";
import RoomService, { CreateRoomParams } from "../../../../../services/RoomService";
import { useParams } from "react-router-dom";
import { BuildingViewParams } from "../../../../../services/BuildingService";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";



export default function ScrollableRoomsList() {
    const { getRoomsInBuilding } = useBuilding();
    const { reloadMap } = useResourceMap();

    const urlParams = useParams() as BuildingViewParams;
    const notify = useNotification();

    const [createRoomModalOpen, setCreateRoomModalOpen] = React.useState<boolean>(false);
    const [rooms, setRooms] = React.useState<Room[]>();


    const load = React.useCallback(async () => {
        const rooms = await getRoomsInBuilding();
        setRooms(rooms);
    }, [getRoomsInBuilding])


    React.useEffect(() => {
        load();
    }, [load]);


    const createRoom = React.useCallback(async (data: CreateRoomParams) => {
        try {
            await RoomService.create(urlParams, data);
            notify('Nowa sala utworzona!', 'success');
            load();
            reloadMap();
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [notify, reloadMap, load]);


    const renderedRooms = React.useMemo(() => {
        return rooms?.map(item => <RoomListItem key={item.id} room={item} />)
    }, [rooms])


    return (
        <>
            <CreateRoomForm
                handleCreateRoom={createRoom}
                open={createRoomModalOpen}
                onClose={() => setCreateRoomModalOpen(false)}
            />

            <ScrollableHorizaontalList
                title="Lista sal:"
                onAddItem={() => setCreateRoomModalOpen(true)}
            >
                {renderedRooms}
            </ScrollableHorizaontalList>
        </>
    );
}