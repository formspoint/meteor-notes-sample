import { Session } from 'meteor/session'; //<-- meteor add session
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Notes } from '/imports/api/notes';


import PageNotFound from '/imports/react/components/pages/PageNotFound';
import PrivateHeader from '/imports/react/components/default/PrivateHeader';
import NoteList from '/imports/react/components/NoteList';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (Session.get('userAuthenticated') !== true)
        { this.props.history.replace('/'); }

        const id = this.props.match.params.id;
        if (!!id) {
            Session.set('selectedNoteId', id);
        }
    }
    render() {
        return (
            <div>
                <PrivateHeader title='Dashboard' />
                <div className='page-container'>
                    <NoteList />
                </div>
            </div>
        );
    }
}

export default Dashboard;