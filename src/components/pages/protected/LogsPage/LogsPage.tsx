import { Stack, Typography } from "@mui/material";
import QueryParamsContextProvider from "../../../../contexts/QueryParamsContext/QueryParamsContextProvider";
import ListPagination from "../components/ListPagination";
import SmallCard from "../components/SmallCard";
import { LogsContext } from "./LogsContext";
import LogsTabBar from "./LogsTabBar";
import LogsTable from "./LogsTable";


function LogsPage() {
    return (
        <>
            <SmallCard
                title='Logs Explorer'
            >
                <QueryParamsContextProvider name="logs-query-params" default={{ method: 'PATCH', itemsOnPage: 5 }}>
                    <LogsContext>
                        <br />
                        <Stack spacing={3}>
                            <LogsTabBar />
                            <LogsTable />
                            <ListPagination />
                        </Stack>
                    </LogsContext>
                </QueryParamsContextProvider>
            </SmallCard>
            <br />
            <SmallCard title="Przykłady">
                <Typography variant="body2">
                    "%" - tzw. wildcard - zstępuje dowolny ciąg znaków <br />
                    Ustawienia: %/configuration <br />
                    Użytkownicy: %/users <br />
                    Adresy / Budynki / Sale: %/addresses %/buildings %/rooms <br />
                    Klasy dostępu: %/accesses <br />
                    Rezerwacje: %/reservations
                </Typography>
            </SmallCard>
        </>
    )
}

export default LogsPage;