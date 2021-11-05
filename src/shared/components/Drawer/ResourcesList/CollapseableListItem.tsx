import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import AppLink from "../../AppLink";
import RouterLink from "../../RouterLink";



interface CallapsableListItemProps {
    name: string,
    href?: string
    children: React.ReactNode,
    icon?: React.ReactNode,
    sx?: any
}


export default function CollapseableListItem(props: CallapsableListItemProps) {
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        const wasOpened = localStorage.getItem(`${props.name}_nav_item`);
        if (wasOpened) {
            try {
                setOpen(JSON.parse(wasOpened));
            } catch {
                console.error("do not edit localStorage variables manualy!");
            }
        }
    }, []);

    const handleOpen = (ev: React.MouseEvent) => {
        ev.stopPropagation()
        const newOpen = !open;
        localStorage.setItem(`${props.name}_nav_item`, JSON.stringify(newOpen));
        setOpen(newOpen)
    };

    const label = props.href ? <AppLink to={props.href} sx={{color:"text.primary"}}>{props.name}</AppLink> : props.name;

    return (
        <>
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
        </>
    );
}
