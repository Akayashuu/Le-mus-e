import { RijksMuseumApiDetails } from './../../types/RijksMuseumApiDetails';
class RijksMuseumDetailWrapper {
    private apiKey: string = process.env.VITE_API_RIJKS || '';
    private endpoint: string = 'https://www.rijksmuseum.nl/api/en/collection';
    private details!: RijksMuseumApiDetails;
    constructor(private key: string) {}

    static async load(objectNumber: string) {
        const wrapper = new RijksMuseumDetailWrapper(objectNumber);
        await wrapper.fetchApi();
        return wrapper;
    }

    public async fetchApi(): Promise<void> {
        const link = `${this.endpoint}/${this.key}?key=${this.apiKey}`;
        const response = await fetch(link);
        this.details = await response.json();
    }

    private ensureApiLoaded(): void {
        if (!this.details) {
            throw new Error('API is not loaded');
        }
    }

    public getDetails(): RijksMuseumApiDetails {
        this.ensureApiLoaded();
        return this.details;
    }
}

export default RijksMuseumDetailWrapper;
