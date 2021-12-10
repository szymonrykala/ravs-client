import { Box, ListItemButton, ListItemIcon } from "@mui/material";
import { MapItem } from "../../../../models/AddressMap";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import paths from "../../../../shared/path";
import AppLink from "../../../../shared/components/AppLink";



export default function RoomListItem(props: MapItem) {
    return (
        <ListItemButton component='li' >
            <Box sx={{ width: '100%' }} component={AppLink} to={`${paths.HOME}${props.href}`}>
                <ListItemIcon >
                    <ArrowRightIcon />
                </ListItemIcon>
                {props.name}
            </Box>
        </ListItemButton>
    );
}
