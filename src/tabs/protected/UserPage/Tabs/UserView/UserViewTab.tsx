import { Divider, Grid, Stack } from "@mui/material";
import DatesFooter from "../../../../../shared/components/DatesFooter";
import ImageView from "../../../../../shared/components/ImageView";
import { useUser } from "../../UserContext";
import OptionButtons from "./OptionButtons";
import UserInfo from "./UserInfo";



export default function UserViewTab() {
    const { user } = useUser();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ImageView
                    title={`${user.name} ${user.surname}`}
                    image={user.image}
                    sx={{ maxWidth: '250px', maxHeight: '250px' }}
                />
            </Grid>
            <Grid item xs={12} md={8} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Stack spacing={2}>
                    <UserInfo user={user} />

                    <Divider />

                    <OptionButtons />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <DatesFooter model={user} />
            </Grid>
        </Grid>
    )
}