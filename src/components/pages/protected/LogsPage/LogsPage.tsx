import { Typography } from "@mui/material";
import GenericLogsTab from "../components/GenericLogsTab";
import SmallCard from "../components/SmallCard";


function LogsPage() {
    return (
        <>
            <SmallCard
                title='Logs Explorer'
            >
                <GenericLogsTab />
            </SmallCard>
            <br />
            <SmallCard title="Przykłady">
                <Typography variant="body2">
                    "%" - tzw. wildcard - zstępuje dowolny ciąg znaków <br/>
                    Ustawienia: %/configuration <br/>
                    Użytkownicy: %/users <br/>
                    Adresy / Budynki / Sale: %/addresses %/buildings %/rooms <br/>
                    Klasy dostępu: %/accesses <br/>
                    Rezerwacje: %/reservations
                </Typography>
            </SmallCard>
        </>
    )
}

export default LogsPage;