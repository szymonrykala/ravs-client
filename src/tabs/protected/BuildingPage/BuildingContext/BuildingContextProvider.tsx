import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { DetailedBuilding } from "../../../../models/Building";
import BuildingService, { BuildingViewParams } from "../../../../services/BuildingService";
import Image from '../../../../models/Image';
import { LogsQueryParams } from "../../../../services/interfaces";
import BuildingContextValue from "./BuildingContextValue";
import { dynamicPaths } from "../../../../shared/path";


interface BuildingContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}


export const buildingContext: any = React.createContext(null);


export default function BuildingContextProvider(props: BuildingContextProviderProps) {
    const notify = useNotification();
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


    const getLogs = React.useCallback(async (queryParams: LogsQueryParams) => {
        try {
            return await BuildingService.getLogs(queryParams);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify, urlParams.buildingId]);


    const getChartsData = React.useCallback(async (query: any) => {
        return BuildingService.getChartsData(query)
    }, [urlParams.buildingId]);


    const deleteBuilding = React.useCallback(async () => {
        try {
            await BuildingService.remove();
            building && notify("Budynek usunięty", 'success', () => <Redirect to={dynamicPaths.toAddress(building.address.id)} />);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, []);


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
    }, []);


    if (!Boolean(building)) return null;

    return (
        <buildingContext.Provider value={{
            building,
            getLogs,
            getChartsData,
            uploadImage,
            deleteImage,
            deleteBuilding
        } as BuildingContextValue}>

            {props.children}

        </buildingContext.Provider>
    );
}