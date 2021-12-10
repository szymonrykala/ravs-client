import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useQueryParams } from "../../../../../../contexts/QueryParamsContext";
import { UserQueryParams } from "../../../../../../services/UserService";
import React from "react";
import LazyInput from "../../../../../../shared/components/LazyInput";


export default function SearchBar() {
    const { setQueryParams, queryParams } = useQueryParams<UserQueryParams>();


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number | boolean = event.target.value;

        switch (event.target.name) {
            case "deleted":
            case "activated":
                value = Boolean(event.target.checked);
                break;
            case 'search':
                break;
            default:
                break;
        }

        setQueryParams((old: UserQueryParams) => ({
            ...old,
            [event.target.name]: value
        }));
    }, [setQueryParams]);


    return (
        <Grid container>
            <Grid item xs={12} md={8}>
                <LazyInput
                    label='wyszukaj'
                    name='search'
                    value={queryParams.search ?? ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={4} display='flex' justifyContent='start' flexWrap='wrap' color='text.secondary'>
                <FormControlLabel
                    labelPlacement="start"
                    control={<Switch id="aktywni-użytkownicy" name="activated"
                        inputProps={{ 'aria-label': 'aktywni-użytkownicy' }}
                        onChange={handleChange}
                        checked={queryParams.activated}
                    />}
                    label="Aktywne konta"
                />
                <FormControlLabel
                    labelPlacement="start"
                    control={<Switch id="unsunięci-użytkownicy" name="deleted"
                        inputProps={{ 'aria-label': 'unsunięci-użytkownicy' }}
                        onChange={handleChange}
                        checked={queryParams.deleted}
                    />}
                    label="Usunięte konta"
                />
            </Grid>
        </Grid>
    );
}