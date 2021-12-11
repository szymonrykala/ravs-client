import React from "react";
import MoreVertMenu from "../../components/MoreVertMenu";
import { useUser } from "../UserContext";
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import EditIcon from '@mui/icons-material/Edit';
import { ChangePasswordForm, UserEditForm } from "../Forms";
import DeleteModal from "../../components/DeleteModal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import ImageService from "../../../../../services/ImageService";
import CardContent from "@mui/material/CardContent";
import { displayDate } from "../../../../../shared/utils";
import { Link, Typography } from "@mui/material";
import paths from "../../../../../shared/path";
import AppLink from "../../../../../shared/components/AppLink";
import DatesFooter from "../../components/DatesFooter";



export default function UserCard() {
    const { user, deleteUser } = useUser();

    const [editModal, setEditModal] = React.useState(false);
    const [passModal, setPassModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);


    const options = React.useMemo(() => [
        {
            label: 'Edytuj',
            action: () => setEditModal(true),
            icon: <EditIcon color='success' />
        }, {
            label: 'Zmień hasło',
            action: () => setPassModal(true),
            icon: <PasswordIcon color='warning' />
        }, {
            label: 'Usuń konto',
            action: () => setDeleteModal(true),
            icon: <DeleteIcon color='error' />
        }
    ], []);


    return (
        <>

            <DeleteModal
                objectName={`${user.email}`}
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                onSuccess={deleteUser}
            />

            <UserEditForm
                user={user}
                open={editModal}
                onClose={() => setEditModal(false)}
            />

            <ChangePasswordForm
                open={passModal}
                onClose={() => setPassModal(false)}
            />


            <Card elevation={0}>
                <CardHeader
                    action={<MoreVertMenu options={options} />}
                    title={<>{user.name} {user.surname}</>}
                    subheader={<Link href={`mailto:${user.email}`}>
                        {user.email}
                    </Link>}
                />
                <CardMedia
                    component="img"
                    height="350"
                    image={ImageService.getLink(user.image)}
                    alt={user.email}
                />
                <CardContent>
                    <Typography color='text.secondary' variant="subtitle1">
                        Ostatnio aktywny: {displayDate(user.lastActivity)}<br />
                        Klasa dostępu: {<AppLink to={paths.ACCESS}>{user.access.name}</AppLink>}
                    </Typography>
                    <br />
                    <DatesFooter model={user} />
                </CardContent>
            </Card>
        </>
    );
}