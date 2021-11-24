import { Grid } from "@mui/material";
import Favourites from "./Favourites";
import Notebook from "./Notebook";



export default function HomePage() {
    // const { user } = useSession();

    // React.useEffect(() => {
        // MetadataService.setadata(user?.metadata ?? {});
    // }, [user]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
                lsta rezerwacji
            </Grid>
            <Grid item container spacing={2} xs={12} lg={4}>
                <Grid item xs={12}>
                    <Notebook />
                </Grid>
                <Grid item xs={12} >
                    <Favourites />
                </Grid>
            </Grid>
        </Grid>
    );
}