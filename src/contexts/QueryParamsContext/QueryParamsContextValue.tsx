
export default interface QueryParamsContextValue<T> {
    setQueryParams: React.Dispatch<React.SetStateAction<T>>
    queryParams: T,
}


export const queryParamsContextDefaults = {
    queryParams: { q: 1 },
    setQueryParams: (param: { q: number }) => { }
}