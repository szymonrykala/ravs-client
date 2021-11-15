import { Typography } from "@mui/material";
import Room from "../../../models/Room";
import AppLink from "../AppLink";
import YesNoIcon from "../YesNoIcon";
import ScrollableListItem from "./ScrollableListItem";


interface ScrollableRoomListItemProps {
    room: Room
}


export default function ScrollableRoomListItem(props: ScrollableRoomListItemProps) {
    return (
        <ScrollableListItem
            id={props.room.name}
            primary={<>
                <AppLink withIcon to={`./${props.room.building}/rooms/${props.room.id}`}>
                    {props.room.name}&nbsp;
                    <YesNoIcon title="Czy sala jest wolna" value={!props.room.occupied} fontSize='small' />
                </AppLink>
            </>}
            secondary={<>
                {props.room.roomType}
                <Typography variant='body2'>
                    piętro&nbsp;{props.room.floor},&nbsp;
                    {props.room.seatsCount}&nbsp;miejsc
                </Typography>
            </>}
        />
    );
}