import Image from "../models/Image";
import APIServiceError from "./APIServiceError";
import { BuildingViewParams } from "./BuildingService";
import { APIResponse } from "./interfaces";
import { RoomViewParams } from "./RoomService";
import Service, { ResponseData } from "./Service";
import { UserViewParams } from "./UserService";



class ImageService extends Service {

    private async sendImage(endpoint: string, formBody: FormData) {
        const resp = await fetch(
            this._BASE_URL + endpoint,
            {
                method: "POST",
                cache: 'no-cache',
                mode: 'cors',
                body: formBody,
                headers: {
                    'Authorization': this.authToken,
                }
            }
        );

        const data = await resp.json() as ResponseData;
        console.debug(data);

        if (!resp.ok) {
            console.error(`${resp.status}\t${data?.error?.type}\t${data?.error?.description}`);
            throw new APIServiceError(data);
        }

        return data as APIResponse;
    }

    public getLink(image?: Image): string {
        if (image?.url.includes('http')) return image.url;

        return this._BASE_URL.slice(0, this._BASE_URL.length - 3) + image?.url;
    }

    public upload(
        urlParams: (UserViewParams | BuildingViewParams | RoomViewParams),
        image: Blob
    ) {
        const formData = new FormData();
        formData.append(
            'file',
            image
        );
        return this.sendImage(this.preparePath(urlParams) + '/image', formData);
    }

    public remove(urlParams: (UserViewParams | BuildingViewParams | RoomViewParams)) {
        return this.delete(this.preparePath(urlParams) + '/image');
    }
}


export default new ImageService();