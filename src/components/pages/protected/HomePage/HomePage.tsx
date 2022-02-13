import React from 'react';
import { Grid } from "@mui/material";
import Favourites from "./Favourites";
import Notebook from "./Notebook";
import HomeReservations from "./HomeReservations";



export default function HomePage() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
                <HomeReservations />
            </Grid>
            <Grid item container spacing={2} xs={12} lg={4}
                alignContent='flex-start'
            >
                <Grid item xs={12} sm={6} lg={12}>
                    <Notebook />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
                    <Favourites />
                </Grid>
            </Grid>
        </Grid>
    );
}