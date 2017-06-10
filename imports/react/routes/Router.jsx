import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import history from '/imports/fixtures/browserHistory';
// Grab the Website pages (components):
import Dashboard from '/imports/react/components/pages/Dashboard';
import Login from '/imports/react/components/pages/Login';
import Signup from '/imports/react/components/pages/Signup';
import PageNotFound from '/imports/react/components/pages/PageNotFound';
import EmailVerification from '/imports/react/components/pages/EmailVerification';

const userAuthenticated = !!Meteor.userId();

// Establish the paths that will need auth:
const authenticatedPaths = ['/dash'];
// Establish the paths that wont need auth:
const unauthenticatedPaths = ['/', '/signup'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPath = unauthenticatedPaths.includes(pathname);
    const isAuthenticatedPath = authenticatedPaths.includes(pathname);
    if (isUnauthenticatedPath && isAuthenticated) {
        history.replace('/dash');
    }
    else if (isAuthenticatedPath && !isAuthenticated) {
        history.replace('/');
    }
};

const routes = [
    { path: '/', exact: true, component: Login },
    { path: '/signup', exact: true, component: Signup },
    { path: '/dash', exact: true, component: Dashboard },
    { path: '/dash/:id', component: Dashboard },
    { path: '/verify-email/:token', exact: true, component: EmailVerification },
    { component: PageNotFound }
];

const RoutesWithSubRoutes = (route) => (
    <Route path={route.path} render={(props) => (
        <route.component {...props} routes={route.routes} />
    )} />
)

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {routes.map((route, i) => (
                        <RoutesWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </Router>
        );
    }
}

export default Routes;
// <Route exact path="/" component={Login}  />
// <Route exact path="/signup" component={Signup} />
// <Route exact path="/dash" component={Dashboard} />
// <Route path="/dash/:id" component={Dashboard} />
// <Route exact path="/verify-email/:token" component={EmailVerification} />
// <Route component={PageNotFound} />
