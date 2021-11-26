import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { DetailedBuilding } from "../../../../models/Building";
import BuildingService, { BuildingUpdateParams, BuildingViewParams } from "../../../../services/BuildingService";
import Image from '../../../../models/Image';
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
    }, [urlParams.buildingId])


    const getBuilding = React.useCallback(async () => {
        const resp = await BuildingService.getCurrentOne();
        setBuilding(resp.data as DetailedBuilding);
    }, [urlParams.buildingId]);


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
    }, [urlParams.buildingId])


    const getChartsData = React.useCallback(async (query: any) => {
        return BuildingService.getChartsData(query)
    }, [urlParams.buildingId]);


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


    const uploadImage = React.useCallback(async (image: Blob) => {
        try {
            const resp = await BuildingService.uploadImage(image);
            setBuilding(old => {
                if (old && resp.data)
                    return {
                        ...old,
                        image: {
                            ...old.image,
                            id: Number(resp.data)
                        }
                    };
            });
            notify("Pomyślnie zmieniono obraz!", 'success');
            return resp;
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify]);


    const deleteImage = React.useCallback(async (image: Image) => {
        await BuildingService.removeImage(image);
        reloadMap()
    }, [reloadMap]);


    if (!Boolean(building)) return null;

    return (
        <buildingContext.Provider value={{
            building,
            getChartsData,
            uploadImage,
            deleteImage,
            deleteBuilding,
            getRoomsInBuilding,
            updateBuilding,
        } as BuildingContextValue}>

            {props.children}

        </buildingContext.Provider>
    );
}