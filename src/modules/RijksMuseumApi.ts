import { ArtObject, RijksMuseumApi } from '../../types/RijksMuseumApi';

interface WrapperParams {
    page?: number;
    itemPerPage?: number;
}


class RijksMuseumApiWrapper {
    private apiKey: string = '8QQ9KcWz';
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

    public getArtObjectsByPage(page: number, itemPerPage: number): ArtObject[] {
        this.ensureApiLoaded();
        const start = (page - 1) * itemPerPage;
        const end = page * itemPerPage;
        return this.api!.artObjects.slice(start, end);
    }

    public getTotalPage(itemPerPage: number): number {
        this.ensureApiLoaded();
        return Math.ceil(this.api!.artObjects.length / itemPerPage);
    }

    public getArtObjectsByMaker(maker: string): ArtObject[] {
        this.ensureApiLoaded();
        return this.api!.artObjects.filter(
            (artObject) => artObject.principalOrFirstMaker === maker
        );
    }
}

export default RijksMuseumApiWrapper;
