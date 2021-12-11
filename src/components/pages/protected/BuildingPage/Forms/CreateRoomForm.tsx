import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import { RoomType, RoomTypes } from "../../../../../models/Room";
import { CreateRoomParams } from "../../../../../services/RoomService";
import GenericModal from "../../components/GenericModal";
import FormGridContainer from "../../../../../shared/components/FormGridContainer";


interface CreateRoomFormProps {
    open: boolean,
    onClose: () => void,
    handleCreateRoom: (data: CreateRoomParams) => Promise<boolean>
}


export default function CreateRoomForm({
    open,
    onClose,
    handleCreateRoom,
}: CreateRoomFormProps) {

    const [data, setData] = React.useState<CreateRoomParams>({
        name: '',
        roomType: RoomTypes.LECTURE,
        seatsCount: 50,
        floor: 0
    });

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        let value: string | number = event.target.value;

        switch (event.target.name) {
            case "name":
                value = String(value);
                break;
            default:
                value = Number(value);
                break;
        }
        setData((old) => ({
            ...old,
            [event.target.name]: value
        }));
    }, []);


    const handleSelectChange = React.useCallback((event: SelectChangeEvent<RoomType | number>): void => {
        let value: string | number = event.target.value;
        if (event.target.name === 'buildingId') value = Number(value);

        event.target && setData((old) => ({
            ...old,
            [event.target.name]: value
        }));
    }, []);


    const handleSubmit = React.useCallback(async () => {
        if (await handleCreateRoom(data)) {
            onClose();
        }

    }, [
        data,
        handleCreateRoom,
        onClose,
    ]);


    return (
        <GenericModal
            open={open}
            onClose={onClose}
            aria-label="Okno edycji budynku"
        >
            <FormGridContainer
                title='Dodaj nową salę'
                subtitle="Wypełnij dane nowej sali i kliknij zatwierdź."
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
                        value={data.name}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="room-type">Typ Sali</InputLabel>
                        <Select
                            required
                            labelId="room-type"
                            id="roomType"
                            value={data.roomType}
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
                        value={data.seatsCount}
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
                        value={data.floor}
                        onChange={handleChange}
                    />
                </Grid>
            </FormGridContainer>
        </GenericModal >
    );
}