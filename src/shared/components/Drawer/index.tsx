import { Divider, Drawer, ListItem, ListItemText } from "@mui/material";
import React from "react";
import MainDrawerList from "./MainDrawerList";
import DrawerPanel from "./DrawerPanel";
import AvatarView from './AvatarView';
import useSession from "../../../auth/useSession";
import ResourcesList from "./ResourcesList";
import AddressMap from "../../../models/AddressMap";
import AddressService from "../../../services/AddressService";


interface AppDrawerProps {
    open: boolean,
    toggleOpen: any,
}

export default function AppDrawer({ toggleOpen, open }: AppDrawerProps) {
    const { user } = useSession();
    const [resources, setResources] = React.useState<AddressMap[]>([]);

    React.useEffect(() => {
        AddressService.getResourcesMap()
            .then(setResources);
    }, [])

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
                <ResourcesList resourcesMap={resources} />

            </DrawerPanel>
        </Drawer>
    );
}
