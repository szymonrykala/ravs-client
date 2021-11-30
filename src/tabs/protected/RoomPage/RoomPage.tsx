import { RoomContextProvider } from "./RoomContext";
import { ReservationsTab, LogsTab, ViewCard } from "./Tabs";
import React from "react";
import RoomOrBuildingChartTab from "../shared/RoomOrBuildingChartTab";
import Grid from "@mui/material/Grid";
import SwipeableTabs from "../../../shared/components/SwipeableTabs/SwipeableTabs";



export default function RoomPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <ReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <RoomOrBuildingChartTab /> });
        arr.push({ name: 'Logi', component: <LogsTab /> });

        return arr;
    }, []);


    return (
        <RoomContextProvider>
            <Grid container spacing={2} flexWrap='wrap-reverse'>
                <Grid item xs={12} md={7} lg={8}>
                    <SwipeableTabs tabs={pages} />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <ViewCard />
                </Grid>
            </Grid>
        </RoomContextProvider>
    );
}
