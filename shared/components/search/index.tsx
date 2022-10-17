import { Chip, TextField } from '@mui/material'
import { StandaloneSearchBox } from '@react-google-maps/api';
import { searchHistoryAction } from '@shared/states/slices/search-history';
import { TReducer } from '@shared/states/store';
import { Flex, Space } from '@shared/utils/styles';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TSearchProps } from '@shared/components/search/type';
import { SearchContainer } from '@shared/components/search/style';

const Search = ({ onAutocompleteLoad, onPlaceChanged }: TSearchProps) => {
    // hooks
    const dispatcher = useDispatch();
    const search = useSelector((state: TReducer) => state.search);

    // state
    const [searchTerm, setSearchTerm] = useState<string>('');

    /**
     * handle search history on click search again 
     * @param term: string
     * @return void
     */
    const handleSearchTagClick = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    /**
     * handle search history remove
     * @param term: string
     * @return void
     */
    const handleSearchTagRemove = useCallback((term: string) => {
        dispatcher(searchHistoryAction.remove(term))
    }, []);

    /**
     * handle map place location change
     * @return void
     */
    const handlePlaceChanged = useCallback(() => {
        setSearchTerm(searchTerm);
        dispatcher(searchHistoryAction.save(searchTerm))
        onPlaceChanged();
    }, [searchTerm]);

    const handleOnSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    return (
        <SearchContainer>
            <StandaloneSearchBox
                onLoad={onAutocompleteLoad}
                onPlacesChanged={handlePlaceChanged}
            >
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <div className="map-search-container">
                        <TextField
                            value={searchTerm}
                            onChange={handleOnSearch}
                            label="Search Location"
                            placeholder='Enter any location name for search...'
                            variant="outlined"
                        />

                        {search && search.histories && search.histories.length > 0 && (
                            <Space top={1}>
                                <Flex className="search-tags" gap='20px' alignItems={'center'} wrap={'wrap'}>
                                    {search.histories.map((term: string, index: number) => (
                                        <Chip
                                            key={index}
                                            label={term}
                                            onClick={() => handleSearchTagClick(term)}
                                            onDelete={() => handleSearchTagRemove(term)}
                                        />
                                    ))}
                                </Flex>
                            </Space>
                        )}
                    </div>
                </Flex>
            </StandaloneSearchBox>
        </SearchContainer>
    )
}

export default Search