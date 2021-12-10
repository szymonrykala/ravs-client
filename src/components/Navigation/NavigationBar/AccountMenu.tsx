import { Menu, MenuItem } from "@mui/material";
import React from "react";
import useSession from "../../../auth/useSession";
import paths from "../../../shared/path";
import AppLink from "../../../shared/components/AppLink";



interface AccountMenuProps {
    trigger: null | HTMLElement,
    handleClose: () => void
}

const links = [
    { name: "Mój Profil", link: paths.MY_PROFILE },
    { name: "Panel Główny", link: paths.HOME },
]


export default function AccountMenu({ trigger, handleClose }: AccountMenuProps) {
    const { logout } = useSession();

    const linksComp = React.useMemo(() => {
        return links.map(({ name, link }, i) =>
            <MenuItem key={i} onClick={handleClose}>
                <AppLink to={link}>
                    {name}
                </AppLink>
            </MenuItem>)
    }, [handleClose]);


    return (
        <Menu
            id="menu-appbar"
            anchorEl={trigger}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(trigger)}
            onClose={handleClose}
        >
            {linksComp}

            <MenuItem onClick={() => {
                handleClose();
                logout();
            }}>
                Wyloguj
            </MenuItem>
        </Menu>
    );
}