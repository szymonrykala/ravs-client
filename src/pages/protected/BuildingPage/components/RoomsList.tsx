import React from "react";
import Room from "../../../../models/Room";
import ScrollableList, { ScrollableListItem } from "../../components/ScrollableList";
import { useBuilding } from "../BuildingContext";
import { CreateRoomForm } from "../Forms";
import RoomService, { CreateRoomParams } from "../../../../services/RoomService";
import { useParams } from "react-router-dom";
import { BuildingViewParams } from "../../../../services/BuildingService";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { useResourceMap } from "../../../../contexts/ResourceMapContext";
import SmallCard from "../../../../shared/components/SmallCard";



export default function RoomsList() {
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
        return rooms?.map(item => <ScrollableListItem
            key={item.id}
            primary={`Sala ${item.name}`}
            link={`./${item.building}/rooms/${item.id}`}
        />)
    }, [rooms])


    return (
        <>
            <CreateRoomForm
                handleCreateRoom={createRoom}
                open={createRoomModalOpen}
                onClose={() => setCreateRoomModalOpen(false)}
            />

            <SmallCard title="Sale w budynku">
                <ScrollableList onAddItem={() => setCreateRoomModalOpen(true)}>
                    {renderedRooms}
                </ScrollableList>
            </SmallCard>
            <br />
        </>
    );
}