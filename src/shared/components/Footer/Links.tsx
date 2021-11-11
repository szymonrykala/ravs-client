import { Grid, List, ListItem } from "@mui/material";
import React from "react";
import paths from "../../path";
import AppLink from "../AppLink";


interface LinkListItem {
    name: string,
    link: string
}


const linksList: LinkListItem[][] = [
    [
        { name: 'FAQ', link: paths.FAQ },
        { name: 'Logowanie', link: paths.LOGIN },
        { name: 'Rejestracja', link: paths.REGISTER },
        { name: 'Aktywacja Konta', link: paths.ACTIVATE },

    ],
    [
        { name: 'Home', link: paths.HOME },
        { name: 'Profil', link: paths.MY_PROFILE },
        { name: 'Zasoby', link: paths.INFRASTRUCTURE },
    ]
];



export default function Links() {

    const links = React.useMemo(() =>
        linksList.map((list, index) => <Grid key={index} item>
            <List>
                {list.map(({ name, link }) => <ListItem key={name}>
                    <AppLink
                        to={link}
                        withIcon
                        sx={{ color: 'background.default' }}
                    >
                        {name}
                    </AppLink>
                </ListItem>)}
            </List>
        </Grid>), []);

    return (
        <Grid
            sx={{
                backgroundColor: "primary.main",
            }}

            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
        >
            {links}
        </Grid>
    );
}
