import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import DeleteModal from "../../../components/DeleteModal";
import TabHeadLine from "../../../../../../shared/components/TabHeadLine";

import { useAccess } from "../../AccessContext";
import { CreateForm } from "../../Forms";
import AddItem from "./AddItem";
import RowItem from "./RowItem";



export default function AccessesList() {
    const { accessesList, openAccess, createAccess, deleteAccess } = useAccess();

    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const [toDelete, setToDelete] = React.useState<{ id: number, name: string } | null>(null);

    const renderedRows = React.useMemo(() => {
        return accessesList.map(({ id, name }) =>
            <RowItem
                key={id}
                id={id}
                name={name}
                onSelect={() => openAccess(id)}
                onDelete={() => {
                    setToDelete({ id: id, name: name })
                    setDeleteModalOpen(true);
                }}
            />).reverse();

    }, [
        accessesList,
        openAccess,
    ]);


    const handleDelete = React.useCallback(async () => {
        if (!toDelete) return;

        if (await deleteAccess(toDelete.id)) {
            setDeleteModalOpen(false);
        }
    }, [toDelete, deleteAccess]);


    return (
        <>

            <CreateForm
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={createAccess}
            />

            <DeleteModal
                objectName={toDelete?.name ?? ''}
                open={deleteModalOpen}
                onClose={() => {
                    setToDelete(null);
                    setDeleteModalOpen(false);
                }}
                onSuccess={handleDelete}
            />

            <Stack spacing={4}>
                <TabHeadLine
                    title="Lista klas dostępu"
                    subtitle="Twórz, edytuj i usuwaj klasy dostępu."
                />

                <TableContainer>
                    <Table sx={{ maxWidth: 550 }} size="small" aria-label="tabela klas dostępów">
                        <TableHead>
                            <TableRow>
                                <TableCell>nr id</TableCell>
                                <TableCell align="left">nazwa</TableCell>
                                <TableCell align="center">opcje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {renderedRows}

                            <AddItem onClick={() => setCreateModalOpen(true)} />
                        </TableBody>
                    </Table>
                </TableContainer>

            </Stack >
        </>
    );
}