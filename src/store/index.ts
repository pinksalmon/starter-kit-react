import { combineReducers, createStore, applyMiddleware } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux';
import { counter } from "./counter";
import thunk, { ThunkDispatch } from 'redux-thunk';
import { animal } from "./animals";

const rootReducer = combineReducers({
  counter: counter.reducer,
  animal: animal.reducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<any, any, any>;

export const useAppDispatch = () => useDispatch<AppDispatch>()