import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";


const explonations = [
    {
        field: 'Identyfikator - id',
        text: 'Numer identyfikacyjny klasy dostępu. Ten numer przypisujesz użytkownikowi podczas zmiany uprawnień.'
    },
    {
        field: 'Nazwa - name',
        text: 'Nazwa klasy dostępu'
    },    {
        field: 'Właściciel - owner',
        text: <>Najwyższy zestaw uprawnień.
            Użytkownik ma możliwość zmiany konfiguracji platformy oraz posiada on wszystkie inne uprawnienia włączając w to edytowanie danych innych użytkowników.
            Jest właścicielem platformy.</>
    },    {
        field: 'Administrator klas dostępu - accessAdmin',
        text: 'Użytkownik ma możliwość tworzenia, edytowania oraz usuwania klas dostępu. Jest odpowiedzialny za przydzielanie dostępu użytkownikom.'
    },    {
        field: 'Administrator inwentarza - premisesAdmin',
        text: 'Użytkownik jest odpowiedzialny za tworzenie, edycję i usuwanie adresów, budynków i sal.'
    },    {
        field: 'Administrator kluczy - keysAdmin',
        text: 'Użytkownik ma możliwość przypisywania i usuwania tagów RFID dla każdej sali.'
    },    {
        field: 'Możliwość rezerwacji - reservationsAbility',
        text: 'Użytkownik ma możliwość tworzenia rezerwacji'
    }, {
        field: 'Administrator rezerwacji - reservationsAdmin',
        text: 'Użytkownik ma możliwość edytowania oraz usuwania rezerwacji stworzonych przez innych użytkowników.'
    },    {
        field: 'Administrator logów - logsAdmin',
        text: 'Użytkownik ma możliwość przeglądania logów aplikacji.'
    },    {
        field: 'Dostęp do statystyk - statsViewer',
        text: 'Użytkownik może przeglądać statystyki wygenerowane dla aplikacji, użytkownika, budynku i pokoju.'
    },
];



export default function AccessInfo() {



    const rendered = React.useMemo(() => {
        return explonations.map(({ field, text }) =>
            <li>
                <Typography variant='subtitle1' component='h3'>
                    {field}
                </Typography>
                <Typography variant='body2' color='text.secondary' mb={1}>
                    {text}
                </Typography>
            </li>
        );
    }, []);


    return (
        <Stack spacing={3}>
            <span>
                <Typography component='h1' variant='h3' color='primary.dark'>
                    Klasy Dostępu
                </Typography>
                <Typography variant='body1' color="text.secondary" mt="5px">
                    Dostępne tutaj opcje wpływają znacząco na funkcjonowanie całej platformy. <br />
                    Konigurowanie klas dostępu użytkowników to bardzo odpowiedzialne zadanie. Upewnij się że nadajesz tylko wymagane uprawnienia.
                    Stosuj się do modelu <a target='_blank' href='https://en.wikipedia.org/wiki/Principle_of_least_privilege'>Least Privilege</a>.
                </Typography>
            </span>


            <span>
                <Typography variant='h5' component='h2'>
                    Pola używane w klasach dostępu:
                </Typography>
                <ul>
                    {rendered}

                </ul>
            </span>


        </Stack>
    );
}