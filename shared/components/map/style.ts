import styled from "styled-components";

export const MapContainer = styled.div`
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