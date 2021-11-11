import Service from "./Service";



class AddressService extends Service {

    async getResourcesMap() {
        return this.get('/addresses/resources');
    }
}


export default new AddressService();