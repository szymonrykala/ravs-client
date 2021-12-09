import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { DetailedBuilding } from "../../../../models/Building";
import BuildingService, { BuildingUpdateParams, BuildingViewParams } from "../../../../services/BuildingService";
import BuildingContextValue from "./BuildingContextValue";
import { dynamicPaths } from "../../../../shared/path";
import Room from "../../../../models/Room";
import { useResourceMap } from "../../../../contexts/ResourceMapContext";


interface BuildingContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}


export const buildingContext: any = React.createContext(null);


export default function BuildingContextProvider(props: BuildingContextProviderProps) {
    const notify = useNotification();
    const { reloadMap } = useResourceMap();
    const urlParams = useParams<BuildingViewParams>();

    const [building, setBuilding] = React.useState<DetailedBuilding>();


    React.useLayoutEffect(() => {
        BuildingService.setPath(urlParams);
    }, [urlParams])


    const getBuilding = React.useCallback(async () => {
        const resp = await BuildingService.getCurrentOne();
        setBuilding(resp.data as DetailedBuilding);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams]);


    React.useEffect(() => {
        getBuilding();
    }, [getBuilding]);


    const getRoomsInBuilding = React.useCallback(async () => {
        try {
            const resp = await BuildingService.getRoomsInBuilding();
            return resp.data as Room[];
        } catch (err: any) {
            return [];
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams])


    const updateBuilding = React.useCallback(async (data: BuildingUpdateParams) => {
        try {
            if (await BuildingService.update(data)) {

                if (
                    building &&
                    (
                        ('addressId' in data && building.address.id !== data.addressId)
                        || ('name' in data)
                    )
                ) {
                    reloadMap();
                }

                setBuilding((old) => {
                    old && Object.keys(data).forEach((key) => {
                        switch (key) {
                            case 'addressId':
                                old.address.id = Number(data[key]);
                                break;
                            default:
                                old[key] = data[key];
                                break;
                        }
                    });
                    return Object.assign({}, old);
                })
                notify('Bydynek zaktualizowany', 'success');
                return true;
            }
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [notify, building, reloadMap]);


    const deleteBuilding = React.useCallback(async () => {
        try {
            await BuildingService.remove();
            building && notify("Budynek usunięty", 'success', () => <Redirect to={dynamicPaths.toAddress(building.address.id)} />);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify, building]);


    if (!Boolean(building)) return null;

    return (
        <buildingContext.Provider value={{
            building,
            deleteBuilding,
            getRoomsInBuilding,
            updateBuilding,
        } as BuildingContextValue}>

            {props.children}

        </buildingContext.Provider>
    );
}