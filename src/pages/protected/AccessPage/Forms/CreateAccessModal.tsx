import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { AccessCreateParams } from "../../../../services/AccessService";
import FormGridContainer from "../../../../shared/components/FormGridContainer";
import GenericModal from "../../../../shared/components/GenericModal";



interface CreateAccessModalProps {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: AccessCreateParams) => Promise<boolean>
}


export default function CreateAccessModal(props: CreateAccessModalProps) {

    const [name, setName] = React.useState<string>('');


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    }, []);


    const close = React.useCallback(() => {
        props.onClose();
        setName('');
    }, [props.onClose]);


    const handleSubmit = React.useCallback(async () => {
        if (await props.onSubmit({
            name: name
        })) {
            props.onClose();
            setName('');
        }
    }, [props.onClose, props.onSubmit, name]);


    return (
        <GenericModal
            open={props.open}
            onClose={close}
        >
            <FormGridContainer
                onSubmit={handleSubmit}
                onCancel={close}
                title="Tworzenie klasy dostępu"
                subtitle="Podaj nazwę dla nowej klasy dostępu. Stworzona zostanie klasa bez żadnych uprawnień - pamiętaj aby dostosować ja do swoich potrzeb."
            >
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        required
                        name="name"
                        label="nazwa"
                        id="nazwa"
                        value={name}
                        onChange={handleChange}
                    />
                </Grid>

            </FormGridContainer>
        </GenericModal>
    )
}