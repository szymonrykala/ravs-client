import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import useSession from "../../../../../auth/useSession";
import { useQueryParams } from "../../../../../contexts/QueryParamsContext";
import { LogsQueryParams } from "../../../../../services/LogService";
import LazyInput from "../../components/LazyInput";



function LogsTabBar() {
    const { queryParams, setQueryParams } = useQueryParams<LogsQueryParams>();
    const { user } = useSession();
    const urlQueryString = useLocation().search;


    const handleChange = React.useCallback((evt: any) => {
        evt.preventDefault();
        setQueryParams(old => ({ ...old, [evt.target.name]: evt.target.value }));
    }, [setQueryParams])


    const predefinedEndpoint = React.useMemo(() => {
        const params = new URLSearchParams(urlQueryString);
        const endp = params.get('endpoint') ?? `%/users/${user?.id}`;
        setQueryParams(old => ({ ...old, endpoint: endp }));
        
        return endp;
    }, [
        setQueryParams,
        urlQueryString,
        user?.id
    ]);


    return (
        <Grid container component="form" spacing={3}>
            <Grid item xs={6} md={2}>
                <FormControl fullWidth>
                    <InputLabel id="wybierz-metode">Metoda</InputLabel>
                    <Select
                        size="small"
                        labelId="wybierz-metode"
                        id="metoda"
                        value={queryParams.method}
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
                <LazyInput
                    label="id użytkownika"
                    name='userId'
                    value={queryParams.userId?.toString() ?? ''}
                    onChange={(evt) => setQueryParams(old => ({ ...old, userId: evt.target.value }))}
                />
            </Grid>
            <Grid item xs={12} md>
                <LazyInput
                    name='endpoint'
                    label='endpoint'
                    value={predefinedEndpoint}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    );
}

export default React.memo(LogsTabBar);