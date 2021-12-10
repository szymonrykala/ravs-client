import { Stack, Typography } from "@mui/material";
import SettingsForm from "./SettingsForm";



export default function SettingsMain() {
    return (
        <Stack spacing={3}>
            <span>
                <Typography component='h1' variant='h3' color='primary.dark'>
                    Ustawienia platformy
                </Typography>
                <Typography variant='body1' color="text.secondary" mt="5px">
                    Dostępne tutaj opcje wpływają znacząco na funkcjonowanie całej platformy. <br />
                    Postępuj racjonalnie podczas modyfikacji znajdujących się tutaj parametrów.
                </Typography>
            </span>

            <SettingsForm />

        </Stack>
    );
}