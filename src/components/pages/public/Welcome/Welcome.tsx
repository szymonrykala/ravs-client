import { Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, SxProps, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import SecurityIcon from '@mui/icons-material/Security';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CheckIcon from '@mui/icons-material/Check';
import CableIcon from '@mui/icons-material/Cable';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import paths from "../../../../shared/path";




const WhiteWrap = React.memo((props: {
    children: React.ReactNode | React.ReactNode[],
    sx?: SxProps
}) => {
    return (
        <Box component={Paper} elevation={0} sx={{ p: '15px', ...props.sx }}>
            {props.children}
        </Box>
    );
});


const iconsList = [
    { icon: <WidgetsIcon color='primary' />, label: 'Nowoczesny interfejs' },
    { icon: <QueryStatsIcon color='primary' />, label: 'Przydatne statystyki obiektów jak i użytkowników' },
    { icon: <ApartmentIcon color='primary' />, label: 'Realistyczne podejście do rozproszonych podmiotów' },
    { icon: <SupervisorAccountIcon color='primary' />, label: 'Delegowanie zadań administracyjnych' },
    { icon: <SecurityIcon color='primary' />, label: 'Rozbudowana kontrola dostępu' },
    { icon: <CheckIcon color='primary' />, label: 'Wiarygodne informacje' },
    { icon: <CableIcon color='primary' />, label: 'Łatwa integracja z innymi systemami' },
].map(({ icon, label }) => <ListItem key={label}>
    <ListItemIcon>
        {icon}
    </ListItemIcon>
    <ListItemText>{label}</ListItemText>
</ListItem>);


function Welcome() {
    return (
        <Grid spacing={2} container >
            <Grid item xs={12} lg={8}>
                <WhiteWrap
                    sx={{ p: '3vh' }}
                >
                    <Stack spacing={3}>
                        <span>
                            <Typography
                                sx={{
                                    fontFamily: "Dancing Script, cursive",
                                    color: 'primary.dark',
                                }}
                                component='h2'
                                variant='h2'>
                                Rav System!
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: "Dancing Script, cursive",
                                    color: 'primary.main',
                                }}
                                component='p'
                                variant='h4'
                            >
                                -&nbsp;każda chwila pod kontrolą.
                            </Typography>
                        </span>
                        <Divider />
                        <Stack direction='row' flexWrap='wrap' justifyContent='space-between'>
                            <Button
                                startIcon={<ArrowForwardIcon />}
                                href={paths.LOGIN}
                            >
                                Logowanie
                            </Button>
                            <Button
                                startIcon={<ArrowForwardIcon />}
                                href={paths.REGISTER}
                            >
                                Rejestracja
                            </Button>
                            <Button
                                startIcon={<ArrowForwardIcon />}
                                href={paths.ACTIVATE}
                            >
                                Aktywacja konta
                            </Button>
                        </Stack>
                    </Stack>
                </WhiteWrap>
            </Grid>
            <Grid item xs={12} lg={4}>
                <WhiteWrap sx={{ height: '100%' }}>
                    <Stack alignItems='flex-start'>
                        <Button
                            startIcon={<GitHubIcon />}
                        >
                            <a
                                target={'_blank'}
                                href='https://github.com/szymonrykala/ravs-client'
                                rel="noreferrer"
                            >
                                Frontend repo
                            </a>
                        </Button>
                        <Button startIcon={<GitHubIcon />}>
                            <a
                                href='https://github.com/szymonrykala/ravsAPI'
                                target='_blank'
                                rel="noreferrer"
                            >
                                Backend repo
                            </a>
                        </Button>
                        <Button startIcon={<LinkedInIcon />}>
                            <a
                                href='https://www.linkedin.com/in/szymon-ryka%C5%82a/'
                                target='_blank'
                                rel="noreferrer"
                            >
                                Autor
                            </a>
                        </Button>
                        <br />
                        <Typography component='p' variant='body2'>
                            System ten jest pracą inżynierską na uczelni&nbsp;
                            <a
                                rel="noreferrer"
                                target='_blank'
                                href='https://pbs.edu.pl/pl/'
                            >
                                Politechnika Bydgoska
                            </a>&nbsp;
                            (dawniej Uniwersytet Technologiczno-Przyrodniczy)
                        </Typography>
                    </Stack>
                </WhiteWrap>
            </Grid>
            <Grid item xs={12}>
                <WhiteWrap>
                    <Typography variant="subtitle1" component='h3'>
                        Dlaczego wybrać akurat nas?
                    </Typography>
                    <List>
                        {iconsList}
                    </List>
                </WhiteWrap>
            </Grid>
        </Grid>
    );
}

export default React.memo(Welcome);