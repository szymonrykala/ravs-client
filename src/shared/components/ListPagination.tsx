import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryParams } from '../../contexts/QueryParamsContext';
import { APIPagination } from '../../services/interfaces';


export default function ListPagination() {
    const { queryParams, setQueryParams } = useQueryParams<APIPagination>();

    
    const handlePageChange = React.useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        setQueryParams(old => ({
            ...old,
            currentPage: value
        }));
    }, []);

    const handleCountChange = React.useCallback((event: SelectChangeEvent<number>, child: React.ReactNode) => {
        setQueryParams(old => ({
            ...old,
            itemsOnPage: Number(event.target.value)
        }));
    }, []);


    return (
        <Stack spacing={2} sx={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
        }}>
            <Pagination
                count={queryParams.pagesCount}
                size='small'
                page={queryParams.currentPage}
                onChange={handlePageChange}
            />
            <FormControl fullWidth sx={{ maxWidth: '100px' }}>
                <InputLabel id="items-on-page-label">Na stronie</InputLabel>
                <Select
                    size='small'
                    labelId="items-on-page-label"
                    id="items-on-page"
                    label="Na stronie"
                    value={queryParams.itemsOnPage ?? 5}
                    onChange={handleCountChange}
                >
                    {
                        [5, 10, 15, 20].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)
                    }
                    <MenuItem value={10000}>wszystko</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}
