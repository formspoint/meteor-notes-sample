import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import PrivateHeader from './PrivateHeader';

if (Meteor.isClient) {
    describe('PrivateHeader Component Tests', function () {
        it('Should set button text to logout', function () {
            const wrapper = mount(<PrivateHeader title='Test title' />);
            const buttonText = wrapper.find('.button').text();

            expect(buttonText.toLowerCase()).toBe('logout');
        });

        it('Should use the title prop as an <h1> text', function () {
            const title = 'Test title here';
            const wrapper = mount(<PrivateHeader title={title} />);
            const h1 = wrapper.find('h1');

            expect(h1.text()).toBe(title);
        });
    });
}