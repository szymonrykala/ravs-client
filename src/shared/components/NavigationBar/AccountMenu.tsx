import { Menu, MenuItem } from "@mui/material";
import useSession from "../../../auth/useSession";
import paths from "../../path";
import AppLink from "../AppLink";



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
            {links.map(({ name, link }, i) =>
                <MenuItem key={i} onClick={handleClose}>
                    <AppLink to={link}>
                        {name}
                    </AppLink>
                </MenuItem>)}

            <MenuItem onClick={() => {
                handleClose();
                logout();
            }}>
                Wyloguj
            </MenuItem>
        </Menu>
    );
}