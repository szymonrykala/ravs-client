import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import GenericModal from "../../GenericModal";
import { MobileDateTimePicker } from "@mui/lab";
import Reservation from "../../../../models/Reservation";
import { UpdateReservationData } from "../../../../services/ReservationService";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useResourceMap } from "../../../../contexts/ResourceMapContext";
import React from "react";
import useReservations from "../../../../contexts/ReservationsContext/useReservations";
import FormGridContainer from "../../FormGridContainer";


interface EditModalFormProps {
    open: boolean,
    onClose: () => void,
    reservation: Reservation
}

export default function EditModalForm(props: EditModalFormProps) {
    const { updateReservation } = useReservations()
    const { allRooms } = useResourceMap();

    const [data, setData] = React.useState<UpdateReservationData>({});


    const closeForm = React.useCallback(() => {
        props.onClose();
        setData({});
    }, [props]);


    const handleSubmit = React.useCallback(async () => {
        if (await updateReservation(props.reservation.id, data)){
            closeForm();
            setData({});
        }

    }, [props, data, closeForm, updateReservation]);


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
            aria-label="Okno do edycji rezerwacji"
        >
            <FormGridContainer
                title='Edycja rezerwacji'
                subtitle="Zmień właściwości pokoju i zatwierdź zmiany."
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

                <Grid item xs={12} sm={6}>
                    <MobileDateTimePicker
                        minDate={new Date()}
                        label="Początek"
                        inputFormat="yyyy-MM-dd HH:mm"
                        value={data.plannedStart ?? props.reservation.plannedStart}
                        onChange={(value: any) => setData(old => ({ ...old, plannedStart: value }))}
                        renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <MobileDateTimePicker
                        minDate={new Date()}
                        label="Koniec"
                        inputFormat="yyyy-MM-dd HH:mm"
                        value={data.plannedEnd ?? props.reservation.plannedEnd}
                        onChange={(value: any) => setData(old => ({ ...old, plannedEnd: value }))}
                        renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
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
        </GenericModal>
    );
}