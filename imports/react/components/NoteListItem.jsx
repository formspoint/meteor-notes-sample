import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data';

import { updatedAtFormat, defaultNoteTitle } from '/imports/api/notes';

export const NoteListItem = (props) => {
    return (
        <div>
            <h5>{props.note.title || defaultNoteTitle}</h5>
            <p>{moment(props.note.updatedAt).format(updatedAtFormat)}</p>
        </div>
    );
};

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired
};

// export default createContainer(()=>{
//     return {
//         note: 
//     };
// }, NoteListItem);
export default NoteListItem;