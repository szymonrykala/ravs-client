import { Avatar, Link, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ImageService from "../../../../../services/ImageService";
import Room from "../../../../../models/Room";
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";
import React from "react";

interface RoomItemProps {
    room: Room
}

export default function RoomItem({
    room
}: RoomItemProps) {
    const { getRoomLink } = useResourceMap();

    const roomLink = React.useMemo(() => getRoomLink(room.id), [
        room.id,
        getRoomLink
    ]);

    return (
        <ListItem button component={Link} href={roomLink}>
            <ListItemAvatar>
                <Avatar
                    src={ImageService.getLink(room.image)}
                    alt={`zdjęcie sali ${room.name}`}
                />
            </ListItemAvatar>

            <ListItemText
                primary={`Sala ${room.name}`}
                secondary={room.roomType}
            />
        </ListItem>
    );
}