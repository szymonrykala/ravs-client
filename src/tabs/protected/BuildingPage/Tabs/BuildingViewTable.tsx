import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useResourceMap } from "../../../../contexts/ResourceMapContext";
import { DetailedBuilding } from "../../../../models/Building";
// import { DetailedBuilding } from "../../../../models/Room";
import AppLink from "../../../../shared/components/AppLink";
import YesNoIcon from "../../../../shared/components/YesNoIcon";
import { dynamicPaths } from "../../../../shared/path";
import { displayDate } from "../../../../shared/utils";


interface BuildingViewTableProps {
    building: DetailedBuilding
}


export default function BuildingViewTable({
    building
}: BuildingViewTableProps) {

    const tableRows = React.useMemo(() => {
        return [
            {
                label: "Nazwa budynku",
                value: building.name
            }, {
                label: "Godzina otwarcia",
                value: building.openTime
            }, {
                label: "Godzina zamknięcia",
                value: building.closeTime
            }, {
                label: "Adres",
                value: <AppLink withIcon to={dynamicPaths.toAddress(building.address.id)}>
                    {building.address.town},&nbsp;{building.address.street}&nbsp;{building.address.number}
                </AppLink>
            },
        ];
    }, [building]);


    const RenderedRows = React.useMemo(() => {
        return tableRows.map(({ label, value }, index) =>
            <TableRow key={index}>
                <TableCell sx={{ color: "text.secondary" }} align="left">{label}</TableCell>
                <TableCell sx={{ color: "primary.main", fontWeight: "bold" }} align="left">{value}</TableCell>
            </TableRow>
        )
    }, [tableRows])


    return (
        <TableContainer >
            <Table aria-label="simple table" size="medium" >
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