import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import GenericModal from "../../../../shared/components/GenericModal";
import AddressService, { CreateAddressParams } from "../../../../services/AddressService";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { useResourceMap } from "../../../../contexts/ResourceMapContext";
import FormGridContainer from "../../../../shared/components/FormGridContainer";


interface CreateAddressFormProps {
    open: boolean,
    onClose: () => void,
}


export default function CreateAddressForm(props: CreateAddressFormProps) {
    const notify = useNotification();
    const { reloadMap } = useResourceMap();

    const [data, setData] = React.useState<CreateAddressParams>({
        country: 'Polska',
        town: '',
        street: '',
        number: '',
        postalCode: '',
    });


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((old: CreateAddressParams) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    }, []);


    const handleSubmit = React.useCallback(async () => {
        try {
            await AddressService.create(data);
            reloadMap();
            notify('Adres został dodany', 'success');
            props.onClose();
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [data]);


    return (
        <GenericModal
            open={props.open}
            onClose={props.onClose}
            ariaLabel="Tworzenie adresu"
            ariaDescription="Okno modalne do tworzenia nowych adresów"
        >
            <FormGridContainer
                title='Dodaj nowy adres!'
                subtitle="Wypełnij dane nowego adresu i kliknij zatwierdź."
                onSubmit={handleSubmit}
                onCancel={props.onClose}
            >
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="country"
                        label="Kraj"
                        name="country"
                        value={data.country}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        id="town"
                        label="Miasto"
                        name="town"
                        autoFocus
                        value={data.town}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        id="postalCode"
                        label="Kod pocztowy"
                        name="postalCode"
                        value={data.postalCode}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        required
                        fullWidth
                        id="street"
                        label="Ulica"
                        name="street"
                        value={data.street}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        required
                        fullWidth
                        id="number"
                        label="Number"
                        name="number"
                        value={data.number}
                        onChange={handleChange}
                    />
                </Grid>
            </FormGridContainer>
        </GenericModal>
    );
}