export interface RicksMuseumApi {
    elapsedMilliseconds: number;
    count: number;
    countFacets: CountFacets;
    artObjects: ArtObject[];
    facets: Facet[];
}

export interface CountFacets {
    hasimage: number;
    ondisplay: number;
}

export interface ArtObject {
    links: Links;
    id: string;
    objectNumber: string;
    title: string;
    hasImage: boolean;
    principalOrFirstMaker: string;
    longTitle: string;
    showImage: boolean;
    permitDownload: boolean;
    webImage: Image;
    headerImage: Image;
    productionPlaces: string[];
}

export interface Links {
    self: string;
    web: string;
}

export interface Image {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
}

export interface Facet {
    facets: FacetItem[];
    name: string;
    otherTerms: number;
    prettyName: number;
}

export interface FacetItem {
    key: string;
    value: number;
}
