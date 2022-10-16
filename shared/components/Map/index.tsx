import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { GoogleMap, InfoWindowF as InfoWindow, MarkerF as Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import {
    Libraries,
    TLocation,
    TMapParams,
} from '@shared/components/Map/mapType';
import Loader from '../Loader';
import Search from '../Search';
import { Flex, MinHeight, ScrollView, Space } from '@shared/utils/styles';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// variables
const libraries: Libraries = ['places']; // required map libraries

const defaultLocationData: google.maps.LatLng | google.maps.LatLngLiteral = {
    lat: 25.276987,
    lng: 55.296249
};

const Map = ({
    width = '100%',
    height = '100vh',
    defaultLocation = defaultLocationData
}: TMapParams) => {
    // variables
    const defaultMapState: TDefaultMapState = {
        autocomplete: undefined,
        map: undefined,
        currentLocation: undefined,
        message: undefined,
    };

    // states
    const [mapSettings, setMapSettings] = useState<TDefaultMapState>(defaultMapState);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_TOKEN as string,
        libraries: libraries,
        language: 'en',
    });

    /**
     * on map load call this function for setup map instance
     * @return void
     */
    const onLoad = (map: google.maps.Map) => {
        setMapSettings((prev) => ({ ...prev, map }));
    }

    /**
     * reset state when component un mount
     * @return void
     */
    const onUnmount = (map: google.maps.Map) => {
        console.log('unmounted');

    };

    /**
     * when search box load call this function for updating autocomplete instance in map state
     * @param autocomplete: google.maps.places.SearchBox
     */
    const onAutocompleteLoad = (autocomplete: google.maps.places.SearchBox) => {
        setMapSettings((prev) => ({ ...prev, autocomplete }));
    };

    /**
     * get current location latitude and longitude from state
     * @returns
     */
    const currentLocation = useMemo((): google.maps.LatLng | google.maps.LatLngLiteral | undefined => {
        if (mapSettings.currentLocation) {
            return {
                lat: mapSettings.currentLocation.lat as number,
                lng: mapSettings.currentLocation.lng as number,
            };
        }

        return undefined;
    }, [mapSettings.currentLocation]);

    /**
     * when place select in search result call this function for update location and info window data
     * @return void
     */
    const onPlaceChanged = () => {
        if (mapSettings.autocomplete) {
            const places = mapSettings.autocomplete.getPlaces();
            const place = places && places[0] || null;

            if (place && place.geometry && place.geometry.location) {
                // offset map center for better visibility to infoWindow
                setTimeout(() => {
                    mapSettings?.map?.panBy(0, -350)
                }, 100);

                setMapSettings((prev) => ({
                    ...prev,
                    currentLocation: {
                        place: place,
                        lat: place.geometry?.location?.lat(),
                        lng: place.geometry?.location?.lng(),
                    }
                }));
            }
        }
    };

    return isLoaded ? (
        <MapStyled>
            <GoogleMap
                mapContainerStyle={{
                    width,
                    height,
                }}
                center={currentLocation || defaultLocation}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    mapTypeControl: false,
                    fullscreenControlOptions: {
                        position: 8.0,
                    },
                }}
            >
                <>
                    <Search onAutocompleteLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged} />

                    {currentLocation && mapSettings.currentLocation && <Marker position={currentLocation}>
                        {mapSettings.currentLocation.place && <InfoWindow position={currentLocation}>
                            <MinHeight size={10}>
                                <Space size={1}>
                                    <Typography variant="h6" gutterBottom>
                                        <Flex justifyContent={'center'} alignItems={'center'}>
                                            <LocationOnIcon /> {mapSettings.currentLocation.place.formatted_address}
                                        </Flex>
                                    </Typography>

                                    <Space top={1}>
                                        {mapSettings.currentLocation.place.photos?.length && <img src={mapSettings.currentLocation.place.photos[0].getUrl()} loading="lazy" />}
                                    </Space>
                                </Space>
                            </MinHeight>
                        </InfoWindow>}
                    </Marker>}
                </>
            </GoogleMap>
        </MapStyled>
    ) : (
        <Loader />
    );
};

// types
type TDefaultMapState = {
    autocomplete: google.maps.places.SearchBox | undefined;
    map: google.maps.Map | undefined;
    currentLocation: TLocation | undefined;
    message: string | undefined;
};

// styles
const MapStyled = styled.div`
    .map-container,
    .map-loading-container {
        width: 100%;
        min-height: 585px;
        background-color: #f1f1f1;
    }
    .map-loading-container {
        font-size: 50px;
    }
    .gm-ui-hover-effect {
        padding: 16px 46px !important;
    }
    .ant-input {
        border-color: none !important;
        box-shadow: none !important;
        border-color: none !important;
    }
    .map-search-container {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
        background-color: #ffffff;
        padding: 20px;
        position: relative;
        margin: 20px;
        border-radius: 8px;
        max-width: 50vw;
        margin-top: 25px;
    }
    .gm-style-iw {
        button.gm-ui-hover-effect {
            visibility: hidden;
        }
        padding: 10px;
        img {
            width: 400px;
            border-radius: 8px;
        }
    }
`;

/**
 * export MapContainer to use override map related styles
 */
export const MapContainer = styled.div`
    .ant-form-item-explain {
        margin-top: 1rem;
        background-color: #ff4d4e14;
        padding: 17px 20px;
        border: 1px solid #ff4d4e38;
    }
`;

export default Map;
