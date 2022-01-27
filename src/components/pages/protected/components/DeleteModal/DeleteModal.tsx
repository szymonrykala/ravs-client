import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import GenericModal from "../../components/GenericModal";


interface DeleteModalProps {
    open: boolean,
    onClose: () => void,
    onSuccess: () => void
}

export default function DeleteModal({
    open, onSuccess, onClose
}: DeleteModalProps) {
    const notify = useNotification();
    const [input, setInput] = React.useState<string>('');

    const objectName = React.useMemo(()=> (Math.random()).toString(36).substring(5).toUpperCase() ,[]);

    const handleConfirm = React.useCallback(async () => {
        if (input !== objectName) {
            notify("Wpisany tekst jest niepoprawny", 'error');
            return;
        }
        onSuccess();
        setInput('');
    }, [objectName, input, onSuccess, notify]);


    const close = React.useCallback(() => {
        setInput('');
        onClose();
    }, [onClose]);


    return (
        <GenericModal
            open={open}
            onClose={close}
            aria-label="Okno do usuwania obiektu"
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
                    1. Przepisz tekst: <b>{objectName}</b><br />
                    2. Naciśnij "Zatwierdź"
                </Typography>
                <TextField
                    id="random-tekst"
                    label="tekst"
                    variant="outlined"
                    value={input}
                    onChange={(evt) => setInput(evt.target.value)}
                />
                <Stack direction="row" justifyContent="space-around">
                    <Button startIcon={<CancelIcon />} onClick={close}>Anuluj</Button>
                    <Button startIcon={<DeleteIcon color="inherit" />} onClick={handleConfirm} color="error">Zatwierdź</Button>
                </Stack>
            </Stack>
        </GenericModal>
    );
}