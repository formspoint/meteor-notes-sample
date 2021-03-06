import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {
    describe('NoteListHeader Component Tests', function () {
        it('Should call "meteorCall" on button click', function () {
            const spy = expect.createSpy();
            const wrapper = mount(<NoteListHeader meteorCall={spy} />);

            wrapper.find('button.button').simulate('click');
            expect(spy).toHaveBeenCalledWith('notes.insert');
        });
    });

}