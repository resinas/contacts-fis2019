const app = require('../server.js');
const Contact = require('../contacts.js');
const ApiKey = require('../apikeys');
const request = require('supertest');


describe("Hello world tests", () => {

    it("Should do an stupid test", () => {
        const a = 5;
        const b = 3;
        const sum = a + b;

        expect(sum).toBe(8);
    });

});

describe("Contacts API", () => {
    describe("GET /", () => {
        it("Should return an HTML document", () => {
            return request(app).get("/").then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("html"));
                expect(response.text).toEqual(expect.stringContaining("h1"));
            });
        });
    });

    describe("GET /contacts", () => {

        beforeAll(() => {            
            const contacts = [
                new Contact({"name": "juan", "phone": "5555"}),
                new Contact({"name": "pepe", "phone": "6666"})
            ];

            const user = {
                user: "test",
                apikey: "1"
            }

            dbFind = jest.spyOn(Contact, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, contacts);
            });

            auth = jest.spyOn(ApiKey, "findOne");
            auth.mockImplementation((query, callback) => {
                callback(null, new ApiKey(user));
            })
        });

        it('Should return all contacts', () => {
            return request(app).get('/api/v1/contacts').set('apikey', '1').then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });

    describe('POST /contacts', () => {
        const contact = {name: "juan", phone: "6766"};
        let dbInsert;

        beforeEach(() => {
            dbInsert = jest.spyOn(Contact, "create");
        });

        it('Should add a new contact if everything is fine', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(false);
            });

            return request(app).post('/api/v1/contacts').send(contact).then((response) => {
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(contact, expect.any(Function));
            });
        });

        it('Should return 500 if there is a problem with the DB', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(true);
            });

            return request(app).post('/api/v1/contacts').send(contact).then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
    });
});