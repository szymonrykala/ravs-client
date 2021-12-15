import { RoomContextProvider } from "./RoomContext";
import React from "react";
import RoomOrBuildingChartTab from "../components/RoomOrBuildingChartTab";
import Grid from "@mui/material/Grid";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import GenericLogsTab from "../components/GenericLogsTab";
import GenericReservationsTab from "../components/GenericReservationsTab";
import RoomCard from "./components/RoomCard";
import useResolvedAccess from "../hooks/useResolvedAccess";



export default function RoomPage() {
    const { logsAdmin, statsViewer } = useResolvedAccess();

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <GenericReservationsTab /> });
        statsViewer && arr.push({ name: 'Statystyki', component: <RoomOrBuildingChartTab /> });
        logsAdmin && arr.push({ name: 'Logi', component: <GenericLogsTab /> });

        return arr;
    }, [
        logsAdmin,
        statsViewer
    ]);


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
