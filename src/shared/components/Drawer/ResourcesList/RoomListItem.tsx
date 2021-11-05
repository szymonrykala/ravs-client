import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MapItem } from "../../../../models/AddressMap";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import paths from "../../../path";
import AppLink from "../../AppLink";



export default function RoomListItem(props: MapItem) {
    return (
        <ListItemButton component={AppLink} to={`${paths.HOME}${props.href}`}>
            <ListItemIcon >
                <ArrowRightIcon />
            </ListItemIcon>
            {/* <ListItemText primary={props.name} /> */}
            {props.name}
        </ListItemButton>
    );
}
