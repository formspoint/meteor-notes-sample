import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import moment from 'moment';
import { updatedAtFormat, defaultNoteTitle } from '/imports/api/notes';

import NoteListItem from '/imports/react/components/NoteListItem';

if (Meteor.isClient) {
    describe('NoteListItem Tests', function () {
        it('Should render title and timestamp', function () {
            const title = 'Some title';
            const updatedAt = new Date().getTime();
            const formattedStamp = moment(updatedAt).format(updatedAtFormat);
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe(formattedStamp);

        });

        it('Should set default title if no title set', function(){
            const wrapper = mount(<NoteListItem note={{}}/>);

            expect(wrapper.find('h5').text()).toBe(defaultNoteTitle);
        });
    });
}