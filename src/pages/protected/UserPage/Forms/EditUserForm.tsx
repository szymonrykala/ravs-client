import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { DetailedUser } from "../../../../models/User";
import { UpdateUserParams } from "../../../../services/UserService";
import FormGridContainer from "../../../../shared/components/FormGridContainer";
import GenericModal from "../../../../shared/components/GenericModal";
import ImageUploadField from "../../../../shared/components/ImageUploadField";
import { useUser } from "../UserContext";



interface EditUserFormProps {
    open: boolean,
    onClose: () => void,
    user: DetailedUser,
}


export default function EditUserForm(props: EditUserFormProps) {
    const { updateUser} = useUser();

    const [data, setData] = React.useState<UpdateUserParams>({});


    const close = React.useCallback(() => {
        props.onClose();
        setData({});
    }, [props.onClose]);


    const onSubmit = React.useCallback(async () => {
        if (await updateUser(data)) {
            close();
        }
    }, [data, close]);


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((old) => ({
            ...old,
            [event.target.name]: event.target.value
        }));
    }, []);


    return (
        <GenericModal
            open={props.open}
            onClose={close}
            sx={{
                maxWidth: '450px'
            }}
        >
            <Stack spacing={3}>

                <ImageUploadField image={props.user.image}/>

                <Divider />

                <FormGridContainer
                    title="Edycja użytkownika"
                    subtitle="Zmień dane użytkownika. Zmiany w całej aplikacji będą widoczne po ponownym przeładowaniu aplikacji."
                    onSubmit={onSubmit}
                    onCancel={close}
                >
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Imię"
                            name="name"
                            autoFocus
                            value={data.name ?? props.user.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="surname"
                            label="Nazwisko"
                            name="surname"
                            value={data.surname ?? props.user.surname}
                            onChange={handleChange}
                        />
                    </Grid>

                </FormGridContainer>
            </Stack>
        </GenericModal>
    )
}