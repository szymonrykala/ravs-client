import React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, IconButton, Link, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import StorageService from "../../../../services/StorageService";



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

    const handleOpen = React.useCallback((ev: React.MouseEvent) => {
        ev.stopPropagation()
        StorageService.save(OPENED_NAME, !open);
        setOpen(old => !old);
    }, [
        OPENED_NAME,
        open
    ]);

    return (
        <>
            <Stack direction="row">
                <ListItemButton component={Link} href={props.href} sx={props.sx}>
                    <ListItemIcon>
                        {props.icon}
                    </ListItemIcon>

                    <ListItemText primary={props.name} />
                </ListItemButton>

                <IconButton sx={{ width: '42px', height: '42px' }} size='medium' onClick={handleOpen}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </Stack>

            <Collapse in={open} timeout="auto" >
                <Stack sx={props.sx}>
                    {props.children}
                </Stack>
            </Collapse>
        </>
    );
}
