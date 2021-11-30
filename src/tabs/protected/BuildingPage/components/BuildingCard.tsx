import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import DeleteModal from "../../../../shared/components/DeleteModal";
import { useBuilding } from "../BuildingContext";
import { BuildingEditForm } from "../Forms";
import FavouriteButton from "../../../../shared/components/FavouriteButton";
import { FavType } from "../../../../models/Metadata";
import MoreVertMenu from "../../../../shared/components/MoreVertMenu";
import DatesFooter from "../../../../shared/components/DatesFooter";
import ImageService from "../../../../services/ImageService";
import AppLink from "../../../../shared/components/AppLink";
import { dynamicPaths } from "../../../../shared/path";




export default function BuildingView() {
    const { building, deleteBuilding } = useBuilding();

    const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false);


    const options = React.useMemo(() => [
        {
            label: 'Edytuj',
            action: () => setEditModalOpen(true),
            icon: <EditIcon color='success' />
        }, {
            label: 'Usuń',
            action: () => setDeleteModalOpen(true),
            icon: <DeleteIcon color='error' />
        }
    ], []);


    if (!Boolean(building)) return null;

    return (
        <>
            <DeleteModal
                objectName={building.name}
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onSuccess={deleteBuilding}
            />

            <BuildingEditForm
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
            />

            <Card elevation={0}>
                <CardHeader
                    action={<MoreVertMenu options={options} />}
                    title={
                        <>
                            Budynek {building.name}
                            <FavouriteButton data={{
                                id: building.id,
                                name: building.name,
                                type: FavType.Building,
                                addressId: building.address.id,
                            }} />
                        </>
                    }
                    subheader={<>{building.openTime} - {building.closeTime}</>}
                />
                <CardMedia
                    component="img"
                    height="300"
                    image={ImageService.getLink(building.image)}
                    alt={building.name}
                />
                <CardContent>
                    <AppLink withIcon to={dynamicPaths.toAddress(building.address.id)}>
                        {building.address.town},&nbsp;{building.address.street}&nbsp;{building.address.number}
                    </AppLink>
                    <br />
                    <DatesFooter model={building} />
                </CardContent>
            </Card>
        </>
    );
}