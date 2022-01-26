import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";
import ReservationService, { CreateReservationData, UpdateReservationData } from "../../../../../services/ReservationService";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import FormGridContainer from "../../../../../shared/components/FormGridContainer";
import DateTimePicker from "../DateTimePicker";



interface CreateReservationFormProps {
    roomId?: number
    onCancel: () => void
}


export default function CreateReservationForm(props: CreateReservationFormProps) {
    const notify = useNotification();
    const { allRooms } = useResourceMap();

    const [dates, setDates] = React.useState({
        start: (new Date(Date.now() + 3_600_000)),
        end: (new Date(Date.now() + (3_600_000 * 2)))
    });

    const [data, setData] = React.useState<CreateReservationData>({
        title: '',
        description: '',
        plannedStart: '',
        plannedEnd: '',
        roomId: props.roomId ?? 0
    });


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((old) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    }, []);


    const handleSubmit = React.useCallback(async () => {
        data.plannedStart = dates.start.toLocaleString('pl');
        data.plannedEnd = dates.end.toLocaleString('pl');

        try {
            await ReservationService.createOne(data);
            notify("Rezerwacja utworzona!", 'success');
            props.onCancel()
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [
        data,
        notify,
        props,
        dates.start,
        dates.end
    ]);


    const setDate = React.useCallback((key: keyof UpdateReservationData, dateTime: Date) => {
        setDates(old => ({
            ...old,
            [key]: dateTime,
        }));
    }, []);


    return (
        <FormGridContainer
            title='Tworzenie rezerwacji'
            subtitle="Stwórz rezerwację w wybranym przez siebie pokoju."
            onSubmit={handleSubmit}
            onCancel={props.onCancel}
        >
            <Grid item xs={12}>
                <TextField
                    title="Tytuł rezerwacji"
                    inputProps={{ title: "Tytuł rezerwacji" }}
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
                <DateTimePicker
                    label="Początek"
                    value={dates.start}
                    onChange={(value) => setDate('start', value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <DateTimePicker
                    label="Koniec"
                    value={dates.end}
                    onChange={(value) => setDate('end', value)}
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