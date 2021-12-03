import React from "react";
import { AccessContextValue } from ".";
import useNotification from "../../../../contexts/NotificationContext/useNotification";
import Access from "../../../../models/Access";
import AccessService, { AccessCreateParams, AccessUpdateParams } from "../../../../services/AccessService";
import { LogsQueryParams } from "../../../../services/LogService";
import { EditForm } from "../Forms";



export const accessContext: any = React.createContext(null);


interface AccessContextProviderProps {
    children: React.ReactNode | React.ReactNode[]
}


export default function AccessContextProvider(props: AccessContextProviderProps) {
    const notify = useNotification();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [selectedAccessId, setSelectedAccessId] = React.useState<number>();
    const [accessesList, setAccessesList] = React.useState<Access[]>();


    const load = React.useCallback(async () => {
        try {
            const resp = await AccessService.getAll();
            setAccessesList(resp.data as Access[]);
        } catch (err: any) {
            notify(err.description, 'error');
            setAccessesList([]);
        }
    }, [notify]);


    React.useEffect(() => {
        load();
    }, [load]);


    const updateAccess = React.useCallback(async (accessId: number, data: AccessUpdateParams) => {
        try {
            if (await AccessService.update(accessId, data)) {
                setAccessesList(old => {
                    if (old)
                        return old.map(access => {
                            if (access.id === accessId) {
                                access = {
                                    ...access,
                                    ...data
                                }
                            }
                            return access;
                        });

                });
                notify('Klasa dostępu została zaktualizowana', 'success');
            }
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [notify]);


    const deleteAccess = React.useCallback(async (id?: number) => {
        try {
            await AccessService.remove(id);

            setAccessesList(old => {
                if (!old) return;
                return old.filter(access => access.id !== id);
            });

            notify('Klasa dostępu została usunięta', 'success');
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [notify]);


    const createAccess = React.useCallback(async (data: AccessCreateParams) => {
        try {
            const resp = await AccessService.create(data);

            setAccessesList(old => {
                old?.unshift({ ...data, id: resp.data } as Access)
                return Object.assign([], old);
            });

            notify('Klasa dostępu została utworzona', 'success');
            return true;
        } catch (err: any) {
            notify(err.description, 'error');
        }
        return false;
    }, [notify]);


    const selectedAccess = React.useMemo(() => {
        return accessesList?.find(({ id }) => id === selectedAccessId);
    }, [selectedAccessId, accessesList]);


    const openAccess = React.useCallback((id: number) => {
        setSelectedAccessId(id);
        setModalOpen(true);
    }, []);


    if (!accessesList) return null;

    return (
        <accessContext.Provider value={{
            accessesList,
            updateAccess,
            deleteAccess,
            createAccess,
            openAccess,
        } as AccessContextValue}>
            {props.children}
            {
                selectedAccess &&
                <EditForm
                    open={modalOpen}
                    onSubmit={updateAccess}
                    onClose={() => setModalOpen(false)}
                    access={selectedAccess}
                />
            }
        </accessContext.Provider>
    );
}