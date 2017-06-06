import React from 'react';
import PrivateHeader from '/imports/react/components/default/PrivateHeader';
import NoteList from '/imports/react/components/NoteList';

export default () => {
    return (
        <div>
            <PrivateHeader title='Dashboard' />
            <div className='page-container'>
                <NoteList />
            </div>
        </div>
    );
};