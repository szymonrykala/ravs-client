import { TablePagination } from "@mui/material";
import React from "react";
import usePagination from "../../../contexts/PaginationContext/usePagination";
import TablePaginationActions from "./TablePaginationActions";



export default function TablePaginationFooter() {
    const { setPagination, pagination } = usePagination()


    const handlePageChange = React.useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPagination(old => ({ ...old, currentPage: newPage }));
    }, [setPagination]);


    const handleChangeRowsPerPage = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPagination(old => ({ ...old, itemsOnPage: Number(event.target.value) }));
    }, [setPagination]);


    const displayCount = React.useCallback(({ from, to, count }: any) => {
        return `${from}-${to} z ${count !== -1 ? count : `więcej niż ${to}`}`;
    }, []);


    return (
        <TablePagination
            labelRowsPerPage="Na stronie:"
            labelDisplayedRows={displayCount}
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={6}
            count={pagination.pagesCount * pagination.itemsOnPage}
            rowsPerPage={pagination.itemsOnPage}
            page={pagination.currentPage}

            SelectProps={{
                inputProps: {
                    'aria-label': 'Na stronę',
                },
                native: false,
            }}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            sx={{ border: '0px' }}
        />

    );
}