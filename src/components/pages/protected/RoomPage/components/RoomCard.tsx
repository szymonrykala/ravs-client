import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RoomTableInfo from "./RoomTableInfo";
import React from "react";
import DeleteModal from "../../components/DeleteModal";
import { useRoomContext } from "../RoomContext";
import Loading from "../../../../../shared/components/Loading";
import CreateReservationModal from "../../components/CreateReservationModal/CreateReservationModal";
import { RoomEditForm } from "../Forms";
import DatesFooter from "../../../../../shared/components/DatesFooter";
import FavouriteButton from "../../../../../shared/components/FavouriteButton";
import { FavType } from "../../../../../models/Metadata";
import ImageService from "../../../../../services/ImageService";
import MoreVertMenu from "../../../../../shared/components/MoreVertMenu";



export default function RoomCard() {
    const { room, deleteRoom, deleteRFIDTag } = useRoomContext();

    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);
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
                        height="350"
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
