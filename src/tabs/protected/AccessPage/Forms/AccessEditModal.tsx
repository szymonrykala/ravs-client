import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import React from "react";
import Access from "../../../../models/Access";
import { AccessUpdateParams } from "../../../../services/AccessService";
import FormGridContainer from "../../../../shared/components/FormGridContainer";
import GenericModal from "../../../../shared/components/GenericModal";



interface AccessEditModalProps {
    access: Access,
    open: boolean,
    onClose: () => void,
    onSubmit: (accessId: number, data: AccessUpdateParams) => Promise<boolean>
}


const fields = [
    {
        name: 'owner',
        label: 'Właściciel'
    }, {
        name: 'accessAdmin',
        label: 'Administrator klas dostępu'
    }, {
        name: 'premisesAdmin',
        label: 'Administrator inwentarza'
    }, {
        name: 'keysAdmin',
        label: 'Administrator kluczy'
    }, {
        name: 'reservationsAdmin',
        label: 'Administrator rezerwacji '
    }, {
        name: 'reservationsAbility',
        label: 'Możliwość rezerwacji'
    }, {
        name: 'logsAdmin',
        label: 'Administrator logów'
    }, {
        name: 'statsViewer',
        label: 'Dostęp do statystyk'
    },
];


export default function AccessEditModal(props: AccessEditModalProps) {

    const [data, setData] = React.useState<AccessUpdateParams>({});


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        let value: string | boolean;

        switch (event.target.name) {
            case "name":
                value = event.target.value;
                break;
            default:
                value = event.target.checked;
                break;
        }

        setData((old) => ({
            ...old,
            [event.target.name]: value
        }));
    }, []);


    const close = React.useCallback(() => {
        props.onClose();
        setData({});
    }, [props.onClose]);


    const handleSubmit = React.useCallback(async () => {
        if (await props.onSubmit(props.access.id, data)) {
            props.onClose();
            setData({});
        }
    }, [props.onClose, props.onSubmit, props.access.id, data]);


    return (
        <GenericModal
            open={props.open}
            onClose={close}
        >
            <FormGridContainer
                onSubmit={handleSubmit}
                onCancel={close}
                title="Edycja klasy dostępu"
                subtitle="Edycja klasy dostępu. Wprowadzone zmiany w sposób istotny wpływają na zakres funkcji użytkowników."
            >
                <Grid item xs={12}>
                    <TextField
                        required
                        name="name"
                        label="nazwa"
                        id="nazwa"
                        value={data.name ?? props.access.name}
                        onChange={handleChange}
                    />
                </Grid>

                {
                    fields.map((field, index) =>
                        <Grid item xs={12} key={index}>
                            <FormControlLabel
                                labelPlacement="start"
                                control={<Switch
                                    id={`access-${field.name}`}
                                    name={field.name}
                                    inputProps={{ 'aria-label': field.label }}
                                    onChange={handleChange}
                                    checked={(field.name in data) ? data[field.name] : (props.access[field.name])}
                                />}
                                label={field.label}
                            />
                        </Grid>
                    )
                }

            </FormGridContainer>
        </GenericModal>
    )
}