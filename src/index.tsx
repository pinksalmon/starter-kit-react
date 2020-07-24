import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as React from 'react';
import { HomePage } from './components-smart/home-page';

const routes = (
    <Switch>
        <Route path="/" component={HomePage} />
    </Switch>
)

export const App = (
    <Router>
        {routes}
    </Router>
)

render(App, document.getElementById('app'));