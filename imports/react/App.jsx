import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'; //<-- meteor add session
import Routes, {onAuthChange} from '/imports/react/routes/Router';

import history from '/imports/fixtures/browserHistory';

class App extends React.Component {
    componentDidMount(){
        // Start the auth tracker
        this.authTracker = Tracker.autorun(()=>{
            const isAuthenticated = !!Meteor.userId();
            Session.set('userAuthenticated', isAuthenticated);
            onAuthChange(isAuthenticated);
        });
        // Start the selected id tracker
        this.selectedNoteIdTracker = Tracker.autorun(()=>{
            const selectedNoteId = Session.get('selectedNoteId');
            if(selectedNoteId){
                history.replace(`/dash/${selectedNoteId}`);
            } else {
                Session.set('selectedNoteId', undefined);
            }
        });
    }
    componentWillUnmount(){
        // Stop all trackers:
        this.authTracker.stop();
        this.selectedNoteIdTracker.stop();
    }
    render(){
        return(
            <Routes/>
        );
    }
}

export default App;