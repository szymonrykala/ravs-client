import Grid from "@mui/material/Grid";
import React from "react";
import Loading from "../../../../shared/components/Loading";
import GenericReservationsTab from "../components/GenericReservationsTab";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import useResolvedAccess from "../hooks/useResolvedAccess";
import UserCard from "./components/UserCard";
import { UserContext } from "./UserContext";



const LazyUserCharts = React.lazy(() => import("./components/UserCharts"));
const UserCharts = () => <React.Suspense fallback={<Loading />}>
    <LazyUserCharts />
</React.Suspense>


export default function UserPage() {
    const { statsViewer } = useResolvedAccess();

    const pages = React.useMemo(() => {
        let arr: any = [];
        arr.push({ name: 'Rezerwacje', component: <GenericReservationsTab /> });
        statsViewer && arr.push({ name: 'Statystyki', component: <UserCharts /> });

        return arr;
    }, [
        statsViewer,
    ]);


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