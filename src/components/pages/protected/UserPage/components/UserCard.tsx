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
import DatesFooter from "../../components/DatesFooter";
import useResolvedAccess from "../../hooks/useResolvedAccess";
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";
import paths from "../../../../../shared/path";



export default function UserCard() {
    const { myId, owner, logsAdmin } = useResolvedAccess();
    const { user, deleteUser } = useUser();
    const history = useHistory();

    const [editModal, setEditModal] = React.useState(false);
    const [passModal, setPassModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);


    const options = React.useMemo(() => {
        const opt = [
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
        ];
        logsAdmin && opt.push({
            icon: <SearchIcon color='primary' />,
            label: 'Logs Explorer',
            action: () => history.push(`${paths.LOGS}?endpoint=%/users/${user.id}`)
        });
        
        return opt;
    }, [
        history,
        logsAdmin,
        user.id
    ]);


    return (
        <>

            {(myId(user.id) || owner) && <>
                <DeleteModal
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
            </>
            }

            <Card elevation={0}>
                <CardHeader
                    action={(myId(user.id) || owner) && <MoreVertMenu options={options} />}
                    title={<>{user.name} {user.surname}</>}
                    subheader={<a href={`mailto:${user.email}`}>
                        {user.email}
                    </a>}
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
                        Klasa dostępu: {<Link href={paths.ACCESS}>{user.access.name}</Link>}
                    </Typography>
                    <br />
                    <DatesFooter model={user} />
                </CardContent>
            </Card>
        </>
    );
}