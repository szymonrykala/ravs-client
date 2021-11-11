import { Button, ButtonGroup, Grid, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ImageView from "../../../../shared/components/ImageView";

import { displayDate } from "../../../../shared/utils";
// import RoomTableInfo from "./RoomTableInfo";
import React from "react";
import DeleteModal from "../../../../shared/components/DeleteModal";

import CreateReservationModal from "../../../../shared/components/CreateReservationModal/CreateReservationModal";
import { useBuilding } from "../BuildingContext";
import BuildingViewTable from "./BuildingViewTable";




export default function BuildingView() {
    const { building, deleteBuilding } = useBuilding();

    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);
    const [createRoomModalOpen, setCreateRoomModalOpen] = React.useState<boolean>(false);


    if (!Boolean(building)) return null;

    return (
        <>
            <DeleteModal
                objectName={building.name}
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onSuccess={deleteBuilding}
            />

            {/* 
                <RoomEditForm
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                />

                <RfidForm
                    open={rfidTagModalOpen}
                    onClose={() => setRfidTagModalOpen(false)}
                />

                <CreateReservationModal
                    roomId={room && room.id}
                    open={createReservationModalOpen}
                    onClose={() => setCreateReservationModalOpen(false)}
                /> */}

            <Stack spacing={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="primary.main">
                            Budynek {building.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ImageView
                            image={building.image}
                            title="zdjęcie sali"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <BuildingViewTable building={building} />
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
                        // onClick={() => setEditModalOpen(true)}
                        startIcon={<EditIcon />}
                    >
                        Edycja
                    </Button>
                    <Button
                        startIcon={<AddIcon />}
                        // onClick={() => setCreateReservationModalOpen(true)}
                        color='success'
                    >
                        Stwórz salę
                    </Button>
                </ButtonGroup>

                <Typography sx={{ color: "text.secondary", fontSize: "smaller" }}>
                    Utworzono: {displayDate(building._created)}<br />
                    Ostatnia aktualizacja: {displayDate(building._updated)}
                </Typography>
            </Stack>
        </>
    );
}