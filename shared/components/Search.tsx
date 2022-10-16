import { Chip, TextField } from '@mui/material'
import { StandaloneSearchBox } from '@react-google-maps/api';
import { searchHistoryAction } from '@shared/states/slices/search-history';
import { TReducer } from '@shared/states/store';
import { Flex, Space } from '@shared/utils/styles';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Search = ({ onAutocompleteLoad, onPlaceChanged }: TSearchProps) => {
    // hooks
    const dispatcher = useDispatch();
    const search = useSelector((state: TReducer) => state.search);

    // ref
    const searchRef = useRef<HTMLInputElement>(null);

    /**
     * handle search history on click search again 
     * @param term: string
     * @return void
     */
    const handleSearchTagClick = (term: string) => {
        dispatcher(searchHistoryAction.save(term))
    }

    /**
     * handle search history remove
     * @param term: string
     * @return void
     */
    const handleSearchTagRemove = (term: string) => {
        dispatcher(searchHistoryAction.remove(term))
    }

    /**
     * handle map place location change
     * @return void
     */
    const handlePlaceChanged = () => {
        dispatcher(searchHistoryAction.save(searchRef.current?.value))
        onPlaceChanged();
    }

    return (
        <SearchContainer>
            <StandaloneSearchBox
                onLoad={onAutocompleteLoad}
                onPlacesChanged={handlePlaceChanged}
            >
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <div className="map-search-container">
                        <TextField inputRef={searchRef} label="Search Location" placeholder='Enter any location name for search...' variant="outlined" />
                        {search && search.histories && search.histories.length > 0 && <Space top={1}>
                            <Flex className="search-tags" gap='20px' alignItems={'center'} wrap={'wrap'}>
                                {search.histories.map((term: string, index: number) => <Chip key={index} label={term} onClick={() => handleSearchTagClick(term)} onDelete={() => handleSearchTagRemove(term)} />)}
                            </Flex>
                        </Space>}
                    </div>
                </Flex>
            </StandaloneSearchBox>
        </SearchContainer>
    )
}

// types
type TSearchProps = {
    onAutocompleteLoad: ((searchBox: google.maps.places.SearchBox) => void) | undefined
    onPlaceChanged: () => void
}

// styles
const SearchContainer = styled.div`
    padding: 20px;
    input {
        width: 700px;
    }
`;

export default Search