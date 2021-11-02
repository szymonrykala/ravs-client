import { TablePagination } from "@mui/material";
import { APIPagination } from "../../../services/interfaces";
import TablePaginationActions from "./TablePaginationActions";

interface TableFooterPaginationProps {
    paginationSetter: React.Dispatch<React.SetStateAction<APIPagination>>,
    pagination: APIPagination
}

export default function MyTablePagination({
    paginationSetter, pagination
}: TableFooterPaginationProps) {

    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => paginationSetter({ ...pagination, currentPage: newPage });


    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => paginationSetter({ ...pagination, itemsOnPage: Number(event.target.value) });


    const displayCount = ({ from, to, count }: any) => `${from}-${to} z ${count !== -1 ? count: `więcej niż ${to}`}`


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
        />
    );
}