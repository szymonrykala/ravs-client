import React from "react";
import useSession from "../../auth/useSession";
import AddressMap, { MapItem } from "../../models/AddressMap";
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
    children?: React.ReactNodeArray
}

export default function ResourceMapContextProvider(props: ResourceMapContextProviderProps) {
    const [resourceMap, setResources] = React.useState<AddressMap[]>([]);
    const { user } = useSession();
    const notify = useNotification();

    const loadResourceMap = async (): Promise<void> => {
        try {
            const resp = await AddressService.getResourcesMap();
            resp?.data && setResources(resp.data as any);
        } catch (err: any) {
            notify(err.description, "error");
        }
    }

    const reloadMap = (): void => {
        loadResourceMap();
    }

    React.useEffect(() => {
        user && loadResourceMap();
    }, [user]);

    const getRoomLink = (roomId: number): string =>
        '/app' + resourceMap.map(addr => addr.buildings.map(bld => bld.rooms))
            .flat(2)
            .find(item => item.id === roomId)
            ?.href ?? '';

    const allRooms = React.useMemo(() =>
        resourceMap.map(addr => addr.buildings.map(bld => bld.rooms)).flat(2)
        , [resourceMap]);

    const getBuildingLink = (buildingId: number): string =>
        '/app' + resourceMap.map(addr => addr.buildings)
            .flat(2)
            .find(item => item.id === buildingId)
            ?.href ?? ''


    return (
        <resourceMapContext.Provider value={{ resourceMap, reloadMap, allRooms, getRoomLink, getBuildingLink }}>
            {props.children}
        </resourceMapContext.Provider>
    );
}