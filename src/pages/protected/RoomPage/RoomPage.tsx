import { RoomContextProvider } from "./RoomContext";
import React from "react";
import RoomOrBuildingChartTab from "../components/RoomOrBuildingChartTab";
import Grid from "@mui/material/Grid";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import GenericLogsTab from "../components/GenericLogsTab";
import GenericReservationsTab from "../components/GenericReservationsTab";
import RoomCard from "./components/RoomCard";



export default function RoomPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <GenericReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <RoomOrBuildingChartTab /> });
        arr.push({ name: 'Logi', component: <GenericLogsTab /> });

        return arr;
    }, []);


    return (
        <RoomContextProvider>
            <Grid container spacing={2} flexWrap='wrap-reverse'>
                <Grid item xs={12} md={7} lg={8}>
                    <SwipeableTabs tabs={pages} />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <RoomCard />
                </Grid>
            </Grid>
        </RoomContextProvider>
    );
}
