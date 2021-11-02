import React from "react";
import useSession from "../../auth/useSession";
import AddressMap from "../../models/AddressMap";
import AddressService from "../../services/AddressService";
import useNotification from "../NotificationContext/useNotification";



export interface ResourceMapContext {
    resourceMap: AddressMap[],
    reloadMap: () => void
}


export const resourceMapContext = React.createContext<ResourceMapContext>({
    resourceMap: [],
    reloadMap: () => { }
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


    return (
        <resourceMapContext.Provider value={{ resourceMap, reloadMap }}>
            {props.children}
        </resourceMapContext.Provider>
    );
}