import { MobileDateTimePicker } from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import { useResourceMap } from "../../../contexts/ResourceMapContext";
import ReservationService, { CreateReservationData } from "../../../services/ReservationService";
import useNotification from "../../../contexts/NotificationContext/useNotification";
import FormGridContainer from "../FormGridContainer";



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


    const handleSubmit = React.useCallback(async () => {
        try {
            await ReservationService.createOne(data);
            notify("Rezerwacja utworzona prawidłowo!", 'success');
            props.onCancel()
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [data, notify, props]);


    return (
        <FormGridContainer
            title='Tworzenie rezerwacji'
            subtitle="Stwórz rezerwację w wybranym przez siebie pokoju. Aby zobaczyć zmiany, przeładu."
            onSubmit={handleSubmit}
            onCancel={props.onCancel}
        >
            <Grid item xs={12}>
                <TextField
                    title="Tytuł rezerwacji"
                    inputProps={{ pattern: '\w+', title: "Tytuł rezerwacji" }}
                    autoFocus
                    required
                    fullWidth
                    // multiline
                    maxRows={4}
                    label="Tytuł"
                    id="outlined-multiline-flexible"
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    multiline
                    maxRows={20}
                    label="Opis"
                    id="outlined-multiline-flexible"
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
        </FormGridContainer>
    );
}