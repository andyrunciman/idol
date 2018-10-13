const request = require('supertest');
const { app } = require('../server');
const expect = require('expect');
const { ObjectID } = require('mongodb');
const {
  contacts,
  populateContacts,
  users,
  populateUsers
} = require('./seed/seed');
const Contact = require('../models/contact');

beforeEach(populateContacts);
beforeEach(populateUsers);

describe('POST /api/contact', () => {
  it('should revieve a 400 for a missing email', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@bob.com'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        console.log(res.body);
        expect(res.body.error).toBe('You must provide an email address!');
      })
      .end(done);
  });

  it('should revieve a 400 for a incorrectly formatted email', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bobbob.com'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        //console.log(res.body);
        //expect(res.body.error).toBe('Please enter a valid email address');
      })
      .end(done);
  });

  it('should revieve a 404 for unauthenticated request', done => {
    const contact = {
      _id: new ObjectID(),
      name: 'bob',
      email: 'bob@bob.com'
    };
    request(app)
      .post('/apui/contact')
      .send(contact)
      .expect(404)
      .end(done);
  });
  it('should add a new contact for user[0]', done => {
    const contact = {
      _id: new ObjectID(),
      name: 'bob',
      email: 'bob@bob.com'
    };

    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe(contact.name);
        expect(res.body.email).toBe(contact.email);
        expect(res.body._id).toBe(contact._id.toHexString());
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //check that this matches the database
        Contact.find({})
          .then(contacts => {
            expect(contacts.length).toBe(4);
            expect(contacts[3]._id.toHexString()).toBe(
              contact._id.toHexString()
            );
            return done();
          })
          .catch(err => {
            return done(err);
          });
      });
  });
});
