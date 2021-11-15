import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import { LogsQueryParams } from "../../../../services/interfaces";
import paths from "../../../../shared/path";
import AddressService, { AddressViewParams } from "../../../../services/AddressService";
import AddressContextValue from "./AddressContextValue";
import Address from "../../../../models/Address";
import Building from "../../../../models/Building";



interface AddressContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}


export const addressContext: any = React.createContext(null);


export default function AddressContextProvider(props: AddressContextProviderProps) {
    const notify = useNotification();
    const urlParams = useParams<AddressViewParams>();

    const [address, setAddress] = React.useState<Address>();


    React.useLayoutEffect(() => {
        AddressService.setPath(urlParams);
    }, [urlParams.addressId])


    const getAddress = React.useCallback(async () => {
        const resp = await AddressService.getCurrentOne();
        setAddress(resp.data as Address);
    }, [urlParams.addressId]);


    React.useEffect(() => {
        getAddress();
    }, [getAddress]);


    const getBuildingsInAddress = React.useCallback(async () => {
        try {
            const resp = await AddressService.getBuildings();
            return resp.data as Building[];
        } catch (err: any) {
            return [];
        }
    }, [urlParams.addressId]);


    const getLogs = React.useCallback(async (queryParams: LogsQueryParams) => {
        try {
            return await AddressService.getLogs(queryParams);
        } catch (err: any) {
            notify(err.description, 'error');
        }
    }, [notify, urlParams.addressId]);


    const getChartsData = React.useCallback(async (query: any) => {
        return AddressService.getChartsData(query)
    }, [urlParams.addressId]);


    const deleteAddress = React.useCallback(async () => {
        try {
            await AddressService.remove();
            notify("Adres został usunięty", 'success', () => <Redirect to={paths.HOME} />);
        } catch (err: any) {
            address &&
                notify(err.description, 'error');
        }
    }, [notify, address]);


    if (!Boolean(address)) return null;

    return (
        <addressContext.Provider value={{
            address,
            getLogs,
            getChartsData,
            deleteAddress,
            getBuildingsInAddress
        } as AddressContextValue}>

            {props.children}

        </addressContext.Provider>
    );
}