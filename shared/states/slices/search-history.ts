import { createSlice } from "@reduxjs/toolkit";

// types
export type TSearchHistory = {
    histories: string[];
}

// variables
const initialState: TSearchHistory = { histories: [] };

const searchHistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        fetch: state => {
            state.histories
        },
        save: (state, param) => {
            state.histories.push(param.payload);
        },
        remove: (state, param) => {
            state.histories = state.histories.filter((history) => history !== param.payload);
        },
    }
});

export default searchHistorySlice;
export const searchHistoryAction = searchHistorySlice.actions