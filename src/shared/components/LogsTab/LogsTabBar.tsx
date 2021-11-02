import { Grid, FormControl, InputLabel, Select, MenuItem, Input } from "@mui/material";
import { LogsQueryParams } from "../../../services/interfaces";
// import { LogsQueryParams } from "../../../services/LogService";


export interface LogsTabBarProps {
    setParams: React.Dispatch<React.SetStateAction<LogsQueryParams>>,
    params: LogsQueryParams
}


export function LogsTabBar({
    setParams,
    params
}: LogsTabBarProps) {

    function handleChange(evt: any) {
        evt.preventDefault();
        setParams({ ...params, [evt.target.name]: evt.target.value });
    }

    return (
        <Grid container component="form" columnSpacing={3}>
            <Grid item xs={6} md={2}>
                <FormControl fullWidth>
                    <InputLabel id="wybierz-metode">Metoda</InputLabel>
                    <Select
                        labelId="wybierz-metode"
                        id="metoda"
                        value={params.method}
                        name="method"
                        label="wybierz-metode"
                        onChange={handleChange}
                    >
                        <MenuItem value="">brak</MenuItem>
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                        <MenuItem value="PATCH">PATCH</MenuItem>
                        <MenuItem value="DELETE">DELETE</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
                <FormControl fullWidth>
                    <InputLabel id="Id użytkownika">Id użytkownika</InputLabel>
                    <Input
                        type="number"
                        id="Id użytkownika"
                        name="user"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

