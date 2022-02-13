import React from "react";
import { useParams } from "react-router-dom";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";
import Building from "../../../../../models/Building";
import { AddressViewParams } from "../../../../../services/AddressService";
import BuildingService, { BuildingCreateParams } from "../../../../../services/BuildingService";
import ScrollableList, { ScrollableListItem } from "../../components/ScrollableList";
import { EmptyScrollableListItem } from "../../components/ScrollableList/ScrollableListItem";
import SmallCard from "../../components/SmallCard";
import { Tip } from "../../components/Tutorial";
import { useAddress } from "../AddressContext";
import { CreateBuildingForm } from "../Forms";


function BuildingsList() {
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
            notify('Nowy Budynek utworzony!', 'success');
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [
        notify,
        reloadMap,
        load,
        urlParams,
    ]);


    const renderedBuildings = React.useMemo(() => {
        if (buildings && buildings.length > 0) {

            return buildings?.map(item => <ScrollableListItem key={item.id}
                primary={`Budynek ${item.name}`}
                link={`./${item.address}/buildings/${item.id}`}
            />)
        } else {
            return <EmptyScrollableListItem text="Aktualnie brak budynków dla adresu."/>
        }
    }, [buildings]);


    return (
        <>
            <CreateBuildingForm
                open={createBuildingModalOpen}
                onClose={() => setCreateBuildingModalOpen(false)}
                handleCreateBuilding={createBuilding}
            />

            <Tip text='To jest lista budynków pod tym adresem.' priority={10}>
                <SmallCard title='Budynki pod adresem'>
                    <ScrollableList
                        onAddItem={() => setCreateBuildingModalOpen(true)}
                    >
                        {renderedBuildings}
                    </ScrollableList>
                </SmallCard>
            </Tip>
            <br />
        </>
    );
}

export default React.memo(BuildingsList);