import React, { useMemo, useState } from 'react';
import { GoogleMap, InfoWindowF as InfoWindow, MarkerF as Marker, useJsApiLoader } from '@react-google-maps/api';
import { Libraries, TDefaultMapState, TMapParams } from '@shared/components/map/type';
import { Flex, Space } from '@shared/utils/styles';
import { Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Search from '../search';
import Loader from '@shared/components/loader';
import { MapContainer } from '@shared/components/map/style';

// variables
const libraries: Libraries = ['places']; // required map libraries

const defaultLocationData: google.maps.LatLng | google.maps.LatLngLiteral = {
    lat: 6.927079,
    lng: 79.861244
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

    // hooks
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_TOKEN as string,
        libraries: libraries,
        language: 'en',
    });

    // states
    const [mapSettings, setMapSettings] = useState<TDefaultMapState>(defaultMapState);

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
    const onUnmount = (map: google.maps.Map) => { };

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
        <MapContainer>
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
                        </InfoWindow>}
                    </Marker>}
                </>
            </GoogleMap>
        </MapContainer>
    ) : (
        <Loader />
    );
};

export default Map;
