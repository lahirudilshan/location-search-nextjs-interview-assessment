export type TLocation = {
    lat?: number;
    lng?: number;
    place?: google.maps.places.PlaceResult;
}

export type TMapParams = {
    width?: string;
    height?: string;
    defaultLocation?: google.maps.LatLng | google.maps.LatLngLiteral;
}

export type TDefaultMapState = {
    autocomplete: google.maps.places.SearchBox | undefined;
    map: google.maps.Map | undefined;
    currentLocation: TLocation | undefined;
    message: string | undefined;
};

export declare type Libraries = ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[];