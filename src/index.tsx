import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as React from 'react';
import { BasicPage } from './components-smart/basic-page';
import { Provider } from 'react-redux';
import { store } from './store';
import { ReduxAnimalPage } from './components-smart/redux-animal-page';
import { ReduxCounterPage } from './components-smart/redux-counter-page';

const routes = (
    <Switch>
        <Route path="/counter" component={ReduxCounterPage} />
        <Route path="/animal" component={ReduxAnimalPage} />
        <Route path="/" component={BasicPage} />
    </Switch>
)

export const App = (
    <Provider store={store}>
        <Router>
            {routes}
        </Router>
    </Provider>
)

render(App, document.getElementById('app'));