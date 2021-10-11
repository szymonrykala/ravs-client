import { Grid, List, ListItem } from "@mui/material";
import RouterLink from "../RouterLink/index";


interface LinkListItem {
    name: string,
    link: string
}


const linksList: LinkListItem[][] = [
    [
        { name: 'FAQ', link: '/app/faq' },
        { name: 'Logowanie', link: '/login' },
        { name: 'Rejestracja', link: '/register' },
        { name: 'Aktywacja Konta', link: '/activate' },

    ],
    [
        { name: 'Home', link: '/app/home' },
        { name: 'Profil', link: '/app/me' },
        { name: 'Infrastruktura', link: '/app/addresses' },
    ]
];



export default function Links() {

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
            {linksList.map((list, index) => <Grid key={index} item>
                <List>
                    {list.map(({ name, link }) => <ListItem key={name}>
                        <RouterLink
                            style={{ color:'#dedeff' }}
                            to={link}>
                            {name}
                        </RouterLink>
                    </ListItem>)}
                </List>
            </Grid>)}
        </Grid>
    );
}
