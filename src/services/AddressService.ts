import AddressMap from "../models/AddressMap";
import Service from "./Service";



class AddressService extends Service {

    async getResourcesMap() {
        const resp = await this.get('/addresses/resources');
        return resp.data as AddressMap[];
    }
}


export default new AddressService();