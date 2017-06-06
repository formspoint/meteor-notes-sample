import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '/imports/api/notes';

import NoteListHeader from '/imports/react/components/NoteListHeader';
import NoteListItem from '/imports/react/components/NoteListItem';

export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader />
            NoteList {props.notes.length}
            {
                /* Render note items */
                props.notes.map((note) => {
                    return <NoteListItem key={note._id} note={note} />
                })
            }
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch()
    };
}, NoteList);