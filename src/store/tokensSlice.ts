import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, SortConfig } from '@/lib/types';
import { RootState } from './index';

interface TokensState {
    data: Token[];
    sortConfig: SortConfig;
    filter: string;
}

const initialState: TokensState = {
    data: [],
    sortConfig: { field: 'createdAt', direction: 'desc' },
    filter: '',
};

export const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Token[]>) => {
            state.data = action.payload;
        },
        updateToken: (state, action: PayloadAction<Partial<Token>>) => {
            const index = state.data.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...action.payload };
            }
        },
        addToken: (state, action: PayloadAction<Token>) => {
            state.data.unshift(action.payload);
        },
        setSortConfig: (state, action: PayloadAction<SortConfig>) => {
            state.sortConfig = action.payload;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
    },
});

export const { setTokens, updateToken, addToken, setSortConfig, setFilter } = tokensSlice.actions;

export const selectTokens = (state: RootState) => state.tokens.data;
export const selectSortConfig = (state: RootState) => state.tokens.sortConfig;
export const selectFilter = (state: RootState) => state.tokens.filter;

export default tokensSlice.reducer;
