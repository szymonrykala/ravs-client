import Address from "../../../../models/Address";
import Building from "../../../../models/Building";
import { UpdateAddressParams } from "../../../../services/AddressService";
import { APIResponse } from "../../../../services/interfaces";



export default interface AddressContextValue {
    address: Address,
    getChartsData: (query: any) => Promise<APIResponse>,
    deleteAddress: () => Promise<void>,
    getBuildingsInAddress: () => Promise<Building[]>,
    updateAddress: (data: UpdateAddressParams) => Promise<boolean>,
}