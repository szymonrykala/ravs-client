import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Access from "../../../../../models/Access";
import { AccessUpdateParams } from "../../../../../services/AccessService";
import FormGridContainer from "../../../../../shared/components/FormGridContainer";
import GenericModal from "../../components/GenericModal";
import DatesFooter from "../../components/DatesFooter";



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


export default function AccessEditModal({
    access,
    open,
    onClose,
    onSubmit,
}: AccessEditModalProps) {

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


    // close form handler
    const close = React.useCallback(() => {
        onClose();
        setData({}); // flush data
    }, [
        onClose
    ]);


    const handleSubmit = React.useCallback(async () => {
        if (await onSubmit(access.id, data)) {
            onClose();
            setData({});
        }
    }, [
        onClose,
        onSubmit,
        access.id,
        data
    ]);


    return (
        <GenericModal
            open={open}
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
                        value={data.name ?? access.name}
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
                                    checked={(field.name in data) ? data[field.name] : (access[field.name])}
                                />}
                                label={field.label}
                            />
                        </Grid>
                    )
                }
                <Grid item xs={12} ml={2}>
                    <DatesFooter model={access} />
                </Grid>
            </FormGridContainer>
        </GenericModal>
    )
}