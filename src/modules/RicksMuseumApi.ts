import { ArtObject, RicksMuseumApi } from './../../types/RicksMuseumApi';
import RicksFile from '../../infosMockAPI.json';
class RicksMuseumApiWrapper {
    static File: RicksMuseumApi = RicksFile; 

    static getRicksMuseumApi(): RicksMuseumApi {
        return RicksMuseumApiWrapper.File;
    }

    static getArtObject(id: string): ArtObject | undefined {
        return RicksMuseumApiWrapper.File.artObjects.find((item) => item.id === id);
    }

    static getArtObjects(): ArtObject[] {
        return RicksMuseumApiWrapper.File.artObjects;
    }

    static getArtObjectsByArtist(artist: string): ArtObject[] {
        return RicksMuseumApiWrapper.File.artObjects.filter((item) => item.principalOrFirstMaker === artist);
    }

    static getArtObjectsByTitle(title: string): ArtObject[] {
        return RicksMuseumApiWrapper.File.artObjects.filter((item) => item.title === title);
    }
}

export default RicksMuseumApiWrapper;