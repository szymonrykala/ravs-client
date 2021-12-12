import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import GenericModal from "../../components/GenericModal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { BuildingUpdateParams } from "../../../../../services/BuildingService";
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";
import MenuItem from "@mui/material/MenuItem";
import { useBuilding } from "../BuildingContext";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { timeFormat } from "../../../../../shared/utils";
import ImageUploadField from "../../components/ImageUploadField";
import Divider from "@mui/material/Divider";
import FormGridContainer from "../../../../../shared/components/FormGridContainer";



interface BuildingEditFormProps {
    open: boolean,
    onClose: () => void
}



function timeToDate(value: string) {
    const [h, m] = value.split(':');
    return new Date(0, 0, 0, Number(h), Number(m));
}


export default function BuildingEditForm({
    open,
    onClose,
}: BuildingEditFormProps) {
    const { allAddresses } = useResourceMap();
    const { updateBuilding, building } = useBuilding();

    const [data, setData] = React.useState<BuildingUpdateParams>({});


    const close = React.useCallback(() => {
        onClose();
        setData({});
    }, [
        onClose
    ]);


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

        setData((old: BuildingUpdateParams) => ({
            ...old,
            [event.target.name]: value
        }));
    }, []);


    const handleTime = React.useCallback((field: 'closeTime' | 'openTime', value: Date) => {
        setData(old => {
            old[field] = timeFormat.format(value);
            return Object.assign({}, old);
        });
    }, [])


    const handleSubmit = React.useCallback(async () => {
        if (await updateBuilding(data)) {
            close();
        }
    }, [
        data,
        close,
        updateBuilding,
    ]);


    const handleSelectChange = React.useCallback((event: SelectChangeEvent<string | number>): void => {
        let value: string | number = event.target.value;
        if (event.target.name === 'addressId') value = Number(value);

        event.target && setData((old: BuildingUpdateParams) => ({
            ...old,
            [event.target.name]: value
        }));
    }, []);


    return (
        <GenericModal
            open={open}
            onClose={onClose}
            aria-label="Okno edycji budynku"
        >
            <Stack spacing={3}>

                <ImageUploadField image={building.image} />
                <Divider />

                <FormGridContainer
                    title='Edycja budynku'
                    subtitle="Zmień właściwości budynku i zatwierdź zmiany."
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
                            value={data.name ?? building.name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6} >
                        <MobileTimePicker
                            label="Godzina otwarcia"
                            inputFormat="HH:mm"
                            value={timeToDate(data.openTime ?? building.openTime)}
                            onChange={(value: any) => handleTime('openTime', value)}
                            renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <MobileTimePicker
                            label="Godzina zamknięcia"
                            inputFormat="HH:mm"
                            value={timeToDate(data.closeTime ?? building.closeTime)}
                            onChange={(value: any) => handleTime('closeTime', value)}
                            renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="wybierz-adres">Adres</InputLabel>
                            <Select
                                labelId="wybierz-adres"
                                name="addressId"
                                value={data.addressId ?? building.address.id}
                                label="Adres"
                                onChange={handleSelectChange}
                            >
                                {allAddresses.map(({ name, id }) => <MenuItem key={name} value={id} >{name} </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                </FormGridContainer>
            </Stack>
        </GenericModal>
    );
}