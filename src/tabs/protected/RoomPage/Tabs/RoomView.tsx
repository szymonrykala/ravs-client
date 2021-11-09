import { Button, ButtonGroup, Container, Grid, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ImageView from "../../../../shared/components/ImageView";

import { displayDate } from "../../../../shared/utils";
import RoomTableInfo from "./RoomTableInfo";
import React from "react";
import DeleteModal from "../../../../shared/components/DeleteModal";
import RoomEditModal from "../RoomEditModal";
import { useRoomContext } from "../RoomContext";
import Loading from "../../../../shared/components/Loading";
import NfcIcon from '@mui/icons-material/Nfc';
import RfidModalRorm from "../RfidModalForm";
import CreateReservationModal from "../../../../shared/components/CreateReservationModal/CreateReservationModal";



interface RoomViewProps {
    // room: DetailedRoom
}


export default function RoomView({

}: RoomViewProps) {
    const { room, deleteRoom, deleteRFIDTag } = useRoomContext();
    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);
    const [rfidTagModalOpen, setRfidTagModalOpen] = React.useState<boolean>(false);
    const [createReservationModalOpen, setCreateReservationModalOpen] = React.useState<boolean>(false);


    return (
        !Boolean(room) ? <Loading /> :
            <Container >
                <DeleteModal
                    objectName={room.name}
                    open={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onSuccess={deleteRoom}
                />

                <RoomEditModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                />

                <RfidModalRorm
                    open={rfidTagModalOpen}
                    onClose={() => setRfidTagModalOpen(false)}
                />

                <CreateReservationModal
                    roomId={room && room.id}
                    open={createReservationModalOpen}
                    onClose={() => setCreateReservationModalOpen(false)}
                />

                <Stack spacing={3}>
                    <Grid container spacing={3} paddingTop="20px" >
                        <Grid item xs={12} md={6}>
                            <ImageView
                                image={room.image}
                                title="zdjęcie sali"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" color="primary.main">
                                <small>Sala</small> {room.name}
                            </Typography>
                            <RoomTableInfo room={room} deleteTag={deleteRFIDTag} />
                        </Grid>
                    </Grid>

                    <ButtonGroup>
                        <Button
                            onClick={() => setDeleteModalOpen(true)}
                            startIcon={<DeleteIcon />}
                            color='error'
                        >
                            Usuń
                        </Button>
                        <Button
                            onClick={() => setRfidTagModalOpen(true)}
                            startIcon={<NfcIcon />}
                        >
                            Tag RFID
                        </Button>
                        <Button
                            onClick={() => setEditModalOpen(true)}
                            startIcon={<EditIcon />}
                        >
                            Edycja
                        </Button>
                        <Button
                        startIcon={<AddIcon/>}
                            onClick={() => setCreateReservationModalOpen(true)}
                            color='success'
                        >
                            Zarezerwuj
                        </Button>
                    </ButtonGroup>



                    <Typography sx={{ color: "gray", fontSize: "smaller" }}>
                        Utworzono: {displayDate(room._created)}<br />
                        Ostatnia aktualizacja: {displayDate(room._updated)}
                    </Typography>
                </Stack>
            </Container>
    );
}
