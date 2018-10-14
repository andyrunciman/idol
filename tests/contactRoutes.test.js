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

describe('DELETE /api/contact/:id', () => {
  beforeEach(populateContacts);
  beforeEach(populateUsers);
  it('should not allow an unathorised user to delete a contact', done => {
    request(app)
      .delete(`/api/contact/${contacts[0]._id}`)
      .expect(401)
      .end(done);
  });
  it('should not allow an authorised user to delete a contact that does not belong to them', done => {
    request(app)
      .delete(`/api/contact/${contacts[2]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
  });
  it('should allow an authenticated user to delete their own contact ', done => {
    request(app)
      .delete(`/api/contact/${contacts[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        Contact.findOne({ _id: contacts[0]._id }).then(contact => {
          expect(contact).toBeFalsy;
          done();
        });
      });
  });
});

describe('PATCH /api/contact:id', () => {
  beforeEach(populateContacts);
  beforeEach(populateUsers);
  it('should not update contact for an unauthenticated user', done => {
    request(app)
      .patch(`/api/contact/${contacts[0]._id}`)
      .expect(401)
      .end(done);
  });

  it('should update the contact for logged in user', done => {
    const email = 'new@test.com';
    request(app)
      .patch(`/api/contact/${contacts[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({ email })
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(contacts[0]._id.toHexString());
        expect(res.body.email).toBe(email);
      })
      .end(done);
  });

  it('should not update the a contact that does not belong to an autenticated user', done => {
    const email = 'new@test.com';
    request(app)
      .patch(`/api/contact/${contacts[2]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({ email })
      .expect(400)
      .end(done);
  });
});

describe('GET /api/contact:id', () => {
  beforeEach(populateContacts);
  beforeEach(populateUsers);

  it('should not return a contact for an unauthenticated user', done => {
    request(app)
      .get(`/api/contact/${contacts[0]._id}`)
      .expect(401)
      .end(done);
  });

  it('should return the contact for logged in user', done => {
    request(app)
      .get(`/api/contact/${contacts[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(contacts[0]._id.toHexString());
      })
      .end(done);
  });

  it('should not return a contact that does not belong to a user', done => {
    request(app)
      .get(`/api/contact/${contacts[2]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('GET /api/contacts', done => {
  beforeEach(populateContacts);
  beforeEach(populateUsers);

  it('should return a status 404 for an unauthenticated user', done => {
    request(app)
      .get('/api/contacts')
      .expect(401)
      .end(done);
  });

  it('should return the contacts for logged in user', done => {
    request(app)
      .get('/api/contacts')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});

describe('POST /api/contact', () => {
  beforeEach(populateContacts);
  beforeEach(populateUsers);

  it('should sanitise input and remove unspecified fields', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@test.com',
      name: 'bob',
      hack: 'This field has been injected'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(200)
      .expect(res => {
        expect(res.body).not.toHaveProperty('hack');
      })
      .end(done);
  });
  it('should revieve a status 400 and error message for an invalid date of birth', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@test.com',
      name: 'bob',
      postcode: 'DTX'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'Postcode must be a valid UK Postcode'
        );
      })
      .end(done);
  });

  it('should revieve a status 400 and error message for an invalid UK Postcode', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@test.com',
      name: 'bob',
      postcode: 'DTX'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'Postcode must be a valid UK Postcode'
        );
      })
      .end(done);
  });
  it('should revieve a status 400 and error message for a phone number more than 12 digits', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@test.com',
      phonenumber: '0192892872782828282',
      name: 'bob'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'Phone numbers must be between 6-12 digits long'
        );
      })
      .end(done);
  });
  it('should revieve a status 400 and error message for a phone number less than 6 digits', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@test.com',
      phonenumber: '',
      name: 'bob'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'Phone numbers must be between 6-12 digits long'
        );
      })
      .end(done);
  });
  it('should revieve a status 400 and error message for a phone number with special characters', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@test.com',
      phonenumber: '(012) - 1212',
      name: 'bob'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'Phone numbers cannot contain spaces special characters e.g () or -'
        );
      })
      .end(done);
  });
  it('should revieve a status 400 and error message for an name > 40 characters', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@test.com',
      name: 'This is a very long name and should not be allowed!'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'Name must be between 1 and 40 characters'
        );
      })
      .end(done);
  });
  it('should revieve a status 400 and error message for an empty name', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bob@test.com'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'You must include a name for the contact'
        );
      })
      .end(done);
  });
  it('should revieve a status 400 and error message for a missing email', done => {
    const contact = {
      _id: new ObjectID(),
      name: 'bob'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'You must provide an email address!'
        );
      })
      .end(done);
  });

  it('should revieve a status 400 for a incorrectly formatted email', done => {
    const contact = {
      _id: new ObjectID(),
      email: 'bobbob.com',
      name: 'bob'
    };
    request(app)
      .post('/api/contact')
      .set('x-auth', users[0].tokens[0].token)
      .send(contact)
      .expect(400)
      .expect(res => {
        expect(res.body.errors[0].message).toBe(
          'Please enter a valid email address'
        );
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
      email: 'bob@bob.com',
      dob: Date.now().toString(),
      phonenumber: '01232223987',
      postcode: 'TE12ST',
      address: '1 Test Street'
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
        expect(res.body).toMatchObject({
          _id: expect.any(String),
          name: expect.any(String),
          dob: expect.any(String),
          phonenumber: expect.any(String),
          postcode: expect.any(String),
          address: expect.any(String)
        });
        expect(res.body._creator).toBe(users[0]._id.toHexString());
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
