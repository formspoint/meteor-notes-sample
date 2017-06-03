import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
    'notes.insert'() {
        if (!this.userId) throw new Meteor.Error('auth-error', 'Unauthorized');
        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            updatedAt: moment().unix()
        });
    },
    'notes.remove'(_id){
        if(!this.userId) throw new Error('auth-error', 'Unauthorized');
        new SimpleSchema({
            _id: {type: String, min: 1}
        }).validate({_id});
        return Notes.remove({_id, userId: this.userId});
    },
    'notes.update'(_id, updates){
        if(!this.userId) throw new Error('auth-error', 'Unauthorized');
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }, 
            title: {
                type: String,
                optional: true
            },
            body: {
                type: String,
                optional: true
            }
        }).validate({
            _id,
            ...updates
        });
        return Notes.update({_id, userId: this.userId},{
            $set: {
                updatedAt: moment().unix(),
                ...updates
            }
        });
    }
});