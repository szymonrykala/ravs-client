import React from "react";
import { Card, CardContent, CardHeader, CardMedia, Link } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteModal from "../../components/DeleteModal";
import { useBuilding } from "../BuildingContext";
import { BuildingEditForm } from "../Forms";
import FavouriteButton from "../../components/FavouriteButton";
import { FavType } from "../../../../../models/Metadata";
import MoreVertMenu from "../../components/MoreVertMenu";
import ImageService from "../../../../../services/ImageService";
import { dynamicPaths } from "../../../../../shared/path";
import DatesFooter from "../../components/DatesFooter";
import useResolvedAccess from "../../hooks/useResolvedAccess";




export default function BuildingView() {
    const { premisesAdmin } = useResolvedAccess();
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
            {premisesAdmin &&
                <>
                    <DeleteModal
                        open={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        onSuccess={deleteBuilding}
                    />

                    <BuildingEditForm
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
                    height="350"
                    image={ImageService.getLink(building.image)}
                    alt={building.name}
                />
                <CardContent>
                    <Link href={dynamicPaths.toAddress(building.address.id)}>
                        {building.address.town},&nbsp;{building.address.street}&nbsp;{building.address.number}
                    </Link>
                    <br />
                    <DatesFooter model={building} />
                </CardContent>
            </Card>
        </>
    );
}