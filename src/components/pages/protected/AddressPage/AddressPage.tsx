import React from "react";
import Grid from "@mui/material/Grid";
import Loading from "../../../../shared/components/Loading";
import GenericReservationsTab from "../components/GenericReservationsTab";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import useResolvedAccess from "../hooks/useResolvedAccess";
import AddressContext from "./AddressContext";
import AddressCard from "./components/AddressCard";
import BuildingsList from "./components/BuildingsList";

const LazyAddressCharts = React.lazy(() => import("./components/AddressCharts"));
const AddressCharts = () => <React.Suspense fallback={<Loading />}>
    <LazyAddressCharts />
</React.Suspense>



function AddressPage() {
    const { statsViewer } = useResolvedAccess();

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <GenericReservationsTab /> });
        statsViewer && arr.push({ name: 'Statystyki', component: <AddressCharts /> });

        return arr;
    }, [
        statsViewer
    ]);


    return (
        <AddressContext>
            <Grid container spacing={2} flexWrap='wrap-reverse'>
                <Grid item xs={12} md={7} lg={8}>
                    <SwipeableTabs tabs={pages} />
                </Grid>
                <Grid item container spacing={2} alignContent='flex-start' xs={12} md={5} lg={4}>
                    <Grid item xs={12}>
                        <AddressCard />
                    </Grid>
                    <Grid item xs={12} >
                        <BuildingsList />
                    </Grid>
                </Grid>
            </Grid>
        </AddressContext>
    );
}

export default React.memo(AddressPage);