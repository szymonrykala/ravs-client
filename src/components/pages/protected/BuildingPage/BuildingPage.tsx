import React from "react";
import Grid from "@mui/material/Grid";
import GenericReservationsTab from "../components/GenericReservationsTab";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import BuildingContext from "./BuildingContext";
import BuildingCard from "./components/BuildingCard";
import RoomsList from "./components/RoomsList";
import useResolvedAccess from "../hooks/useResolvedAccess";
import Loading from "../../../../shared/components/Loading";



const LazyRoomOrBuildingChartTab = React.lazy(() => import("../components/RoomOrBuildingChartTab"));
const RoomOrBuildingChartTab = () => <React.Suspense fallback={<Loading />}>
    <LazyRoomOrBuildingChartTab />
</React.Suspense>


function BuildingPage() {
    const { statsViewer } = useResolvedAccess();

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <GenericReservationsTab /> });
        statsViewer && arr.push({ name: 'Statystyki', component: <RoomOrBuildingChartTab /> });

        return arr;
    }, [
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
};

export default React.memo(BuildingPage);