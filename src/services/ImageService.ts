import Image from "../models/Image";
import Service from "./Service";



class ImageService extends Service {

    getLink(image?: Image): string {
        return this._BASE_URL + '/images/' + image?.id;
    }

    // async remove(image: Image) {
    //     return this.delete(`/images/${image.id}`);
    // }
}


export default new ImageService();