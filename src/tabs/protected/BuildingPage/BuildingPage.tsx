import Grid from "@mui/material/Grid";
import React from "react";
import GenericLogsTab from "../../../shared/components/GenericLogsTab";
import GenericReservationsTab from "../../../shared/components/GenericReservationsTab";
import SwipeableTabs from "../../../shared/components/SwipeableTabs/SwipeableTabs";
import RoomOrBuildingChartTab from "../components/RoomOrBuildingChartTab";
import BuildingContext from "./BuildingContext";
import BuildingCard from "./components/BuildingCard";
import RoomsList from "./components/RoomsList";


export default function BuildingPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <GenericReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <RoomOrBuildingChartTab /> });
        arr.push({ name: 'Logi', component: <GenericLogsTab /> });

        return arr;
    }, []);


    return (
        <BuildingContext>
            <Grid container spacing={2} flexWrap='wrap-reverse'>
                <Grid item xs={12} md={7} lg={8}>
                    <SwipeableTabs tabs={pages} />
                </Grid>
                <Grid item container spacing={2} xs={12} md={5} lg={4}>
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