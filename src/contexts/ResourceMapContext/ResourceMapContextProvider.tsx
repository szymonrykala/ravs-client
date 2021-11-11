import React from "react";
import useSession from "../../auth/useSession";
import AddressMap from "../../models/AddressMap";
import AddressService from "../../services/AddressService";
import useNotification from "../NotificationContext/useNotification";
import { ResourceMapContextValue } from "./ResourceMapOCntextValue";




export const resourceMapContext = React.createContext<ResourceMapContextValue>({
    resourceMap: [],
    reloadMap: () => { },
    getRoomLink: (roomId: number) => '',
    getBuildingLink: (bildingId: number) => '',
    allRooms: []
});


interface ResourceMapContextProviderProps {
    children?: React.ReactNode[]
}

export default function ResourceMapContextProvider(props: ResourceMapContextProviderProps) {
    const [resourceMap, setResources] = React.useState<AddressMap[]>([]);
    const { user } = useSession();
    const notify = useNotification();

    const loadResourceMap = React.useCallback(async (): Promise<void> => {
        try {
            const resp = await AddressService.getResourcesMap();
            resp?.data && setResources(resp.data as any);
        } catch (err: any) {
            notify(err.description, "error");
        }
    }, [notify]);

    const reloadMap = (): void => {
        loadResourceMap();
    }

    React.useEffect(() => {
        user && loadResourceMap();
    }, [user, loadResourceMap]);


    const getRoomLink = React.useCallback((roomId: number): string => {
        return '/app' + resourceMap.map(addr => addr.buildings.map(bld => bld.rooms))
            .flat(2)
            .find(item => item.id === roomId)
            ?.href ?? '';
    }, [resourceMap]);

    const allRooms = React.useMemo(() => {
        return resourceMap.map(addr => addr.buildings.map(bld => bld.rooms)).flat(2)
    }, [resourceMap]);


    const getBuildingLink = React.useCallback((buildingId: number): string => {
        return '/app' + resourceMap.map(addr => addr.buildings)
            .flat(2)
            .find(item => item.id === buildingId)
            ?.href ?? '';
    }, [resourceMap]);


    return (
        <resourceMapContext.Provider value={{ resourceMap, reloadMap, allRooms, getRoomLink, getBuildingLink }}>
            {props.children}
        </resourceMapContext.Provider>
    );
}