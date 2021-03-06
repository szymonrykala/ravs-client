import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Reservation from "../../../../../../models/Reservation";
import { dynamicPaths } from "../../../../../../shared/path";
import ImageService from "../../../../../../services/ImageService";
import { displayDate } from "../../../../../../shared/utils";
import ReservationService from "../../../../../../services/ReservationService";
import { Link } from "@mui/material";
import React from "react";
import Image from "../../../../../../models/Image";


interface ReservationListItemProps {
    data: Reservation,
    onClick: () => void
}

// memoize avatar
const MemAvatar = React.memo((props: { img: Image }) => <Avatar alt="użytkownik" src={ImageService.getLink(props.img)} />)


export default function ReservationListItem({
    data, onClick
}: ReservationListItemProps) {
    const { message, color } = ReservationService.resolveStatus(data);

    return (
        <ListItem
            component='li'
            button
            sx={{
                mb: '2px',
                bgcolor: color,
                '&:hover, &:focus': {
                    bgcolor: color,
                    filter: 'brightness(97%)',
                }
            }}
            onClick={onClick}
        >
            <ListItemAvatar>
                <Link href={dynamicPaths.toUser(data.user.id)}>
                    <MemAvatar img={data.user.image} />
                </Link>
            </ListItemAvatar>

            <ListItemText
                primary={data.title}
                secondary={displayDate(data.actualStart ?? data.plannedStart) + ' - ' + message}
            />
        </ListItem>
    )
}