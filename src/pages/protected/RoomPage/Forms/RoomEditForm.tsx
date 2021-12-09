import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { RoomUpdateParams } from '../../../../services/RoomService';
import { RoomType, RoomTypes } from '../../../../models/Room';
import { useRoomContext } from '../RoomContext';
import ImageUploadField from '../../../../shared/components/ImageUploadField';
import { useResourceMap } from '../../../../contexts/ResourceMapContext';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import GenericModal from '../../../../shared/components/GenericModal';
import FormGridContainer from '../../../../shared/components/FormGridContainer';



interface RoomEditFormProps {
    open: boolean,
    onClose: () => void
}


export default function RoomEditForm({
    open,
    onClose,
}: RoomEditFormProps) {
    const { room, updateRoom } = useRoomContext();
    const { allBuildings } = useResourceMap();

    const [data, setData] = React.useState<RoomUpdateParams>({});


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        let value: string | number | boolean = event.target.value;

        switch (event.target.name) {
            case "name":
                value = String(value);
                break;
            case "blocked":
                value = !event.target.checked;
                break;
            default:
                value = Number(value);
                break;
        }

        setData((old: RoomUpdateParams) => ({
            ...old,
            [event.target.name]: value
        }));
    }, []);


    const handleSelectChange = React.useCallback((event: SelectChangeEvent<RoomType | number>): void => {
        let value: string | number = event.target.value;
        if (event.target.name === 'buildingId') value = Number(value);

        event.target && setData((old: RoomUpdateParams) => ({
            ...old,
            [event.target.name]: value
        }));
    }, []);


    const handleSubmit = React.useCallback(async () => {
        if (await updateRoom(data)) {
            onClose();
        }
    }, [
        data,
        updateRoom,
        onClose
    ]);


    return (
        <GenericModal
            open={open}
            onClose={onClose}
            aria-label="Okno usuwania obiektu"
            sx={{
                maxWidth: "450px",
            }}
        >
            <Stack spacing={2}>
                <ImageUploadField image={room.image} />
                <Divider />

                <FormGridContainer
                    title='Edycja sali'
                    subtitle="Zmień właściwości pokoju i zatwierdź zmiany."
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                >

                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Nazwa"
                            name="name"
                            autoFocus
                            value={data.name ?? room.name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="room-type">Typ Sali</InputLabel>
                            <Select
                                labelId="room-type"
                                id="roomType"
                                value={data.roomType ?? room.roomType}
                                name="roomType"
                                label="Typ Sali"
                                onChange={handleSelectChange}
                            >
                                {Object.values(RoomTypes).map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} >
                        <TextField
                            required
                            name="seatsCount"
                            label="Ilość miejsc"
                            type="number"
                            id="seatsCount"
                            value={data.seatsCount ?? room.seatsCount}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            required
                            name="floor"
                            label="Piętro"
                            type="number"
                            id="floor"
                            value={data.floor ?? room.floor}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="wybierz-budynek">Budynek</InputLabel>
                            <Select
                                labelId="wybierz-budynek"
                                name="buildingId"
                                value={data.buildingId ?? room.building.id}
                                label="Budynek"
                                onChange={handleSelectChange}
                            >
                                {allBuildings.map(({ name, id }) => <MenuItem key={name} value={id} >Budynek &nbsp;{name} </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            labelPlacement="start"
                            control={<Switch id="room-blocked" name="blocked"
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={handleChange}
                                checked={!(data.blocked ?? room.blocked)}
                            />}
                            label="Dostępność Sali"
                        />
                    </Grid>

                </FormGridContainer>
            </Stack>
        </GenericModal>
    );
}