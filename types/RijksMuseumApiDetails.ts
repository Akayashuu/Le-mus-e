export interface RijksMuseumApiDetails {
    elapsedMilliseconds: number;
    artObject: ArtObject;
    artObjectPage: ArtObjectPage;
}

export interface ArtObject {
    links: Links;
    id: string;
    priref: string;
    objectNumber: string;
    language: string;
    title: string;
    copyrightHolder: string | null;
    webImage: WebImage;
    colors: Color[];
    colorsWithNormalization: ColorWithNormalization[];
    normalizedColors: NormalizedColor[];
    normalized32Colors: NormalizedColor[];
    materialsThesaurus: unknown[];
    techniquesThesaurus: unknown[];
    productionPlacesThesaurus: unknown[];
    titles: string[];
    description: string;
    labelText: string | null;
    objectTypes: string[];
    objectCollection: string[];
    makers: unknown[];
    principalMakers: PrincipalMaker[];
    plaqueDescriptionDutch: string;
    plaqueDescriptionEnglish: string;
    principalMaker: string;
    artistRole: string | null;
    associations: unknown[];
    acquisition: Acquisition;
    exhibitions: unknown[];
    materials: string[];
    techniques: string[];
    productionPlaces: unknown[];
    dating: Dating;
    classification: Classification;
    hasImage: boolean;
    historicalPersons: unknown[];
    inscriptions: unknown[];
    documentation: string[];
    catRefRPK: unknown[];
    principalOrFirstMaker: string;
    dimensions: Dimension[];
    physicalProperties: unknown[];
    physicalMedium: string;
    longTitle: string;
    subTitle: string;
    scLabelLine: string;
    label: Label;
    showImage: boolean;
    location: string;
}

export interface Links {
    search: string;
}

export interface WebImage {
    guid: string;
    offsetPercentageX: number;
    offsetPercentageY: number;
    width: number;
    height: number;
    url: string;
}

export interface Color {
    percentage: number;
    hex: string;
}

export interface ColorWithNormalization {
    originalHex: string;
    normalizedHex: string;
}

export interface NormalizedColor {
    percentage: number;
    hex: string;
}

export interface PrincipalMaker {
    name: string;
    unFixedName: string;
    placeOfBirth: string | null;
    dateOfBirth: string | null;
    dateOfBirthPrecision: string | null;
    dateOfDeath: string | null;
    dateOfDeathPrecision: string | null;
    placeOfDeath: string | null;
    occupation: string[];
    roles: string[];
    nationality: string;
    biography: string | null;
    productionPlaces: unknown[];
    qualification: string | null;
    labelDesc: string;
}

export interface Acquisition {
    method: string;
    date: string;
    creditLine: string;
}

export interface Dating {
    presentingDate: string;
    sortingDate: number;
    period: number;
    yearEarly: number;
    yearLate: number;
}

export interface Classification {
    iconClassIdentifier: string[];
    iconClassDescription: string[];
    motifs: unknown[];
    events: string[];
    periods: unknown[];
    places: unknown[];
    people: unknown[];
    objectNumbers: string[];
}

export interface Dimension {
    unit: string;
    type: string;
    precision: string | null;
    part: string;
    value: string;
}

export interface Label {
    title: string;
    makerLine: string;
    description: string;
    notes: string;
    date: string;
}

export interface ArtObjectPage {
    id: string;
    similarPages: unknown[];
    lang: string;
    objectNumber: string;
    tags: unknown[];
    plaqueDescription: string;
    audioFile1: string | null;
    audioFileLabel1: string | null;
    audioFileLabel2: string | null;
    createdOn: string;
    updatedOn: string;
    adlibOverrides: AdlibOverrides;
}

export interface AdlibOverrides {
    titel: string | null;
    maker: string | null;
    etiketText: string | null;
}


