import './home.less';
import React from "react";
import { ExampleClassComponent } from '../components/examples/example-class-component';
import { ExampleFunctionComponent } from '../components/examples/example-function-component';
import { ExampleFluxComponent } from '../components/examples/example-flux-component';
import { ExampleUseApiComponent } from '../components/examples/example-use-api-component';

export const HomePage = () => {
    return (
        <div className="home-page">
            <div className="examples-row">
                <ExampleClassComponent />
                <ExampleFunctionComponent />
                <ExampleFluxComponent />
                <ExampleUseApiComponent />
            </div>
        </div>
    )
};