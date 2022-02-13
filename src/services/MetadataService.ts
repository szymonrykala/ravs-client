import Metadata, { FavouriteBuilding, FavouriteRoom } from "../models/Metadata";
import StorageService from "./StorageService";
import UserService from "./UserService";




class MetadataService {
    private STORAGE_NAME = 'user-metadata';

    private data: Metadata;
    private _userId: number | undefined;


    constructor() {
        this.data = {
            notes: '',
            favourites: []
        };
    }

    private async save(): Promise<void> {
        StorageService.save(this.STORAGE_NAME, this.data);

        if (!this._userId) return;

        UserService.setPath({ userId: this._userId?.toString() });
        try {
            await UserService.update({
                metadata: this.data
            });
        } catch (err: any) { console.error(err) }
    }

    public set userId(id: number) {
        this._userId = id;
        this.data = StorageService.read(this.STORAGE_NAME) ?? {
            notes: '',
            favourites: []
        };
    }

    public set metadata(value: Metadata) {
        this.data = {
            ...this.data,
            ...value
        };
    }

    public get notes() {
        return this.data.notes ?? '';
    }

    public get favourites() {
        return this.data.favourites ?? [];
    }

    public set notes(value: string) {
        this.data.notes = value;
        this.save();
    }

    public addFavourite(item: FavouriteBuilding | FavouriteRoom): void {
        this.data.favourites?.push(item);
        this.data.favourites?.sort((a, b) => {
            if (a.type >= b.type) {
                if (a.type === b.type) {
                    return a.name > b.name ? 1 : -1;
                }
                return 1;
            }
            return -1;
        });
        console.log(this.data);
        this.save();
    }

    public isFavourite(item: FavouriteBuilding | FavouriteRoom): boolean {
        return Boolean(this.data.favourites?.find(({ id, type }) => (type === item.type && id === item.id)));
    }

    public removeFavourite(item: FavouriteBuilding | FavouriteRoom): void {
        this.data.favourites = this.data.favourites?.filter(({ id, type }) => id + type !== item.id + item.type)
        this.save();
    }
}


export default new MetadataService();