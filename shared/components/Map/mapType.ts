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

export declare type Libraries = ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[];