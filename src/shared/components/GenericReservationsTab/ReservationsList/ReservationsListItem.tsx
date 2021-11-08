import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import AppLink from "../../AppLink";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Reservation from "../../../../models/Reservation";
import { dynamicPaths } from "../../../path";
import ImageService from "../../../../services/ImageService";
import { displayDate } from "../../../utils";
import ReservationService from "../../../../services/ReservationService";


interface ReservationListItemProps {
    reservation: Reservation,
    onClick: () => void
}
export function ReservationListItem({
    reservation, onClick
}: ReservationListItemProps) {


    return (
        <TableRow >
            <TableCell align="left" >
                <ListItem component='div'>
                    <ListItemAvatar>
                        <AppLink to={dynamicPaths.toUser(reservation.user.id)}>
                            <Avatar src={ImageService.getLink(reservation.user.image)} />
                        </AppLink>
                    </ListItemAvatar>
                    <ListItemText
                        primary={reservation.title}
                        secondary={displayDate(reservation.actualStart ?? reservation.plannedStart) +
                            ' - ' + ReservationService.resolveStatus(reservation)}
                    />
                </ListItem>
            </TableCell>
            <TableCell sx={{
                width: 'fit-content'
            }}>
                <IconButton>
                    <OpenInFullIcon onClick={onClick} />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}