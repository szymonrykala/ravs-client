import React from "react";
import { Redirect, useParams } from "react-router-dom";
import useNotification from "../../../../../contexts/NotificationContext/useNotification";
import paths from "../../../../../shared/path";
import AddressService, { AddressViewParams, UpdateAddressParams } from "../../../../../services/AddressService";
import AddressContextValue from "./AddressContextValue";
import Address from "../../../../../models/Address";
import Building from "../../../../../models/Building";
import { useResourceMap } from "../../../../../contexts/ResourceMapContext";
import Loading from "../../../../../shared/components/Loading";



interface AddressContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}


export const addressContext: any = React.createContext(null);


export default function AddressContextProvider(props: AddressContextProviderProps) {
    const notify = useNotification();
    const { reloadMap } = useResourceMap();

    const urlParams = useParams<AddressViewParams>();

    const [address, setAddress] = React.useState<Address>();


    React.useLayoutEffect(() => {
        AddressService.setPath(urlParams);
    }, [urlParams])


    const getAddress = React.useCallback(async () => {
        const resp = await AddressService.getCurrentOne();
        setAddress(resp.data as Address);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams]);


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams]);


    const updateAddress = React.useCallback(async (data: UpdateAddressParams) => {
        try {
            await AddressService.update(data)

            setAddress(old => {
                return {
                    ...old,
                    ...data as Address
                }
            });

            reloadMap()

            notify('Adres zaktualizowany', 'success');
            return true;

        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [
        notify,
        reloadMap,
    ])



    const deleteAddress = React.useCallback(async () => {
        try {
            await AddressService.remove();
            reloadMap();
            notify("Adres został usunięty", 'success', () => <Redirect to={paths.HOME} />);
        } catch (err: any) {
            address &&
                notify(err.description, 'error');
        }
    }, [
        notify,
        address,
        reloadMap,
    ]);


    if (!Boolean(address)) return <Loading />;

    return (
        <addressContext.Provider value={{
            address,
            deleteAddress,
            getBuildingsInAddress,
            updateAddress
        } as AddressContextValue}>

            {props.children}

        </addressContext.Provider>
    );
}