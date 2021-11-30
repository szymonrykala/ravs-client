import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RoomTableInfo from "./RoomTableInfo";
import React from "react";
import DeleteModal from "../../../../shared/components/DeleteModal";
import { useRoomContext } from "../RoomContext";
import Loading from "../../../../shared/components/Loading";
import NfcIcon from '@mui/icons-material/Nfc';
import CreateReservationModal from "../../../../shared/components/CreateReservationModal/CreateReservationModal";
import { RfidForm, RoomEditForm } from "../Forms";
import DatesFooter from "../../../../shared/components/DatesFooter";
import FavouriteButton from "../../../../shared/components/FavouriteButton";
import { FavType } from "../../../../models/Metadata";
import ImageService from "../../../../services/ImageService";
import MoreVertMenu from "../../../../shared/components/MoreVertMenu";



export default function RoomCard() {
    const { room, deleteRoom, deleteRFIDTag } = useRoomContext();

    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);
    const [rfidTagModalOpen, setRfidTagModalOpen] = React.useState<boolean>(false);
    const [createReservationModalOpen, setCreateReservationModalOpen] = React.useState<boolean>(false);


    const options = React.useMemo(() => [
        {
            label: 'Zarezerwuj',
            icon: <AddCircleIcon color='primary' />,
            action: () => setCreateReservationModalOpen(true)
        }, {
            label: 'Edytuj',
            action: () => setEditModalOpen(true),
            icon: <EditIcon color='success' />
        }, {
            label: 'Dodaj tag RFID',
            action: () => setDeleteModalOpen(true),
            icon: <NfcIcon color='warning' />
        }, {
            label: 'Usuń',
            action: () => setDeleteModalOpen(true),
            icon: <DeleteIcon color='error' />
        }
    ], []);


    return (
        !Boolean(room) ? <Loading /> :
            <>
                <DeleteModal
                    objectName={room.name}
                    open={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onSuccess={deleteRoom}
                />

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
                />

                <Card elevation={0}>
                    <CardHeader
                        action={<MoreVertMenu options={options} />}
                        title={
                            <>
                                {room.name}
                                <FavouriteButton data={{
                                    id: room.id,
                                    name: room.name,
                                    type: FavType.Room,
                                    addressId: room.building.address,
                                    buildingId: room.building.id
                                }} />
                            </>
                        }
                        subheader={<>
                            {room.roomType}
                        </>}
                    />
                    <CardMedia
                        component="img"
                        height="300"
                        image={ImageService.getLink(room.image)}
                        alt={room.name}
                    />
                    <CardContent>
                        <RoomTableInfo room={room} deleteTag={deleteRFIDTag} />
                        <br />
                        <DatesFooter model={room} />
                    </CardContent>
                </Card>
            </>
    );
}
