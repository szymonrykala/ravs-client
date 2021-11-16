import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import useNotification from "../../../contexts/NotificationContext/useNotification";
import GenericModal from "../GenericModal";


interface DeleteModalProps {
    open: boolean,
    onClose: () => void,
    objectName: string
    onSuccess: () => void
}

export default function DeleteModal({
    open, onSuccess, onClose, objectName
}: DeleteModalProps) {
    const notify = useNotification();
    const [input, setInput] = React.useState<string>('');


    const handleConfirm = React.useCallback(async () => {
        if (input !== objectName) {
            notify("Wpisana nazwa jest niepoprawna", 'error');
            return;
        }
        onSuccess();
    }, [objectName, input, onSuccess, notify]);


    return (
        <GenericModal
            open={open}
            onClose={onClose}
            ariaLabel="usuwanie obiektu"
            ariaDescription="Okno modalne do usuwania obiektu po kliknięciu zatwierdź"
            sx={{
                maxWidth: "400px",
            }}
        >
            <Stack direction="column" spacing={3}>
                <Typography variant="h5" color='primary.dark'>
                    Usuwanie obiektu
                </Typography>
                <Typography variant="body1" color='text.secondary'>
                    Tej operacji nie da się cofnąć.
                    <br />
                    1. Przepisz nazwę <b>{objectName}</b><br />
                    2. Naciśnij 'Zatwierdź'
                </Typography>
                <TextField
                    id="resource-name"
                    label="nazwa"
                    variant="outlined"
                    value={input}
                    onChange={(evt) => setInput(evt.target.value)}
                />
                <Stack direction="row" justifyContent="space-around">
                    <Button startIcon={<CancelIcon />} onClick={onClose}>Anuluj</Button>
                    <Button startIcon={<DeleteIcon />} onClick={handleConfirm} color="error">Zatwierdź</Button>
                </Stack>
            </Stack>
        </GenericModal>
    );
}