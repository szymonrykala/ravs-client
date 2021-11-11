import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import AppLink from "../../../AppLink";



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
        const wasOpened = localStorage.getItem(OPENED_NAME);
        if (wasOpened) {
            try {
                setOpen(JSON.parse(wasOpened));
            } catch {
                console.error("do not edit localStorage variables manualy!");
            }
        }
    }, [OPENED_NAME]);

    const handleOpen = (ev: React.MouseEvent) => {
        ev.stopPropagation()
        const newOpen = !open;
        localStorage.setItem(OPENED_NAME, JSON.stringify(newOpen));
        setOpen(newOpen)
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
