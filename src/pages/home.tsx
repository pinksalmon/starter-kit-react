import './home.less';
import React from "react";
import { BasicClassComponent } from '../components/examples/example-basic-class-component';
import { BasicFunctionComponent } from '../components/examples/example-basic-function-component';
import { BasicFluxComponent } from '../components/examples/example-flux-based-component';
import { UseApiHookComponent } from '../components/examples/example-use-api-hook';

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