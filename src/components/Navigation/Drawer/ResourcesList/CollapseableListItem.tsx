import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import StorageService from "../../../../services/StorageService";
import AppLink from "../../../../shared/components/AppLink";



interface CallapsableListItemProps {
    name: string,
    href?: string
    children: React.ReactNode,
    icon?: React.ReactNode,
    sx?: any
}


export default function CollapseableListItem(props: CallapsableListItemProps) {
    const [open, setOpen] = React.useState<boolean>(false);

    const OPENED_NAME = React.useMemo(() => `${props.name}-nav-item`, [props.name]);

    React.useEffect(() => {
        setOpen(StorageService.read(OPENED_NAME));
    }, [OPENED_NAME]);

    const handleOpen = (ev: React.MouseEvent) => {
        ev.stopPropagation()
        StorageService.save(OPENED_NAME, !open);
        setOpen(old => !old);
    };

    const label = props.href ? <AppLink to={props.href} sx={{ color: "text.primary" }}>{props.name}</AppLink> : props.name;

    return (
        <ListItem disablePadding component="li" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemButton sx={props.sx}>
                {props.icon &&
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>}
                <ListItemText primary={label} />
                <Box component="span" onClick={handleOpen}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </Box >
            </ListItemButton>

            <Collapse in={open} timeout="auto" sx={props.sx}>
                <List disablePadding>
                    {props.children}
                </List>
            </Collapse>
        </ListItem>
    );
}
