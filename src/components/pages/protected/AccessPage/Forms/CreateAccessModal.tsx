import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AccessCreateParams } from "../../../../../services/AccessService";
import FormGridContainer from "../../../../../shared/components/FormGridContainer";
import GenericModal from "../../components/GenericModal";



interface CreateAccessModalProps {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: AccessCreateParams) => Promise<boolean>
}


export default function CreateAccessModal({
    open,
    onClose,
    onSubmit,
}: CreateAccessModalProps) {

    const [name, setName] = React.useState<string>('');


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    }, []);


    const close = React.useCallback(() => {
        onClose();
        setName('');
    }, [
        onClose
    ]);


    const handleSubmit = React.useCallback(async () => {
        if (await onSubmit({
            name: name
        })) {
            onClose();
            setName('');
        }
    }, [
        onClose,
        onSubmit,
        name
    ]);


    return (
        <GenericModal
            open={open}
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