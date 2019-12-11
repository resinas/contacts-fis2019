const Contact = require('../contacts');
const mongoose = require('mongoose');
const dbConnect = require('../db');

describe('Contacts DB connection', () => {
    beforeAll(() => {
        return dbConnect();
    })

    beforeEach((done) => {
        Contact.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a contact in the DB', (done) => {
        const contact = new Contact({name: 'pepe', phone: '666'});
        contact.save((err, contact) => {
            expect(err).toBeNull();
            Contact.find({}, (err, contacts) => {
                expect(contacts).toBeArrayOfSize(1);
                done();
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})