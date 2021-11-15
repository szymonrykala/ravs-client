import { Typography } from "@mui/material";
import React from "react";
import Room from "../../../../../models/Room";
import ScrollableHorizaontalList, { RoomListItem } from "../../../../../shared/components/ScrolableHorizaontalList";
import { useBuilding } from "../../BuildingContext";


export default function ScrollableRoomsList() {
    const { getRoomsInBuilding } = useBuilding();

    const [rooms, setRooms] = React.useState<Room[]>();

    const load = React.useCallback(async () => {
        const rooms = await getRoomsInBuilding();
        setRooms(rooms);
    }, [getRoomsInBuilding])


    React.useEffect(() => {
        load();
    }, [load]);


    return (
        <ScrollableHorizaontalList
            title="Lista sal:"
        >
            {rooms?.length === 0 && <Typography>
                Brak sal w tym budynku
            </Typography>}

            {rooms?.map(item => <RoomListItem key={item.id} room={item} />)}

        </ScrollableHorizaontalList>
    );
}