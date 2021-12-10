


class StorageService {

    private id: string = '';

    public setIdentity(value: string | number) {
        this.id = value.toString();
    }

    private codeName(name: string) {
        return btoa(encodeURI(name + this.id));
    }

    public save(name: string, value: any) {
        const str = JSON.stringify(value);
        localStorage.setItem(this.codeName(name), str);
    }

    public delete(name: string) {
        localStorage.removeItem(this.codeName(name));
    }

    public read(name: string) {
        const str = localStorage.getItem(this.codeName(name));
        if (!str) return null;

        try {
            return JSON.parse(str);
        } catch {
            return null;
        }
    }

}

export default new StorageService();