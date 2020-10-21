import './home.less';
import React from "react";
import { BasicClassComponent } from "../examples/example-basic-class-component";
import { BasicFunctionComponent } from "../examples/example-basic-function-component";
import { BasicFluxComponent } from "../examples/example-flux-based-component";
import { UseApiHookComponent } from "../examples/example-use-api-hook";

export const HomePage = () => {
    return (
        <div className="home-page">
            <div className="examples-row">
                <BasicClassComponent />
                <BasicFunctionComponent />
                <BasicFluxComponent />
                <UseApiHookComponent />
            </div>
        </div>
    )
};