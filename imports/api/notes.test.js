import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Notes } from './notes';
import expect from 'expect';

if (Meteor.isServer) {
    describe('Notes Tests', function () {
        // Creating a seed to use in all these tests:
        const seed00 = {
            _id: 'testNoteId',
            title: 'Test Tile',
            body: 'Test Body',
            updatedAt: 0,
            userId: 'testUserId'
        };
        beforeEach(function () {
            Notes.remove({});
            Notes.insert(seed00);
        });

        // CRUD OPERATIONS:
        describe('CRUD Operations Tests', function () {
            // AUTHENTICATION (ALL CRUDS):
            describe('Authentication', function(){
                it('Should not insert a Note if Unauthenticated', function () {
                    expect(() => { Meteor.server.method_handlers['notes.insert'](); })
                        .toThrow();
                });
                it('Should not remove a Note if Unauthenticated', function () {
                    expect(() => { Meteor.server.method_handlers['notes.remove'].apply({}, [seed00._id]); })
                        .toThrow();
                });
                it('Should not update a Note if Unauthenticated', function(){
                    expect(()=>{Meteor.server.method_handlers['notes.update']();}).toThrow();
                    expect(()=>{
                        Meteor.server.method_handlers['notes.update'].apply({},
                        [seed00._id,{title: 'new title'}]);
                    }).toThrow();
                });

            });
            // INSERT
            describe('Insert', function () {
                it('Should insert new Note', function () {
                    const userId = 'testid';
                    const _id = Meteor.server.method_handlers['notes.insert'].apply({
                        userId: userId
                    });
                    expect(Notes.findOne({ _id, userId })).toExist();
                });

            });

            // REMOVE
            describe('Remove', function () {
                it('Should remove a Note', function () {
                    Meteor.server.method_handlers['notes.remove'].apply({ userId: seed00.userId }, [seed00._id]);
                    expect(Notes.findOne({ _id: seed00._id })).toNotExist();
                });

                it('Should not remove a Note if invalid _id', function () {
                    expect(() => { Meteor.server.method_handlers['notes.remove'].apply({ userId: seed00.userId }, []); })
                        .toThrow();
                });

            });

            // UPDATE
            describe('Update', function () {
                it('Should update Note', function () {
                    const title = 'This is an updated title';
                    Meteor.server.method_handlers['notes.update'].apply({
                        userId: seed00.userId
                    }, [
                            seed00._id,
                            { title }
                        ]
                    );

                    const updatedNote = Notes.findOne({ _id: seed00._id });

                    expect(updatedNote.updatedAt).toBeGreaterThan(0);
                    expect(updatedNote).toInclude({
                        title,
                        body: seed00.body
                    });
                });

                it('Should not update Note when passing non-schema data', function () {
                    expect(() => {
                        Meteor.server.method_handlers['notes.update'].apply({
                            userId: seed00.userId
                        }, [
                                seed00._id,
                                { test: 'Some extra data that is not part of the schema.' }
                            ]);
                    }).toThrow();
                });

                it('Should not update Note from a different user', function () {
                    const title = 'This is an updated title';
                    Meteor.server.method_handlers['notes.update'].apply({
                        userId: 'someOtherId'
                    }, [
                            seed00._id,
                            { title }
                        ]
                    );

                    const updatedNote = Notes.findOne({ _id: seed00._id });

                    expect(updatedNote).toInclude(seed00);
                });

                it('Should not update a Note if invalid _id', function () {
                    expect(() => { Meteor.server.method_handlers['notes.update'].apply({ userId: seed00.userId }, []); })
                        .toThrow();
                });
            });
        });
    });
}