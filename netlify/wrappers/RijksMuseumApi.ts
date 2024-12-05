import { ArtObject, RijksMuseumApi } from '../../types/RijksMuseumApi';
export interface WrapperParams {
    page?: number;
    itemPerPage?: number;
    search?: string;
}


class RijksMuseumApiWrapper {
    private apiKey: string = process.env.VITE_API_RIJKS || '';
    private endpoint: string = 'https://www.rijksmuseum.nl/api/en/collection';
    constructor(private api: RijksMuseumApi | null = null) {}

    static async load(opts:WrapperParams) {
        const api = new RijksMuseumApiWrapper();
        await api.fetchApi(opts);
        return api;
    }

    public async fetchApi(opts:WrapperParams): Promise<void> {
        let link = `${this.endpoint}?key=${this.apiKey}`;
        if (opts.page) {
            link += `&p=${opts.page}`;
        }
        if (opts.itemPerPage) {
            link += `&ps=${opts.itemPerPage}`;
        }
        if (opts.search) {
            link += `&q=${opts.search}`;
        }
        const response = await fetch(link);
        this.api = await response.json();
    }

    private ensureApiLoaded(): void {
        if (!this.api) {
            throw new Error('API is not loaded');
        }
    }

    public getArtObjects(): ArtObject[] {
        this.ensureApiLoaded();
        return this.api!.artObjects;
    }

    public getArtObject(id: string): ArtObject | undefined {
        this.ensureApiLoaded();
        return this.api!.artObjects.find((artObject) => artObject.id === id);
    }

    

}

export default RijksMuseumApiWrapper;
