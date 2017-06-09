import { Session } from 'meteor/session'; //<-- meteor add session
import React from 'react';
import PropTypes from 'prop-types';
import { Notes } from '/imports/api/notes';
import { createContainer } from 'meteor/react-meteor-data';

import PageNotFound from '/imports/react/components/pages/PageNotFound';
import PrivateHeader from '/imports/react/components/default/PrivateHeader';
import NoteList from '/imports/react/components/NoteList';
import Editor from '/imports/react/components/Editor';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    redirectIfUnauthenticated(){
        if (this.props.Session.get('userAuthenticated') !== true)
        { this.props.history.replace('/'); }
    }
    componentWillMount() {
        this.redirectIfUnauthenticated();
    }
    componentWillUpdate() {
        this.redirectIfUnauthenticated();
    }
    render() {
        return (
            <div>
                <PrivateHeader title='Dashboard' />
                <div className='page-container'>
                    <NoteList />
                    <Editor />
                </div>
            </div>
        );
    }
}

export default createContainer((props) => {
    return {
        Session: Session,
        Subscription: Meteor.subscribe('notes', {
            onReady: () => {
                const id = props.match.params.id;
                if (!!id) {
                    if (!Notes.findOne({ _id: props.match.params.id }))
                    { props.history.push('/NotFound'); }
                    else
                    { Session.set('selectedNoteId', id); }
                }
            }
        })
    };
}, Dashboard);