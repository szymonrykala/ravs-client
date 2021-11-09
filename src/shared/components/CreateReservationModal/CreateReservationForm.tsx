import { MobileDateTimePicker } from "@mui/lab";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useResourceMap } from "../../../contexts/ResourceMapContext";
import ReservationService, { CreateReservationData } from "../../../services/ReservationService";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import useNotification from "../../../contexts/NotificationContext/useNotification";


interface CreateReservationFormProps {
    roomId?: number
    onCancel: () => void
}

export default function CreateReservationForm(props: CreateReservationFormProps) {
    const notify = useNotification();
    const { allRooms } = useResourceMap();
    const [data, setData] = React.useState<CreateReservationData>({
        title: '',
        description: '',
        plannedStart: new Date(),
        plannedEnd: new Date(),
        roomId: props.roomId ?? 0
    });


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((old) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    }, []);

    
    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await ReservationService.createOne(data);
            notify("Rezerwacja utworzona prawidłowo!", 'success');
            props.onCancel()
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [data]);

    return (
        <Grid container component="form" spacing={2} onSubmit={handleSubmit}>
            <Grid item xs={12}>
                <Typography variant='h4' pb={1}>
                    Tworzenie rezerwacji
                </Typography>
                <Typography variant="body2" color='text.secondary' pb={2}>
                    Stwórz rezerwację w wybranym przez siebie pokoju. Aby zobaczyć zmiany, przeładu
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Tytuł"
                    multiline
                    maxRows={4}
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Opis"
                    multiline
                    maxRows={20}
                    name='description'
                    value={data.description}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MobileDateTimePicker
                    minDate={new Date()}
                    label="Początek"
                    inputFormat="yyyy-MM-dd HH:mm"
                    value={data.plannedStart}
                    onChange={(value: any) => setData(old => ({ ...old, plannedStart: value }))}
                    renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MobileDateTimePicker
                    minDate={new Date()}
                    label="Koniec"
                    inputFormat="yyyy-MM-dd HH:mm"
                    value={data.plannedEnd}
                    onChange={(value: any) => setData(old => ({ ...old, plannedEnd: value }))}
                    renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="wybierz-salę">Sala</InputLabel>
                    <Select
                        required
                        labelId="wybierz-budynek"
                        name="buildingId"
                        value={data.roomId}
                        label="Budynek"
                        onChange={(evt: any) => setData(old => ({ ...old, roomId: Number(evt.target.value) }))}
                    >
                        {allRooms.map(({ name, id }) => <MenuItem key={name} value={id} >Sala &nbsp;{name} </MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-around" pt="15px">
                    <Button startIcon={<CancelIcon />} onClick={props.onCancel}>Zamknij</Button>
                    <Button startIcon={<SaveIcon />} type="submit" color="success">Zatwierdź</Button>
                </Stack>
            </Grid>
        </Grid>
    );
}