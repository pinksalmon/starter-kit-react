import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as React from 'react';
import { BasicPage } from './components-smart/basic-page';

const routes = (
    <Switch>
        <Route path="/" component={BasicPage} />
    </Switch>
)

export const App = (
    <Router>
        {routes}
    </Router>
)

render(App, document.getElementById('app'));