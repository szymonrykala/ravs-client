import React from "react";
import useSession from "../../auth/useSession";
import AddressMap from "../../models/AddressMap";
import useTrigger from "../../pages/protected/hooks/useTrigger";
import AddressService from "../../services/AddressService";
import useNotification from "../NotificationContext/useNotification";
import ResourceMapContextValue from "./ResourceMapContextValue";




export const resourceMapContext: any = React.createContext(null);


interface ResourceMapContextProviderProps {
    children?: React.ReactNode[]
}


export default function ResourceMapContextProvider(props: ResourceMapContextProviderProps) {
    const [resourceMap, setResources] = React.useState<AddressMap[]>([]);
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const refresh = useTrigger(300_000);

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
        setLoaded(true);
    }, [
        user,
        loadResourceMap,
        refresh
    ]);


    const getRoomLink = React.useCallback((roomId: number): string => {
        return '/app' + resourceMap.map(addr => addr.buildings.map(bld => bld.rooms))
            .flat(2)
            .find(item => item.id === roomId)
            ?.href ?? '';
    }, [resourceMap]);


    const allRooms = React.useMemo(() => {
        return resourceMap.map(addr => addr.buildings.map(bld => bld.rooms)).flat(2)
    }, [resourceMap]);


    const allBuildings = React.useMemo(() => {
        return resourceMap.map(addr => addr.buildings.map(({ name, href, id }) => ({ name, href, id }))).flat(2);
    }, [resourceMap]);


    const allAddresses = React.useMemo(() => {
        return resourceMap.map(({ name, href, id }) => ({ name, href, id }));
    }, [resourceMap]);


    const getBuildingLink = React.useCallback((buildingId: number): string => {
        return '/app' + resourceMap.map(addr => addr.buildings)
            .flat(2)
            .find(item => item.id === buildingId)
            ?.href ?? '';
    }, [resourceMap]);


    if (loaded === false) return null;

    return (
        <resourceMapContext.Provider value={{
            resourceMap,
            reloadMap,
            allRooms,
            getRoomLink,
            getBuildingLink,
            allAddresses,
            allBuildings,
        } as ResourceMapContextValue}>
            {props.children}
        </resourceMapContext.Provider>
    );
}