import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import GenericModal from "../../../components/GenericModal";
import Reservation from "../../../../../../models/Reservation";
import { UpdateReservationData } from "../../../../../../services/ReservationService";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useResourceMap } from "../../../../../../contexts/ResourceMapContext";
import React from "react";
import useReservations from "../../GenericReservationsTab/ReservationsContext/useReservations";
import FormGridContainer from "../../../../../../shared/components/FormGridContainer";
import DateTimePicker from "../../DateTimePicker";
import { fromLocaleDateTimeString } from "../../../../../../shared/utils";


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
    }, [
        props
    ]);


    const handleSubmit = React.useCallback(async () => {
        if (await updateReservation(props.reservation.id, data)) {
            closeForm();
            setData({});
        }

    }, [
        props,
        data,
        closeForm,
        updateReservation,
    ]);


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((old) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    }, []);


    const handleDateChange = React.useCallback((name: keyof UpdateReservationData, value: Date) => {
        value && setData(old => ({
            ...old,
            [name]: value.toLocaleString('pl')
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
                subtitle="Zmie?? w??a??ciwo??ci pokoju i zatwierd?? zmiany."
                onSubmit={handleSubmit}
                onCancel={props.onClose}
            >
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="outlined-multiline-flexible"
                        label="Tytu??"
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
                    <DateTimePicker
                        value={
                            data.plannedStart ?
                                fromLocaleDateTimeString(data.plannedStart) :
                                new Date(props.reservation.plannedStart)
                        }
                        label="Pocz??tek"
                        onChange={(value) => handleDateChange('plannedStart', value)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <DateTimePicker
                        value={
                            data.plannedEnd ?
                                fromLocaleDateTimeString(data.plannedEnd) :
                                new Date(props.reservation.plannedEnd)
                        }
                        label="Koniec"
                        onChange={(value) => handleDateChange('plannedEnd', value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="wybierz-sal??">Sala</InputLabel>
                        <Select
                            required
                            labelId="wybierz-sal??"
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