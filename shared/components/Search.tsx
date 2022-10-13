import { Chip, TextField } from '@mui/material'
import { Flex, Space } from '@shared/utils/styles';
import React from 'react';
import styled from 'styled-components';

const Search = () => {
    const handleSearchTagClick = () => { }

    const handleSearchTagRemove = () => { }

    return (
        <SearchContainer>
            <TextField id="search" label="Search Location" placeholder='Enter location name' variant="outlined" />
            <Space top={1}>
                <Flex className="search-tags" gap='20px' alignItems={'center'}>
                    <Chip label="Weligama" onClick={handleSearchTagClick} onDelete={handleSearchTagRemove} />
                    <Chip label="Weligama" onClick={handleSearchTagClick} onDelete={handleSearchTagRemove} />
                    <Chip label="Weligama" onClick={handleSearchTagClick} onDelete={handleSearchTagRemove} />
                    <Chip label="Weligama" onClick={handleSearchTagClick} onDelete={handleSearchTagRemove} />
                </Flex>
            </Space>
        </SearchContainer>
    )
}

const SearchContainer = styled.div`
    padding: 20px;
    input {
        width: 700px;
    }
`;

export default Search