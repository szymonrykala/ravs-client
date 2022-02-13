import React from 'react';
import {
    Grid,
} from "@mui/material";

import { Box } from "@mui/system";

import Copyright from "./Copyrights";
import Links from "./Links";




export default function Footer() {

    return (
        <Box >
            <Grid container
                direction="column"
                alignItems="stretch"
            >
                <Grid item>
                    <Links />
                </Grid>
                <Grid item>
                    <Copyright />
                </Grid>
            </Grid>
        </Box>
    );
}




