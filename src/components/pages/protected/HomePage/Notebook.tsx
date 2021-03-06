import { Button, InputBase } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import SaveIcon from '@mui/icons-material/Save';
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import SmallCard from "../components/SmallCard";
import MetadataService from "../../../../services/MetadataService";



function Notebook() {
    const notify = useNotification();

    const [data, setData] = React.useState<string>();


    React.useEffect(() => {
        setData(MetadataService.notes)
    }, []);


    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!data) return;

        try {
            MetadataService.notes = data;

            notify('Notatki zostały zapisane', 'success');
            setData(undefined);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [
        data,
        notify,
    ]);


    const handleChange = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value)
    }, []);


    return (
        <SmallCard title='Notatnik'>
            <Box component='form' onSubmit={handleSubmit} sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
            }}>
                <InputBase
                    aria-label="twoje notatki"
                    title='twoje notatki'
                    multiline
                    minRows={4}
                    maxRows={10}
                    name='search'
                    value={data ?? MetadataService.notes ?? ''}
                    onChange={handleChange}
                    placeholder="Twoje notatki"
                    sx={{
                        width: '100%',
                        height: '100%',
                        p: 1,
                        bgcolor: 'background.default'
                    }}
                    inputProps={{
                        'aria-label': 'Twoje notatki'
                    }}
                />
                <Button
                    title='Zapisz notatki'
                    aria-label='Zapisz notatki'
                    sx={{ mr: '0px', ml: 'auto' }}
                    startIcon={<SaveIcon />}
                    type="submit">
                    Zapisz
                </Button>
            </Box>
        </SmallCard >
    );
}

export default React.memo(Notebook);