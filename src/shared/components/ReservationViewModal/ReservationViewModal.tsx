import Reservation from "../../../models/Reservation";
import GenericModal from "../GenericModal";
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box, ButtonGroup, Grid, Typography } from '@mui/material';
import { displayDate } from '../../utils';
import React from 'react';
import ReservationUserCard from './ReservationUserCard';
import ReservationRoomCard from './ReservationRoomCard';
import DeleteModal from '../DeleteModal';



interface ReservationViewModalProps {
    reservation: Reservation,
    open: boolean,
    onClose: () => void
}

export default function ReservationViewModal(props: ReservationViewModalProps) {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);

    const onDelete = () => {
        setDeleteModalOpen(false);
    }

    return (
        <>
            <DeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                objectName={props.reservation.title}
                onSuccess={onDelete}
            />


            <GenericModal
                open={props.open}
                onClose={props.onClose}
                ariaLabel="Widok Rezerwacji"
                ariaDescription="Okno modalne z kartą widoku rezerwacji"
                sx={{
                    maxWidth: '1000px',
                    width: '95%',
                    minHeight: '80%'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        startIcon={<FullscreenExitIcon fontSize="large" />}
                        onClick={props.onClose}
                        sx={{}}
                    >
                        Zamknij
                    </Button>
                </Box>
                <Stack spacing={4} alignItems='stretch'>
                    <Typography component="h2" variant="h4">
                        {props.reservation.title}
                    </Typography>

                    <ButtonGroup>
                        <Button
                            onClick={() => setDeleteModalOpen(true)}
                            color='error'
                            title="Usuń"
                            aria-label="Usuń"
                        >
                            Usuń
                        </Button>
                        <Button
                            color='warning'
                            title="Unieważnij"
                            aria-label="Unieważnij"
                        >
                            Unieważnij
                        </Button>
                        <Button
                            title="Edytuj"
                            aria-label="Edytuj"
                        >
                            Edytuj
                        </Button>
                        <Button
                            title="Odbij klucz"
                            aria-label="Odbij klucz"
                        >
                            Odbij klucz
                        </Button>
                    </ButtonGroup>
                    {
                        [
                            {
                                title: 'Planowany czas:',
                                text: `${displayDate(props.reservation.plannedStart)} - ${displayDate(props.reservation.plannedEnd)}`
                            }, {
                                title: 'Faktyczny czas:',
                                text: `${props.reservation.actualStart ?
                                    displayDate(props.reservation.actualStart)
                                    : 'jeszcze się nie rozpoczęła'
                                    } - ${props.reservation.actualEnd ?
                                        displayDate(props.reservation.actualEnd)
                                        : ' jeszcze się nie zakończyła'
                                    }`
                            }, {
                                title: 'Opis:',
                                text: props.reservation.description
                            },
                        ].map(({ title, text }) => <span>
                            <Typography component="h3" variant="subtitle1">{title}</Typography>

                            <Typography
                                variant="body1"
                                color='text.secondary'
                                textAlign='justify'
                            >
                                {text}
                            </Typography>
                        </span>
                        )
                    }

                    <Grid container>
                        {
                            [
                                { title: 'Użytkownik:', component: <ReservationUserCard user={props.reservation.user} /> },
                                { title: 'Zarezerwowana sala:', component: <ReservationRoomCard room={props.reservation.room} /> },
                            ].map(({ title, component }) =>
                                <Grid item xs={12} lg={6} pr='10px'>
                                    <Typography sx={{ p: '25px 0px 10px 0px', color: 'text.secondary' }} variant='subtitle2'>{title}</Typography>
                                    {component}
                                </Grid>)
                        }
                    </Grid>

                </Stack>
            </GenericModal>
        </>
    );
}


