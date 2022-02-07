import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RoomTableInfo from "./RoomTableInfo";
import React from "react";
import DeleteModal from "../../components/DeleteModal";
import { useRoomContext } from "../RoomContext";
import Loading from "../../../../../shared/components/Loading";
import { RoomEditForm } from "../Forms";
import FavouriteButton from "../../components/FavouriteButton";
import { FavType } from "../../../../../models/Metadata";
import ImageService from "../../../../../services/ImageService";
import MoreVertMenu from "../../components/MoreVertMenu";
import DatesFooter from "../../components/DatesFooter";
import useResolvedAccess from "../../hooks/useResolvedAccess";
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";
import paths from "../../../../../shared/path";
import { Tip } from "../../components/Tutorial";



export default function RoomCard() {
    const { premisesAdmin, logsAdmin } = useResolvedAccess();
    const { room, deleteRoom, deleteRFIDTag } = useRoomContext();
    const history = useHistory();

    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);


    const options = React.useMemo(() => {
        const opt = [
            {
                label: 'Edytuj',
                action: () => setEditModalOpen(true),
                icon: <EditIcon color='success' />
            }, {
                label: 'Usuń',
                action: () => setDeleteModalOpen(true),
                icon: <DeleteIcon color='error' />
            }
        ];
        logsAdmin && opt.push({
            icon: <SearchIcon color='primary' />,
            label: 'Logs Explorer',
            action: () => history.push(`${paths.LOGS}?endpoint=%/rooms/${room.id}`)
        });
        return opt;
    }, [
        history,
        logsAdmin,
        room.id
    ]);


    return (
        !Boolean(room) ? <Loading /> :
            <>
                {premisesAdmin &&
                    <>
                        <DeleteModal
                            open={deleteModalOpen}
                            onClose={() => setDeleteModalOpen(false)}
                            onSuccess={deleteRoom}
                        />

                        <RoomEditForm
                            open={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                        />
                    </>
                }

                <Card elevation={0}>
                    <CardHeader
                        action={
                            premisesAdmin &&
                            <MoreVertMenu options={options} />
                        }
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
                        <Tip text='Tutaj znajdują się informacje na temat Sali' priority={20}>
                            <RoomTableInfo room={room} deleteTag={deleteRFIDTag} />
                        </Tip>
                        <br />
                        <DatesFooter model={room} />
                    </CardContent>
                </Card>
            </>
    );
}
