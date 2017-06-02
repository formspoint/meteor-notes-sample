import React from 'react';
import PrivateHeader from '/imports/react/components/default/PrivateHeader';

export default () => {
    return (
        <div>
            <PrivateHeader title='Dashboard' />
            <div className='page-container'>
                Dashboard page content.
            </div>
        </div>
    );
};