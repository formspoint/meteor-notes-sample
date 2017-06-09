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

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login}  />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/dash" component={Dashboard} />
                    <Route path="/dash/:id" component={Dashboard} />
                    <Route exact path="/verify-email/:token" component={EmailVerification} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;