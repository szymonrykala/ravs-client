import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import DeleteModal from "../../../../../shared/components/DeleteModal";
import { useUser } from "../../UserContext";
import { ChangePasswordForm, UserEditForm } from "../../Forms";


export default function OptionButtons() {
    const { user, deleteUser } = useUser();

    const [editModal, setEditModal] = React.useState(false);
    const [passModal, setPassModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);


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

            <Box>
                <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteModal(true)}

                >
                    Usuń konto
                </Button>
                <Button
                    startIcon={<PasswordIcon />}
                    onClick={() => setPassModal(true)}
                >
                    zmień hasło
                </Button>

                <Button
                    startIcon={<EditIcon />}
                    onClick={() => setEditModal(true)}
                >
                    Edytuj
                </Button>
            </Box>
        </>
    );
}