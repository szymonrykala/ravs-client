import { Menu, MenuItem } from "@mui/material";
import useSession from "../../../auth/useSession";
import RouterLink from "../RouterLink/index";



interface AccountMenuProps {
    trigger: null | HTMLElement,
    handleClose: () => void
}

const links = [
    { name: "Mój Profil", link: "/app/me" },
    { name: "Panel Główny", link: "/app/home" },
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
                    <RouterLink to={link}>
                        {name}
                    </RouterLink>
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