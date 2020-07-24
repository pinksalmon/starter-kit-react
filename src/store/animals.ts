import { createSlice, combineReducers, createStore, createAsyncThunk } from '@reduxjs/toolkit';

type SliceState = {
    isLoading: boolean;
    hasError: boolean;
    data: string[];
}

const initialState: SliceState = {
    isLoading: false,
    hasError: false,
    data: []
};

// Tactic async thunks
export const fetchAnimals = createAsyncThunk(
    'animals/fetch',
    async () => {
        const animals = [ 'rhino', 'tiger', 'rabbit' ];

        return new Promise<string[]>(resolve => 
            setTimeout(() => resolve(animals), 3000)
        );
    }
);

// Presentation slice
export const animal = createSlice({
    name: 'tacticCategory',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Async thunk reducers
        builder.addCase(fetchAnimals.pending, (state, action) => ({
            data: [],
            isLoading: true,
            hasError: false
        }));

        builder.addCase(fetchAnimals.rejected, (state, action) => ({
            ...state,
            isLoading: false,
            hasError: true 
        }));

        builder.addCase(fetchAnimals.fulfilled, (state, action) => ({
            data: action.payload,
            isLoading: false,
            hasError: false
        }));
    }
});