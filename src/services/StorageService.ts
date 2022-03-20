

/**
 * provides unified way to work with local storage in app
 */
class StorageService {

    private id: string = '';

    public setIdentity(value: string | number) {
        this.id = value.toString();
    }

    /**
     * encodes name of the variable
     * @param name 
     * @returns 
     */
    private codeName(name: string) {
        return btoa(encodeURI(name + this.id));
    }

    public save(name: string, value: any): void {
        const str = JSON.stringify(value);
        localStorage.setItem(this.codeName(name), str);
    }

    public delete(name: string):void {
        localStorage.removeItem(this.codeName(name));
    }

    /**
     * read params from local storage
     * @param name 
     * @returns 
     */
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