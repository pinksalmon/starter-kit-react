import { createSlice, combineReducers, createStore, createAsyncThunk } from '@reduxjs/toolkit';

type SliceState = number;

const initialState: number = 0;

// Tactic slice
export const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => state + 1
    },
});