import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import React from "react";
import DeleteModal from "../../components/DeleteModal";
import Map from "./Map";
import { useAddress } from "../AddressContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AddressEditForm } from "../Forms";
import MoreVertMenu from "../../components/MoreVertMenu";
import DatesFooter from "../../components/DatesFooter";
import useResolvedAccess from "../../hooks/useResolvedAccess";




export default function AddressCard() {
    const { premisesAdmin } = useResolvedAccess();
    const { address, deleteAddress } = useAddress();

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);

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

    return (
        <>
            {premisesAdmin &&
                <>
                    <DeleteModal
                        objectName={`${address.street} ${address.number}`}
                        open={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        onSuccess={deleteAddress}
                    />

                    <AddressEditForm
                        open={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                    />
                </>
            }
            <Card elevation={0}>
                <CardHeader
                    action={premisesAdmin && <MoreVertMenu options={options} />}
                    title={<>{address.country}, {address.town}</>}
                    subheader={<>{address.street} {address.number}</>}
                />
                <CardMedia component="div">
                    <Map address={address} />
                </CardMedia>
                <CardContent>
                    <Typography component='p'>
                        ul. {address.street} {address.number}<br />
                        {address.postalCode} {address.town}, <br />
                        {address.country}
                    </Typography>
                    <br />
                    <DatesFooter model={address} />
                </CardContent>
            </Card>
        </>
    )
}