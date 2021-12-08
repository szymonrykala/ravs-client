import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import GenericModal from "../../../../../shared/components/GenericModal";
import { MobileDateTimePicker } from "@mui/lab";
import Reservation from "../../../../../models/Reservation";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";
import React from "react";
import useReservations from "../../GenericReservationsTab/ReservationsContext/useReservations";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { displayDate } from "../../../../../shared/utils";
import { CreateReservationData } from "../../../../../services/ReservationService";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import FormGridContainer from "../../../../../shared/components/FormGridContainer";


interface CopyModalFormProps {
    open: boolean,
    onClose: () => void,
    reservation: Reservation
}

interface DateTimeSlot {
    color: string | null,
    from: Date,
    to: Date,
}

interface CopyReservationData {
    title: string,
    description: string,
    roomId?: number
}


export default function CopyModalForm(props: CopyModalFormProps) {
    const { createReservation } = useReservations()
    const { allRooms } = useResourceMap();
    const notify = useNotification();

    const [dates, setDates] = React.useState<DateTimeSlot>({
        color: '',
        from: new Date(props.reservation.plannedStart),
        to: new Date(props.reservation.plannedEnd),
    });

    const [copyDates, setCopyDates] = React.useState<DateTimeSlot[]>([]);
    const [data, setData] = React.useState<CopyReservationData>({
        title: props.reservation.title,
        description: props.reservation.description,
        roomId: props.reservation.room.id ?? 0
    });


    const closeForm = React.useCallback(() => {
        props.onClose();
        // setCopyDates([]);
    }, [props]);


    const handleSubmit = React.useCallback(async () => {

        const createCalls = copyDates.map(async (date) => {
            const success = await createReservation({
                ...data,
                plannedStart: date.from,
                plannedEnd: date.to
            } as CreateReservationData);
            date.color = success ? 'green' : 'red';
            return date;
        })
        const processed = await Promise.all(createCalls);
        setCopyDates(processed);

    }, [data, copyDates, createReservation]);


    const handleDeleteCopyDate = React.useCallback((index: number) => {
        setCopyDates(old => {
            old.splice(index, 1);
            return Object.assign([], old);
        });
    }, []);


    const handleAddDate = React.useCallback(() => {
        if (copyDates.find(({ from, to }) => from === dates.from || to === dates.to)) {
            notify("Daty powinny się różnić", 'error');
            return;
        };

        setCopyDates(old => {
            old.push({
                ...dates,
                color: ''
            });
            return Object.assign([], old);
        });
    }, [dates, copyDates]);


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((old) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    }, []);

    return (
        <GenericModal
            open={props.open}
            onClose={closeForm}
            aria-label="Okno do kopiowania rezerwacji"
        >

            <FormGridContainer
                title='Kopiowanie rezerwacji'
                subtitle="Skopiuj rezerwację dla wybranych przez siebie nowych dat."
                onSubmit={handleSubmit}
                onCancel={props.onClose}
            >
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="outlined-multiline-flexible"
                        label="Tytuł"
                        multiline
                        maxRows={4}
                        name='title'
                        value={data.title ?? props.reservation.title}
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
                        value={data.description ?? props.reservation.description}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <MobileDateTimePicker
                        minDate={new Date()}
                        label="Początek"
                        inputFormat="yyyy-MM-dd HH:mm"
                        value={dates.from}
                        onChange={(value: any) => setDates(old => ({ ...old, from: value }))}
                        renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <MobileDateTimePicker
                        minDate={new Date()}
                        label="Koniec"
                        inputFormat="yyyy-MM-dd HH:mm"
                        value={dates.to}
                        onChange={(value: any) => setDates(old => ({ ...old, to: value }))}
                        renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <Button
                        size='large'
                        sx={{
                            height: '100%',
                            width: '100%'
                        }}
                        variant='outlined'
                        onClick={handleAddDate}
                    >
                        Dodaj
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Stack
                        spacing={1}
                        sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            padding: 0.5,
                            bgcolor: 'background.default',
                            maxHeight: '200px',
                            overflow: 'auto',
                        }}>
                        {copyDates.length === 0 && <Typography textAlign='center' component='p'>
                            Brak dat
                        </Typography>}
                        {
                            copyDates.map(({ color, from, to }, index) =>
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        pl:'3px'
                                    }}>
                                    <Typography component='p' sx={{ color: color }}>
                                        {displayDate(from.toString())}&nbsp;-&nbsp;{displayDate(to.toString())}
                                    </Typography>
                                    <IconButton
                                        onClick={() => handleDeleteCopyDate(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            )
                        }
                    </Stack>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="wybierz-salę">Sala</InputLabel>
                        <Select
                            required
                            labelId="wybierz-salę"
                            name="roomId"
                            value={data.roomId ?? props.reservation.room.id}
                            label="Sala"
                            onChange={(evt: any) => setData(old => ({ ...old, roomId: Number(evt.target.value) }))}
                        >
                            {allRooms.map(({ name, id }) => <MenuItem key={name} value={id} >Sala &nbsp;{name} </MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </FormGridContainer>

        </GenericModal >
    );
}