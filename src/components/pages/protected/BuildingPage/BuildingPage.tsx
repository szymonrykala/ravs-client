import Grid from "@mui/material/Grid";
import React from "react";
import GenericLogsTab from "../components/GenericLogsTab";
import GenericReservationsTab from "../components/GenericReservationsTab";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import RoomOrBuildingChartTab from "../components/RoomOrBuildingChartTab";
import BuildingContext from "./BuildingContext";
import BuildingCard from "./components/BuildingCard";
import RoomsList from "./components/RoomsList";
import useResolvedAccess from "../hooks/useResolvedAccess";


export default function BuildingPage() {
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
        <BuildingContext>
            <Grid container spacing={2} flexWrap='wrap-reverse'>
                <Grid item xs={12} md={7} lg={8}>
                    <SwipeableTabs tabs={pages} />
                </Grid>
                <Grid item container spacing={2} alignContent='flex-start' xs={12} md={5} lg={4}>
                    <Grid item xs={12}>
                        <BuildingCard />
                    </Grid>
                    <Grid item xs={12}>
                        <RoomsList />
                    </Grid>
                </Grid>
            </Grid>
        </BuildingContext>
    );
}