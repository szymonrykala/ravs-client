import { FormControlLabel, Grid, IconButton, InputBase, Switch } from "@mui/material";
import { useQueryParams } from "../../../../../contexts/QueryParamsContext";
import { UserQueryParams } from "../../../../../services/UserService";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";


export default function SearchBar() {
    const { setQueryParams, queryParams } = useQueryParams<UserQueryParams>();

    const [search, setSearch] = React.useState<string>(queryParams?.search ?? '');

    const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQueryParams(old=>({...old, search:search}));
    }, [queryParams]);


    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number | boolean = event.target.value;

        switch (event.target.name) {
            case "deleted":
            case "activated":
                value = Boolean(event.target.checked);
                break;
            case 'search':
                setSearch(value);
                return;
            default:
                break;
        }

        setQueryParams((old: UserQueryParams) => ({
            ...old,
            [event.target.name]: value
        }));
    }, [setQueryParams]);


    return (
        <Grid container component='form' onSubmit={handleSubmit}>
            <Grid item xs={12} md={8} display='flex' alignItems='center' justifyContent='start'>
                <InputBase
                    name='search'
                    value={search}
                    onChange={handleChange}
                    placeholder="wyszukaj"
                    sx={{ width: '90%', maxWidth: '600px', p: 1, mx: 1, flex: 1, bgcolor: 'background.default' }}
                    inputProps={{ 'aria-label': 'wyszukaj' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
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