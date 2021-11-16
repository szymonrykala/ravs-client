import Address from "../../../../models/Address";
import Building from "../../../../models/Building";
import { UpdateAddressParams } from "../../../../services/AddressService";
import { APIResponse, LogsQueryParams } from "../../../../services/interfaces";



export default interface AddressContextValue {
    address: Address,
    getLogs: (queryParms: LogsQueryParams) => Promise<APIResponse | undefined>,
    getChartsData: (query: any) => Promise<APIResponse>,
    deleteAddress: () => Promise<void>,
    getBuildingsInAddress: () => Promise<Building[]>,
    updateAddress: (data: UpdateAddressParams) => Promise<boolean>,
}