import { Container, Link, List, ListItem, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import React from "react";
import useSession from "../../auth/useSession";
import paths from "../../shared/path";
import useResolvedAccess from "../pages/protected/hooks/useResolvedAccess";


interface LinkListItem {
    name: string,
    link: string
}


const LinkItem = (props: LinkListItem) =>
    <ListItem
        sx={{
            width: '30%',
            minWidth: '200px'
        }}>
        <Link
            sx={{ color: 'background.default' }}
            href={props.link}
        >
            {props.name}
        </Link>
    </ListItem>
    ;


function Links() {
    const { user } = useSession();
    const access = useResolvedAccess();


    const linksList = React.useMemo(() => {
        const list = [];
        if (user) {
            list.push({ name: 'Mój Profil', link: paths.MY_PROFILE }, { name: 'Home', link: paths.HOME });
            access.accessAdmin && list.push({ name: 'Dostępy', link: paths.ACCESS });
            access.owner && list.push({ name: 'Ustawienia', link: paths.SETTINGS });
        } else {
            list.push(
                { name: 'Strona główna', link: paths.PUBLIC },
                { name: 'Logowanie', link: paths.LOGIN },
                { name: 'Rejestracja', link: paths.REGISTER },
                { name: 'Aktywacja Konta', link: paths.ACTIVATE }
            );
        }
        return list;
    }, [
        user,
        access?.accessAdmin,
        access?.owner,
    ]);


    const links = React.useMemo(() => {

        return linksList.filter(item => item.link)
            .map((item) => <LinkItem key={item.name} {...item} />);
    }, [
        linksList
    ]);

    return (
        <Box
            sx={{
                backgroundColor: "primary.main"
            }}
        >
            <Container>
                <Typography sx={{ pt: 2 }} component='p' variant='body2' color='background.default'>
                    Przydatne linki:
                </Typography>
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

export default React.memo(Links);