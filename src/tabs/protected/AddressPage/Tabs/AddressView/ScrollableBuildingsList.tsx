import React from "react";
import { useParams } from "react-router-dom";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";
import Building from "../../../../../models/Building";
import { AddressViewParams } from "../../../../../services/AddressService";
import BuildingService, { BuildingCreateParams } from "../../../../../services/BuildingService";
import ScrollableHorizaontalList, { BuildingListItem } from "../../../../../shared/components/ScrolableHorizaontalList";
import { useAddress } from "../../AddressContext";
import { CreateBuildingForm } from "../../Forms";


export default function ScrollableBuildingsList() {
    const { getBuildingsInAddress } = useAddress();
    const { reloadMap } = useResourceMap();
    const notify = useNotification();

    const urlParams = useParams() as AddressViewParams;

    const [createBuildingModalOpen, setCreateBuildingModalOpen] = React.useState<boolean>(false);
    const [buildings, setBuildings] = React.useState<Building[]>();


    const load = React.useCallback(async () => {
        const buildings = await getBuildingsInAddress();
        setBuildings(buildings);
    }, [getBuildingsInAddress])


    React.useEffect(() => {
        load();
    }, [load]);


    const createBuilding = React.useCallback(async (data: BuildingCreateParams) => {
        try {
            await BuildingService.create(urlParams, data);
            load();
            reloadMap();
            notify('Nowa sala utworzona!', 'success');
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [notify, reloadMap, load]);


    const renderedBuildings = React.useMemo(() => {
        return buildings?.map(item => <BuildingListItem key={item.id} building={item} />)
    }, [buildings]);


    return (
        <>
            <CreateBuildingForm
                addressId={Number(urlParams.addressId)}
                open={createBuildingModalOpen}
                onClose={() => setCreateBuildingModalOpen(false)}
                handleCreateBuilding={createBuilding}
            />

            <ScrollableHorizaontalList
                title="Lista budynków:"
                onAddItem={() => setCreateBuildingModalOpen(true)}
            >
                {renderedBuildings}
            </ScrollableHorizaontalList>
        </>
    );
}
