import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import MainDrawerList from "./MainDrawerList";
import DrawerPanel from "./DrawerPanel";
import AvatarView from './AvatarView';
import useSession from "../../../auth/useSession";
import ResourcesList from "./ResourcesList";


interface AppDrawerProps {
    open: boolean,
    toggleOpen: any,
}

export default function AppDrawer({ toggleOpen, open }: AppDrawerProps) {
    const { user } = useSession();

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={toggleOpen}
        >
            <DrawerPanel toggleOpen={(toggleOpen)}>
                <AvatarView user={user} />

                <Divider />
                <MainDrawerList access={user?.access} />

                <Divider />
                <ListItem onClick={(ev: React.MouseEvent) => ev.stopPropagation()}>
                    <ListItemText>
                        Zasoby
                    </ListItemText>
                </ListItem>
                <ResourcesList />

            </DrawerPanel>
        </Drawer>
    );
}
