import styled from "styled-components";

export const LoaderContainer = styled.div<{ width?: string; height?: string; minHeight?: string; loaderSize?: string; type?: string }>`
    .loading-container {
        width: ${props => props.width};
        height: ${props => props.height} !important;
        min-height: ${props => props.minHeight} !important;
        background-color: ${props =>
        props.type === 'fullscreen' || props.type === 'fit_to_parent'
            ? '#ffffffab'
            : '#f1f1f1'};
        font-size: ${props => props.loaderSize};

        ${props =>
        props.type === 'fullscreen' &&
        `
                width: 100vw;
                height: 100vh;
                min-height: 585px;
                font-size: 50px;
                position: fixed;
                z-index: 9999;
                top: 0;
                left: 0;
            `}

        ${props =>
        props.type === 'fit_to_parent' &&
        `
                width: 100%;
                height: 100%;
                min-height: 100%;
                font-size: 50px;
                z-index: 9999;
                top: 0;
                left: 0;
                position: absolute;
            `}
    }

    .loader {
        border: 4px solid #f3f3f3;
        border-radius: 50%;
        border-top: 4px solid #424242;
        width: 50px;
        height: 50px;
        -webkit-animation: spin 1s linear infinite; /* Safari */
        animation: spin 1s linear infinite;
    }

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
