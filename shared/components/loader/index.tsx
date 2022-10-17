import { Typography } from '@mui/material';
import { Flex, Space } from '@shared/utils/styles';
import React from 'react';
import { TLoaderProps } from '@shared/components/loader/type';
import { LoaderContainer } from '@shared/components/loader/style';

const Loader = ({
    width = '100%',
    height = '100%',
    minHeight = '100vh',
    loaderSize = '50px',
    type = 'content',
}: TLoaderProps) => {
    return (
        <LoaderContainer
            width={width}
            height={height}
            minHeight={minHeight}
            loaderSize={loaderSize}
            type={type}
            className="loader"
        >
            <Flex justifyContent={'center'} alignItems={'center'} className="loading-container">
                <Flex alignItems={'center'} direction={'column'}>
                    <div className="loader"></div>
                    <Space top={2}>
                        <Typography variant='h5' color={'GrayText'}>
                            Please wait...
                        </Typography>
                    </Space>
                </Flex>
            </Flex>
        </LoaderContainer>
    );
};

export default Loader;
