import React from "react";
import { Box, Link, ListItem, ListItemIcon } from "@mui/material";
import { MapItem } from "../../../../models/AddressMap";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import paths from "../../../../shared/path";



function RoomListItem(props: MapItem) {
    return (
        <ListItem button component={Link} href={`${paths.HOME}${props.href}`}>
            <Box sx={{ width: '100%' }} >
                <ListItemIcon >
                    <ArrowRightIcon />
                </ListItemIcon>
                {props.name}
            </Box>
        </ListItem>
    );
}

export default React.memo(RoomListItem);