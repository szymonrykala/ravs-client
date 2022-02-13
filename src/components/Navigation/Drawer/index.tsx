import React from "react";
import { Divider, Drawer, ListItem, ListItemText } from "@mui/material";
import MainDrawerList from "./MainDrawerList";
import DrawerPanel from "./DrawerPanel";
import AvatarView from './AvatarView';
import useSession from "../../../auth/useSession";
import ResourcesList from "./ResourcesList";
import CreateAddressButton from "./CreateAddressButton";
import useResolvedAccess from "../../pages/protected/hooks/useResolvedAccess";


interface AppDrawerProps {
    open: boolean,
    toggleOpen: any,
}

export default function AppDrawer({ toggleOpen, open }: AppDrawerProps) {
    const { premisesAdmin } = useResolvedAccess();
    const { user } = useSession();

    return (
        <Drawer
            variant="temporary"
            ModalProps={{
                keepMounted: true
            }}
            anchor="left"
            open={open}
            onClose={toggleOpen}
        >
            <DrawerPanel toggleOpen={(toggleOpen)}>
                <AvatarView user={user} />

                <Divider />
                <MainDrawerList />

                <Divider />
                <ListItem
                    onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
                    component="div"
                    sx={{ pb: 0, color: 'text.disabled' }}
                >
                    <ListItemText>
                        Zasoby:
                    </ListItemText>
                </ListItem>
                <ResourcesList />

            </DrawerPanel>
            {
                premisesAdmin && <CreateAddressButton />
            }
        </Drawer>
    );
}
