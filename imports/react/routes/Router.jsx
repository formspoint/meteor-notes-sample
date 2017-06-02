import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

// Grab the Website pages (components):
import Dashboard from '/imports/react/components/pages/Dashboard';
import Login from '/imports/react/components/pages/Login';
import Signup from '/imports/react/components/pages/Signup';
import PageNotFound from '/imports/react/components/pages/PageNotFound';

// Create importable history and auth flags
export const history = require('history').createBrowserHistory();
const userAuthenticated = !!Meteor.userId();

// Establish the paths that will need auth:
const authenticatedPaths = ['/dash'];
// Establish the paths that wont need auth:
const unauthenticatedPaths = ['/', '/signup'];

export const onAuthChange = (isAuthenticated)=>{
    const pathname = history.location.pathname;
    const isUnauthenticatedPath = unauthenticatedPaths.includes(pathname);
    const isAuthenticatedPath = authenticatedPaths.includes(pathname);
    if(isUnauthenticatedPath && isAuthenticated){
        history.replace('/dash');
    } 
    else if(isAuthenticatedPath && !isAuthenticated) {
        history.replace('/');
    }
};

class Routes extends React.Component {
    onPublicPage(){
        if(userAuthenticated) history.replace('/dash');
    }
    onPrivatePage(){
        if(!userAuthenticated) history.replace('/');
    }
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route exact={true} path="/" component={Login} onEnter={this.onPublicPage.bind(this)} />
                    <Route path="/signup" component={Signup} onEnter={this.onPublicPage.bind(this)}/>
                    <Route path="/dash" component={Dashboard} onEnter={this.onPrivatePage.bind(this)}/>
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;