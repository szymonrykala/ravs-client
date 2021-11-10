import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { RoomUpdateParams } from '../../../services/RoomService';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Room, { DetailedRoom, RoomType, RoomTypes } from '../../../models/Room';
import { useRoomContext } from './RoomContext';
import ImageUploadField from '../../../shared/components/ImageUploadField';
import { useResourceMap } from '../../../contexts/ResourceMapContext';
import { BuildingItem } from '../../../models/AddressMap';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


interface RoomEditFormProps {
    onCancel: () => void
}

function getBuildingId(room: Room | DetailedRoom): number {
    return (typeof room.building === 'number') ? room.building : room.building.id;
}


export default function RoomEditForm({
    onCancel
}: RoomEditFormProps) {
    const { room, updateRoom, uploadImage, deleteImage } = useRoomContext();
    const { resourceMap, reloadMap } = useResourceMap();

    const [data, setData] = React.useState<RoomUpdateParams>({
        name: room.name,
        roomType: room.roomType,
        seatsCount: room.seatsCount,
        floor: room.floor,
        buildingId: getBuildingId(room),
        blocked: room.blocked,
    });


    const buildings: { name: string, id: number }[]
        = React.useMemo(() => {
            return resourceMap.map(address => address.buildings).flat(2).map(({ id, name }) => ({ name, id }));
        }, [resourceMap]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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

        setData({
            ...data,
            [event.currentTarget.name]: value
        });
    }

    const handleSelectChange = (event: SelectChangeEvent<RoomType | number>): void => {
        let value: string | number = event.target.value;
        if (event.target.name === 'buildingId') value = Number(value);

        event.target && setData({
            ...data,
            [event.target.name]: value
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateRoom(data);

        if (getBuildingId(room) !== data.buildingId) {
            reloadMap();
        }
    }

    return (
        data && <>
            <Stack spacing={2}>
                <ImageUploadField image={room.image}
                    onUpload={uploadImage}
                    onDelete={deleteImage}
                />
                <Divider />
                <span>
                    <Typography variant="subtitle1" >
                        Dane Sali:
                    </Typography>
                    <Grid container spacing={1} component="form" onSubmit={handleSubmit} >
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
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
                                margin="dense"
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
                                margin="dense"
                                required
                                name="floor"
                                label="Piętro"
                                type="number"
                                id="floor"
                                value={data.floor}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="wybierz-budynek">Budynek</InputLabel>
                                <Select
                                    labelId="wybierz-budynek"
                                    name="buildingId"
                                    value={data.buildingId}
                                    label="Budynek"
                                    onChange={handleSelectChange}
                                >
                                    {buildings.map(({ name, id }) => <MenuItem key={name} value={id} >Budynek &nbsp;{name} </MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                labelPlacement="start"
                                control={<Switch id="room-blocked" name="blocked"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    onChange={handleChange}
                                    checked={!data.blocked}
                                />}
                                label="Dostępność Sali"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-around" mt={1.5}>
                                <Button startIcon={<CancelIcon />} onClick={onCancel}>Zamknij</Button>
                                <Button startIcon={<SaveIcon />} type="submit" color="success">Zapisz</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </span>
            </Stack>
        </>
    );
}