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
        save: (state, param) => {
            if (!state.histories.includes(param.payload)) state.histories.push(param.payload);
        },
        remove: (state, param) => {
            state.histories = state.histories.filter((history) => history !== param.payload);
        },
    }
});

export default searchHistorySlice;
export const searchHistoryAction = searchHistorySlice.actions