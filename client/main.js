import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import '/imports/startup/simple-schema-config'; // Run the Simple Schema configuration file
import { Session } from 'meteor/session';

import App from '/imports/react/App';

Meteor.startup(() => {
  // Declare session variables:
  Session.set('userAuthenticated', undefined);
  Session.set('selectedNoteId', undefined);

  // Render the application:
  ReactDOM.render(
    <App />,
    document.getElementById('app'));
});