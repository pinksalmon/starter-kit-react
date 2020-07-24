import { useAppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { counter } from "../store/counter";
import React from "react";

export const ReduxCounterPage = () => {
    const dispatch = useAppDispatch();

    // how to get data from store
    const count = useSelector((state: RootState) => state.counter);

    // how to dispatch store actions
    const incrementCount = () => dispatch(counter.actions.increment());

    // render
    return (
        <div>
            count: {count}
            <button onClick={incrementCount}>increment</button>
        </div>
    );
}