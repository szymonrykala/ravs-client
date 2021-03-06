import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import GenericModal from "../../components/GenericModal";
import { BuildingCreateParams } from "../../../../../services/BuildingService";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { timeFormat } from "../../../../../shared/utils";
import FormGridContainer from "../../../../../shared/components/FormGridContainer";


interface CreateBuildingFormProps {
    open: boolean,
    onClose: () => void,
    handleCreateBuilding: (data: BuildingCreateParams) => Promise<boolean>
}


export default function CreateBuildingForm({
    open,
    onClose,
    handleCreateBuilding,
}: CreateBuildingFormProps) {
    const [data, setData] = React.useState<BuildingCreateParams>({
        name: '',
        openTime: (new Date(0, 0, 0, 7, 0)).toString(),
        closeTime: (new Date(0, 0, 0, 21, 0)).toString()
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


    const handleSubmit = React.useCallback(async () => {
        const success = await handleCreateBuilding({
            ...data,
            closeTime: timeFormat.format(new Date(data.closeTime)),
            openTime: timeFormat.format(new Date(data.openTime))
        });

        if (success) {
            onClose();
        }

    }, [
        data,
        onClose,
        handleCreateBuilding,
    ]);


    return (
        <GenericModal
            open={open}
            onClose={onClose}
            aria-label="Okno do tworzenia budynku"
        >
            <FormGridContainer
                title='Dodaj nowy budynek!'
                subtitle="Wype??nij dane nowego budynku i kliknij zatwierd??."
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

                <Grid item xs={6} >
                    <MobileTimePicker
                        label="Godzina otwarcia"
                        inputFormat="HH:mm"
                        value={data.openTime}
                        onChange={(value: any) => setData(old => ({ ...old, openTime: value }))}
                        renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </Grid>

                <Grid item xs={6}>
                    <MobileTimePicker
                        label="Godzina zamkni??cia"
                        inputFormat="HH:mm"
                        value={data.closeTime}
                        onChange={(value: any) => setData(old => ({ ...old, closeTime: value }))}
                        renderInput={(params: any) => <TextField sx={{ width: '100%' }} {...params} />}
                    />
                </Grid>
            </FormGridContainer>
        </GenericModal>
    );
}