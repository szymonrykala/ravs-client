import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import DeleteModal from "../../../../../shared/components/DeleteModal";
import Map from "../../../../../shared/components/Map";
import { displayDate } from "../../../../../shared/utils";
import { useAddress } from "../../AddressContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';



export default function AddressView() {
    const { address, deleteAddress } = useAddress();

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);


    return (
        <>
            <DeleteModal
                objectName={`${address.street} ${address.number}`}
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onSuccess={deleteAddress}
            />

            <Stack spacing={4}>
                <Typography variant="h4" component='h1' color="primary.main">
                    Adres: {address.street}&nbsp;{address.number}
                </Typography>

                <Box>
                    <Map address={address} />
                    <Typography variant="subtitle1" component="p" pt={2}>
                        {address.country},&nbsp;{address.town}&nbsp;{address.postalCode}<br />
                        {address.street}&nbsp;{address.number}
                    </Typography>
                </Box>

                <Box>
                    <Button
                        color='error'
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteModalOpen(true)}
                    >
                        Usuń
                    </Button>

                    <Button
                        startIcon={<EditIcon />}
                        onClick={() => setEditModalOpen(true)}
                    >
                        Edycja
                    </Button>

                    <Button
                        color='success'
                        startIcon={<AddIcon />}
                        onClick={() => setEditModalOpen(true)}
                    >
                        Dodaj budynek
                    </Button>
                </Box>

                <Typography sx={{ color: "text.secondary", fontSize: "smaller" }}>
                    Utworzono: {displayDate(address._created)}<br />
                    Ostatnia aktualizacja: {displayDate(address._updated)}
                </Typography>
            </Stack>
        </>
    );
}


