import { Stack } from "@mui/material";
import ListPagination from "../../../../../shared/components/ListPagination";
import TabHeadLine from "../../../../../shared/components/TabHeadLine";
import SearchBar from "./SearchBar";
import UsersList from "./UsersList";



export default function UsersView() {
    return (
        <Stack spacing={3}>
            <TabHeadLine
                title='Lista użytkowników'
                subtitle='Wyszukuj użytkowników według podanych kryteriów.'
            />

            <SearchBar />

            <UsersList />

            <ListPagination />
        </Stack>
    );
}