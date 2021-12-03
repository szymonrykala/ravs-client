import Grid from "@mui/material/Grid";
import React from "react";
import GenericLogsTab from "../components/GenericLogsTab";
import GenericReservationsTab from "../components/GenericReservationsTab";
import SwipeableTabs from "../../../shared/components/SwipeableTabs/SwipeableTabs";
import AddressContext from "./AddressContext";
import AddressCard from "./components/AddressCard";
import AddressCharts from "./components/AddressCharts";
import BuildingsList from "./components/BuildingsList";


export default function AddressPage() {

    const pages = React.useMemo(() => {
        let arr = [];
        arr.push({ name: 'Rezerwacje', component: <GenericReservationsTab /> });
        arr.push({ name: 'Statystyki', component: <AddressCharts /> });
        arr.push({ name: 'Logi', component: <GenericLogsTab /> });

        return arr;
    }, []);


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