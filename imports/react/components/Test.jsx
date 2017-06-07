import React from 'react';

export default ({ match }) => {
    return (
        <h3>Entered route with id of {match.params.id}</h3>
    );
};