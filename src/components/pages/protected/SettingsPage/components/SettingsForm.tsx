import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { SettingsUpdateParams } from "../../../../../services/SettingsService";
import paths from "../../../../../shared/path";
import { useSettings } from "../SettingsContext";


interface FormFieldProps {
    text: string | React.ReactNode,
    name: string,
    label: string,
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
    value: string | number | boolean
}


function FormField(props: FormFieldProps) {
    return (
        <Box mr={1}>
            <Typography variant='body2' >
                {props.text}
            </Typography>
            <TextField
                required
                type='number'
                margin='dense'
                name={props.name}
                id={`${props.label}-name`}
                label={props.label}
                value={props.value}
                onChange={props.onChange}
            />
        </Box>
    );
}



export default function SettingsForm() {
    const { settings, updateSettings } = useSettings();

    const [data, setData] = React.useState<SettingsUpdateParams>({});

    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateSettings(data);
        setData({});
    }, [
        data,
        updateSettings,
    ]);


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setData((old) => ({
            ...old,
            [event.target.name]: Number(event.target.value)
        }));
    }, []);


    return (
        <span>
            <Stack spacing={3} component='form' onSubmit={handleSubmit}>
                <Typography component='h2' variant='h5'>
                    Formularz:
                </Typography>

                <span>
                    <Typography component='h3' variant='h6' mb={1}>
                        Ustawienia zdj????
                    </Typography>
                    <FormField
                        text={<>Maksymalny rozmiar zdjecia (podawany <b>w bajtach</b>) ??adowanego przez u??ytkownika do aplikacji.</>}
                        name='maxImageSize'
                        label='max. rozmiar'
                        value={data.maxImageSize ?? settings.maxImageSize}
                        onChange={handleChange}
                    />
                </span>

                <span>
                    <Typography component='h3' variant='h6' mb={1}>
                        U??ytkownicy
                    </Typography>
                    <FormField
                        text={<>Domy??lny numer identyfikacyjny klasy deost??powej przypisywany dla ka??dego nowego u??ytkownika.
                            <Link href={paths.ACCESS}>klasy dost??pu</Link></>}
                        name='defaultUserAccess'
                        label='numer ID'
                        value={data.defaultUserAccess ?? settings.defaultUserAccess}
                        onChange={handleChange}
                    />
                </span>

                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Typography component='h3' variant='h6'>
                            Czas trwania rezerwacji:
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField
                            text={<>Maksymalny czas trwania rezerwacji <b>w minutach</b>.
                                Stworzone wcze??niej rezerwacje pozostan?? niezmienione.</>}
                            name='maxReservationTime'
                            label='max. czas'
                            value={data.maxReservationTime ?? settings.maxReservationTime}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField
                            text={<>Minimalny czas trwania rezerwacji <b>w minutach</b>.
                                Stworzone wcze??niej rezerwacje pozostan?? niezmienione.</>}
                            name='minReservationTime'
                            label='min. czas'
                            value={data.minReservationTime ?? settings.minReservationTime}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Typography component='h3' variant='h6'>
                            Czas przechowywania danych:
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField
                            text={<>Ilo???? czasu <b>w dniach</b> po kt??rym historia rezerwacji ma zosta?? usuni??ta.
                                Zmiana tego parametru wp??ywa bezpo??rednio na statystyki.</>}
                            name='reservationHistory'
                            label='Ilo???? dni'
                            value={data.reservationHistory ?? settings.reservationHistory}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField
                            text={<>Ilo???? czasu <b>w dniach</b> po kt??rym logi zostan?? usuni??te.</>}
                            name='requestHistory'
                            label='Ilo???? dni'
                            value={data.requestHistory ?? settings.requestHistory}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Stack direction='row' justifyContent="space-around" mt={1.5}>
                    <Button
                        color='error'
                    >
                        Przywr????
                    </Button>
                    <Button
                        color='success'
                        type='submit'
                    >
                        Zatwierd??
                    </Button>
                </Stack>
            </Stack>
        </span>
    );
}