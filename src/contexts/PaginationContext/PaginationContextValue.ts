import { APIPagination } from "../../services/interfaces";


export default interface PaginationContextValue {
    setPagination: React.Dispatch<React.SetStateAction<APIPagination>>,
    pagination: APIPagination
}

export const paginationContextDefaults: PaginationContextValue = {
    setPagination: (
        value: APIPagination | ((old: APIPagination) => APIPagination)
    ) => undefined,

    pagination: {
        itemsOnPage: 10,
        currentPage: 0,
        pagesCount: 0
    }
}