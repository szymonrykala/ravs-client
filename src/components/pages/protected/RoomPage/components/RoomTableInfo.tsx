import { Chip, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";
import { DetailedRoom } from "../../../../../models/Room";
import { RfidForm } from "../Forms";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import YesNoIcon from "./YesNoIcon";
import useResolvedAccess from "../../hooks/useResolvedAccess";
import { Tip } from "../../components/Tutorial";


interface RoomTableInfoProps {
    room: DetailedRoom,
    deleteTag: () => Promise<void>
}


export default function RoomTableInfo({
    room, deleteTag
}: RoomTableInfoProps) {
    const { keysAdmin } = useResolvedAccess();
    const { getBuildingLink } = useResourceMap();
    const [rfidTagModalOpen, setRfidTagModalOpen] = React.useState<boolean>(false);

    const tableRows = React.useMemo(() => {
        const rows = [
            {
                label: "Ilość miejsc",
                value: room.seatsCount
            }, {
                label: "Piętro",
                value: room.floor === 0 ? "parter" : room.floor
            }, {
                label: "Budynek",
                value: <Link href={getBuildingLink(room.building.id)}> {room.building.name} </Link>
            }, {
                label: "Aktualnie wolny",
                value: <YesNoIcon value={!room.occupied} />
            }
        ];
        keysAdmin && rows.push({
            label: "Tag RFID",
            value: room.RFIDTag ?
                <Chip label={room.RFIDTag} onDelete={deleteTag} sx={{ maxWidth: '120px' }} />
                : <Tip text='Kliknij "+" by przypisać klucz RFID' priority={10}>
                    <IconButton size="small"
                        onClick={() => setRfidTagModalOpen(true)}
                        sx={{ p: '0px' }}
                    >
                        <AddCircleIcon />
                    </IconButton>
                </Tip>
        });
        rows.push({
            label: "Dostępny do rezerwacji",
            value: <YesNoIcon value={!room.blocked} />
        });

        return rows;
    }, [
        keysAdmin,
        room,
        deleteTag,
        getBuildingLink,
    ]);


    const RenderedRows = React.useMemo(() => {
        return tableRows.map(({ label, value }) =>
            <TableRow hover key={label}>
                <TableCell sx={{ color: "text.secondary" }} align="left">{label}</TableCell>
                <TableCell sx={{ color: "primary.main", fontWeight: "bold" }} align="left">{value}</TableCell>
            </TableRow>
        )
    }, [tableRows])


    return (
        <>
            <RfidForm
                open={rfidTagModalOpen}
                onClose={() => setRfidTagModalOpen(false)}
            />

            <TableContainer >
                <Table aria-label="room-info-table" size="small">
                    <TableHead sx={{ display: 'none' }}>
                        <TableRow>
                            <TableCell align="left">Właściwość</TableCell>
                            <TableCell align="left">stan</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {RenderedRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
