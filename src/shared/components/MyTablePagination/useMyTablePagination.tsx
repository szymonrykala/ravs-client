import React from "react";
import { APIPagination } from "../../../services/interfaces";
import MyTablePagination from "./MyTablePagination";


export default function useMyTablePagination() {
    const [pagination, setPagination] = React.useState<APIPagination>({
        itemsOnPage: 10,
        currentPage: 0,
        pagesCount: 0
    });

    const tablePaginationComponent = <MyTablePagination
        paginationSetter={setPagination}
        pagination={pagination}
    />;

    return { tablePaginationComponent, pagination, setPagination }
}