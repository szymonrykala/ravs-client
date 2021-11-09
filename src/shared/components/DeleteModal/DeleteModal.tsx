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
    }, [objectName, input]);

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
                <Typography variant="h5">
                    Usuwanie {<b>{objectName}</b>}
                </Typography>
                <Typography variant="body1">
                    1. Przepisz nazwę <b>{objectName}</b><br />
                    2. Naciśnij 'Zatwierdź'<br />
                    <br />
                    Tej operacji nie da się cofnąć. Jesteś pewien że chcesz usunąć <b>{objectName}</b>?
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