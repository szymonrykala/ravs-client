import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { usePagination } from '../../contexts/PaginationContext';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';



export default function ListPagination() {
    const { pagination, setPagination } = usePagination();

    const handlePageChange = React.useCallback((event: React.ChangeEvent<unknown>, value: number) => {
        setPagination(old => ({
            ...old,
            currentPage: value
        }));
    }, []);

    const handleCountChange = React.useCallback((event: SelectChangeEvent<number>, child: React.ReactNode) => {
        setPagination(old => ({
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
                count={pagination.pagesCount}
                size='small'
                page={pagination.currentPage}
                onChange={handlePageChange}
            />
            <FormControl fullWidth sx={{ maxWidth: '100px' }}>
                <InputLabel id="items-on-page-label">Na stronie</InputLabel>
                <Select

                    size='small'
                    labelId="items-on-page-label"
                    id="items-on-page"
                    label="Na stronie"
                    value={pagination.itemsOnPage}
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
