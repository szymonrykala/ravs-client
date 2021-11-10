import { TablePagination } from "@mui/material";
import React from "react";
import usePagination from "../../../contexts/PaginationContext/usePagination";
import TablePaginationActions from "./TablePaginationActions";


interface TableFooterPaginationProps {

}

export default function TablePaginationFooter({

}: TableFooterPaginationProps) {
    const { setPagination, pagination } = usePagination()

    const handlePageChange = React.useCallback((
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => setPagination(old => ({ ...old, currentPage: newPage }))
        , []);


    const handleChangeRowsPerPage = React.useCallback((
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setPagination(old => ({ ...old, itemsOnPage: Number(event.target.value) }))
        , []);


    const displayCount = React.useCallback(({ from, to, count }: any) =>
        `${from}-${to} z ${count !== -1 ? count : `więcej niż ${to}`}`
        , []);


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