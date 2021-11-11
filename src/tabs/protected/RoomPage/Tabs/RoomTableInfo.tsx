import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useResourceMap } from "../../../../contexts/ResourceMapContext";
import { DetailedRoom } from "../../../../models/Room";
import AppLink from "../../../../shared/components/AppLink";
import YesNoIcon from "../../../../shared/components/YesNoIcon";


interface RoomTableInfoProps {
    room: DetailedRoom,
    deleteTag: () => Promise<void>
}


export default function RoomTableInfo({
    room, deleteTag
}: RoomTableInfoProps) {
    const { getBuildingLink } = useResourceMap();

    const tableRows = React.useMemo(() => {
        return [
            {
                label: "Nazwa sali",
                value: room.name
            }, {
                label: "Typ sali",
                value: room.roomType
            }, {
                label: "Ilość miejsc",
                value: room.seatsCount
            }, {
                label: "Piętro",
                value: room.floor === 0 ? "parter" : room.floor
            }, {
                label: "Ilość miejsc",
                value: room.seatsCount
            }, {
                label: "Budynek",
                value: <AppLink withIcon to={getBuildingLink(room.building.id)}> {room.building.name} </AppLink>
            }, {
                label: "Aktualnie wolny",
                value: <YesNoIcon value={!room.occupied} />
            }, {
                label: "Przypisany tag RFID",
                value: room.RFIDTag ?
                    <Chip label={room.RFIDTag} onDelete={deleteTag} />
                    : <YesNoIcon value={false} />
            }, {
                label: "Dostępny do rezerwacji",
                value: <YesNoIcon value={!room.blocked} />
            },
        ];
    }, [room, deleteTag]);


    const RenderedRows = React.useMemo(() => {
        return tableRows.map(({ label, value }, index) =>
            <TableRow key={index}>
                <TableCell sx={{ color: "gray" }} align="left">{label}</TableCell>
                <TableCell sx={{ color: "primary.main", fontWeight: "bold" }} align="left">{value}</TableCell>
            </TableRow>
        )
    }, [tableRows])


    return (
        <TableContainer >
            <Table aria-label="simple table" size="small" >
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
    );
}
