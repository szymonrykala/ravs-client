import React from "react";
import useSession from "../../../../auth/useSession";
import GenericModal from "../../../../shared/components/GenericModal";
import PasswordChangeForm from '../../../public/ChangePassword/Form';

interface EditUserFormProps {
    open: boolean,
    onClose: () => void
}

export default function PasswordChangeModal({
    open,
    onClose
}: EditUserFormProps) {
    const { logout } = useSession();

    const close = React.useCallback(() => {
        onClose();

    }, [onClose]);

    const onSuccess = React.useCallback(() => {
        logout();
    }, [logout]);

    return (
        <GenericModal
            open={open}
            onClose={close}
            sx={{
                maxWidth: '450px'
            }}
        >
            <PasswordChangeForm onSuccess={onSuccess} />
        </GenericModal>
    )
}