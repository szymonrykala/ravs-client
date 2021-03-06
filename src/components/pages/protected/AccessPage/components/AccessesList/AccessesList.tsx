import React from "react";
import Stack from "@mui/material/Stack";
import DeleteModal from "../../../components/DeleteModal";
import TabHeadLine from "../../../../../../shared/components/TabHeadLine";

import { useAccess } from "../../AccessContext";
import { CreateForm } from "../../Forms";
import AccessListItem from "./AccessListItem";
import { List } from "@mui/material";
import AddItem from "./AddItem";
import { Tip } from "../../../components/Tutorial";



export default function AccessesList() {
    const { accessesList, openAccess, createAccess, deleteAccess } = useAccess();

    const [createModalOpen, setCreateModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const [toDelete, setToDelete] = React.useState<{ id: number, name: string } | null>(null);

    // prerendered access rows
    const renderedRows = React.useMemo(() => {
        return accessesList.map(({ id, name }) =>
            <AccessListItem
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


    // higher order delete access handler
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
                open={deleteModalOpen}
                onClose={() => {
                    setToDelete(null);
                    setDeleteModalOpen(false);
                }}
                onSuccess={handleDelete}
            />

            <Stack spacing={4}>
                <TabHeadLine
                    title="Lista klas dost??pu"
                    subtitle="Tw??rz, edytuj i usuwaj klasy dost??pu."
                />
                <Tip text='Kliknij element, aby zobaczy?? uprawnienia.'>
                    <List sx={{ maxWidth: '400px' }}>
                        <AddItem onClick={() => setCreateModalOpen(true)} />
                        {renderedRows}
                    </List>
                </Tip>
            </Stack >
        </>
    );
}