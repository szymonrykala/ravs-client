import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";



interface FormGridContainerProps {
    title: string,
    subtitle?: string,
    onSubmit: () => void,
    onCancel: () => void,
    children: React.ReactNode | React.ReactNode[]
}


export default function FormGridContainer({
    title,
    subtitle,
    onSubmit,
    onCancel,
    children,
}: FormGridContainerProps) {


    const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    }, [
        onSubmit
    ]);


    return (
        <Stack rowGap={3}>
            <span>
                <Typography variant="h5" color='primary.dark'>
                    {title}
                </Typography>

                {subtitle && <Typography variant="body2" color='text.secondary' mt='5px'>
                    {subtitle}
                </Typography>}
            </span>

            <Grid container spacing={2} component="form" onSubmit={handleSubmit} >
                {children}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-around" mt={1.5}>
                        <Button
                            aria-label="Zamknij"
                            title='Zamknij'
                            startIcon={<CancelIcon />}
                            onClick={onCancel}
                        >
                            Zamknij
                        </Button>
                        <Button
                            aria-label="Zatwierdź"
                            title='Zatwierdź'
                            startIcon={<SaveIcon color='inherit' />}
                            type="submit"
                            color="success"
                        >
                            Zatwierdź
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}