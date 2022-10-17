import { configureStore } from '@reduxjs/toolkit';
import searchHistorySlice, { TSearchHistory } from '@shared/states/slices/search-history';

// types
export type TReducer = {
    search: TSearchHistory
}

const store = configureStore({
    reducer: {
        search: searchHistorySlice.reducer
    }
})

export default store