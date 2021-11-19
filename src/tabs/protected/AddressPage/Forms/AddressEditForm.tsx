import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import GenericModal from "../../../../shared/components/GenericModal";
import { useAddress } from "../AddressContext";
import { UpdateAddressParams } from "../../../../services/AddressService";
import FormGridContainer from "../../../../shared/components/FormGridContainer";



interface AddressEditFormProps {
    open: boolean,
    onClose: () => void
}



export default function AddressEditForm(props: AddressEditFormProps) {
    const { address, updateAddress } = useAddress();

    const [data, setData] = React.useState<UpdateAddressParams>({});


    const close = React.useCallback(() => {
        props.onClose();
        setData({});
    }, []);


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((old: UpdateAddressParams) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    }, []);


    const handleSubmit = React.useCallback(async () => {
        if (Object.keys(data).length === 0 || await updateAddress(data)) {
            close();
        }
    }, [data]);


    return (
        <GenericModal
            open={props.open}
            onClose={props.onClose}
            aria-label="Okno do edycji budynku"
        >
            <FormGridContainer
                title='Edycja adresu'
                subtitle="Zmień właściwości adresu i zatwierdź zmiany."
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
                        value={data.country ?? address.country}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        id="town"
                        label="Miasto"
                        name="town"
                        value={data.town ?? address.town}
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
                        value={data.postalCode ?? address.postalCode}
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
                        value={data.street ?? address.street}
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
                        value={data.number ?? address.number}
                        onChange={handleChange}
                    />
                </Grid>
            </FormGridContainer>
        </GenericModal>
    );
}