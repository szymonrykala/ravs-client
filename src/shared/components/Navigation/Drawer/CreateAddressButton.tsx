import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import React from "react";
import { CreateAddressForm } from "../../../../pages/protected/AddressPage/Forms";
import AddIcon from '@mui/icons-material/Add';



export default function CreateAddressButton() {
    const [formOpen, setFormOpen] = React.useState<boolean>(false);

    const handleClick = React.useCallback((ev) => {
        ev.stopPropagation();
        setFormOpen(true);
    }, []);

    return (
        <>
            <CreateAddressForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
            />
            <ListItem
                component='div'
                disablePadding
                onClick={handleClick}
                sx={{ color: 'primary.dark' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <AddIcon color='primary' />
                    </ListItemIcon>
                    Dodaj adres
                </ListItemButton>
            </ListItem>
        </>
    );
}