import Grid from "@mui/material/Grid";
import React from "react";
import GenericLogsTab from "../../../shared/components/GenericLogsTab";
import GenericReservationsTab from "../../../shared/components/GenericReservationsTab";
import SwipeableTabs from "../../../shared/components/SwipeableTabs/SwipeableTabs";
import UserCard from "./components/UserCard";
import UserCharts from "./components/UserCharts";


import { UserContext } from "./UserContext";



export default function UserPage() {


    const pages = React.useMemo(() => {
        let arr: any = [];
        arr.push({ name: 'Rezerwacje', component: <GenericReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <UserCharts /> });
        arr.push({ name: 'Logi', component: <GenericLogsTab /> });

        return arr;
    }, []);


    return (
        <UserContext>
            <Grid container spacing={2} flexWrap='wrap-reverse'>
                <Grid item xs={12} md={7} lg={8}>
                    <SwipeableTabs tabs={pages} />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <UserCard />
                </Grid>
            </Grid>
        </UserContext>
    );
}