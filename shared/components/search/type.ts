export type TSearchProps = {
    onAutocompleteLoad: ((searchBox: google.maps.places.SearchBox) => void) | undefined
    onPlaceChanged: () => void
}