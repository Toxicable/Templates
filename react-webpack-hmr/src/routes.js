/**
 * Created by Fabian on 17/09/2016.
 */
import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import { Home, ContactUs, ErrorPage, NotFound, TodoList, CounterContainer} from './views';
import { App } from './components'

const Routes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/home" component={ Home }/>
            <Route path="/contact" component={ContactUs}/>
            <Route path="/todo" component={TodoList} />
            <Route path="/counter" component={CounterContainer} />
            <Route path="error" component={ErrorPage}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
)

export default Routes;
