import { Typography } from "@mui/material";
import React from "react";
import Building from "../../../../../models/Building";
import ScrollableHorizaontalList, { BuildingListItem } from "../../../../../shared/components/ScrolableHorizaontalList";
import { useAddress } from "../../AddressContext";


export default function ScrollableBuildingsList() {
    const { getBuildingsInAddress } = useAddress();

    const [buildings, setBuildings] = React.useState<Building[]>();


    const load = React.useCallback(async () => {
        const buildings = await getBuildingsInAddress();
        setBuildings(buildings);
    }, [getBuildingsInAddress])


    React.useEffect(() => {
        load();
    }, [load]);


    return (
        <ScrollableHorizaontalList
            title="Lista budynków:"
        >
            {buildings?.length === 0 && <Typography>
                Brak budynków w tej lokalizacji
            </Typography>}

            {buildings?.map(item => <BuildingListItem key={item.id} building={item} />)}

        </ScrollableHorizaontalList>
    );
}