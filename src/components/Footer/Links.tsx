import { Container, Link, List, ListItem } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import useSession from "../../auth/useSession";
import paths from "../../shared/path";
import useResolvedAccess from "../pages/protected/hooks/useResolvedAccess";


interface LinkListItem {
    name: string,
    link: string
}


const linksList: LinkListItem[] = [
    { name: 'Logowanie', link: paths.LOGIN },
    { name: 'Rejestracja', link: paths.REGISTER },
    { name: 'Aktywacja Konta', link: paths.ACTIVATE },
];



export default function Links() {
    const { user } = useSession();
    const access = useResolvedAccess();


    const resolvedLinksList = React.useMemo(() => {
        const list = [...linksList];
        if (user) {
            list.push({ name: 'Mój Profil', link: paths.MY_PROFILE }, { name: 'Home', link: paths.HOME });
            access.accessAdmin && list.push({ name: 'Dostępy', link: paths.ACCESS });
            access.owner && list.push({ name: 'Ustawienia', link: paths.SETTINGS });
        }
        return list;
    }, [
        user,
        access?.accessAdmin,
        access?.owner,
    ]);


    const links = React.useMemo(() => {

        return resolvedLinksList.filter(item => item.link)
            .map(({ name, link }) =>
                <ListItem
                    key={name}
                    sx={{
                        width: '50%',
                        minWidth: '200px'
                    }}>
                    <Link
                        sx={{ color: 'background.default' }}
                        href={link}
                    >
                        {name}
                    </Link>
                </ListItem>
            );
    }, [
        resolvedLinksList
    ]);

    return (
        <Box
            sx={{
                backgroundColor: "primary.main"
            }}
        >
            <Container>
                <List sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap'
                }}>

                    {links}
                </List>
            </Container>
        </Box>
    );
}
