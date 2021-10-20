import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MapItem } from "../../../../models/AddressMap";
import RouterLink from "../../RouterLink";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import paths from "../../../path";



export default function RoomListItem(props: MapItem) {
    return (
        <ListItemButton>
            <ListItemIcon >
                <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={
                <RouterLink to={`${paths.HOME}${props.href}`}>{props.name}</RouterLink>
            } />
        </ListItemButton>
    );
}