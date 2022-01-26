import Reservation from '../../../../../models/Reservation';
import GenericModal from '../../components/GenericModal';
import Stack from '@mui/material/Stack';
import { Grid, IconButton, List, Typography } from '@mui/material';
import { displayDate } from '../../../../../shared/utils';
import React from 'react';
import DeleteModal from '../DeleteModal';
import { CopyForm, EditForm, PingNFCForm } from './ModalForms';
import { useReservations } from '../GenericReservationsTab/ReservationsContext';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyIcon from '@mui/icons-material/CopyAll';
import NFCIcon from '@mui/icons-material/Nfc';
import { Edit } from '@mui/icons-material';
import MoreVertMenu from '../../components/MoreVertMenu';
import UserItem from './UserItem';
import RoomItem from './RoomItem';
import useResolvedAccess from '../../hooks/useResolvedAccess';
import DatesView from './DatesView';



interface ReservationViewModalProps {
    reservation: Reservation,
    open: boolean,
    onClose: () => void
}


function TextSection(props: {
    title: string, children: React.ReactNode | React.ReactNode[]
}) {
    return (
        <span>
            <Typography component="h3" variant="subtitle1">
                {props.title}
            </Typography>
            <Typography
                variant="body1"
                color='text.secondary'
                textAlign='justify'
                component='p'
            >
                {props.children}
            </Typography>
        </span>
    );
}





export default function ReservationViewModal(props: ReservationViewModalProps) {
    const { reservationsAdmin, keysAdmin, myId } = useResolvedAccess();
    const { deleteReservation } = useReservations();

    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);
    const [nfcModalOpen, setNFCModalOpen] = React.useState<boolean>(false);
    const [copyModalOpen, setCopyModalOpen] = React.useState<boolean>(false);


    const onDelete = React.useCallback(async () => {
        if (await deleteReservation(props.reservation.id)) {
            setDeleteModalOpen(false);
        }
    }, [
        props.reservation.id,
        deleteReservation,
    ]);


    const menuOptions = React.useMemo(() => {
        const opt = [
            {
                icon: <CopyIcon color='primary' />,
                label: 'Kopiuj',
                action: () => setCopyModalOpen(true)
            },
        ];
        keysAdmin && opt.unshift({
            icon: <NFCIcon color='primary' />,
            label: 'Odbij klucz',
            action: () => setNFCModalOpen(true)
        });

        if (myId(props.reservation.user.id) || reservationsAdmin)
            opt.push({
                icon: <Edit color='primary' />,
                label: 'Edytuj',
                action: () => setEditModalOpen(true)
            }, {
                icon: <DeleteIcon color='error' />,
                label: 'Usuń',
                action: () => setDeleteModalOpen(true)
            });

        return opt;
    }, [
        myId,
        keysAdmin,
        props.reservation.user.id,
        reservationsAdmin
    ]);


    return (
        <>
            {(myId(props.reservation.user.id) || reservationsAdmin) &&
                <>
                    <DeleteModal
                        open={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        onSuccess={onDelete}
                    />

                    <EditForm
                        open={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        reservation={props.reservation}
                    />
                </>
            }
            <CopyForm
                open={copyModalOpen}
                onClose={() => setCopyModalOpen(false)}
                reservation={props.reservation}
            />

            {keysAdmin &&
                <PingNFCForm
                    open={nfcModalOpen}
                    onClose={() => setNFCModalOpen(false)}
                    reservationId={props.reservation.id}
                />
            }

            <GenericModal
                open={props.open}
                onClose={props.onClose}
                aria-label="Widok Rezerwacji"
                sx={{
                    maxWidth: '800px',
                    mt: '4vw'
                }}
            >
                <Grid container spacing='15px'>

                    <Grid item xs={10} sm={11}>
                        <Stack spacing={4} alignItems='stretch'>
                            <Typography component="h2" variant="h4">
                                {props.reservation.title}
                            </Typography>

                            <DatesView title='Planowany czas:'>
                                {[
                                    {
                                        label: 'Od',
                                        value: displayDate(props.reservation.plannedStart)
                                    }, {
                                        label: 'do',
                                        value: displayDate(props.reservation.plannedEnd)
                                    },
                                ]}
                            </DatesView>
                        </Stack>
                    </Grid>

                    <Grid item xs={2} sm={1}>
                        <Stack
                            alignItems='flex-end'
                            direction='column'
                            spacing={3}
                        >
                            <IconButton onClick={props.onClose}>
                                <CloseIcon />
                            </IconButton>

                            <MoreVertMenu options={menuOptions} sx={{ justifySelf: "right" }} />

                            {keysAdmin &&
                                <IconButton
                                    onClick={() => setNFCModalOpen(true)}
                                    title="Odbij klucz"
                                    aria-label="Odbij klucz"
                                    color='success'
                                >
                                    <NFCIcon />
                                </IconButton>
                            }
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={4} alignItems='stretch'>
                            <DatesView title='Faktyczny czas rezerwacji:'>
                                {[
                                    {
                                        label: 'Początek',
                                        value: props.reservation.actualStart ?
                                            displayDate(props.reservation.actualStart)
                                            : 'Brak'
                                    }, {
                                        label: 'Koniec',
                                        value: props.reservation.actualEnd ?
                                            displayDate(props.reservation.actualEnd)
                                            : 'Brak'
                                    },
                                ]}
                            </DatesView>

                            <TextSection title='Opis:'>
                                {props.reservation.description}
                            </TextSection>

                            <List component='div'>
                                <UserItem user={props.reservation.user} />
                                <RoomItem room={props.reservation.room} />
                            </List>

                        </Stack>
                    </Grid>

                </Grid>
            </GenericModal>
        </>
    );
}


