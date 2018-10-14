//const contactRoutes = require('../routes/contactRoutes');
const expect = require('expect');

const { app } = require('../server.js');

const request = require('supertest');

const { ObjectID } = require('mongodb');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

const keys = require('../config/keys');

const {
  contacts,
  populateContacts,
  users,
  populateUsers,
  deleteUsers
} = require('./seed/seed');

describe('POST /api/login', done => {
  beforeEach(populateContacts);
  beforeEach(populateUsers);

  it('should accept a valid login and set the headers with the users token', done => {
    request(app)
      .post('/api/login')
      .send({ email: users[0].email, password: users[0].password })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        //if issued at different times the token check fails
        expect(res.headers['x-auth']).toBeTruthy;
        //better to decode the x-auth and compare the keys
        done();
      });
  });
  it('should reject an invalid login', done => {
    request(app)
      .post('/api/login')
      .send({ email: users[0].email, password: '88237388273' })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers['x-auth']).toBeFalsy;
        done();
      });
  });
});

describe('GET /api/logout', () => {
  beforeEach(populateContacts);
  beforeEach(populateUsers);
  it('should destroy the token when a user signs out', done => {
    //simulate logout for user 0
    request(app)
      .get('/api/logout')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        User.findOne(users[0]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            return done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});

describe('POST /api/user', () => {
  beforeEach(populateContacts);
  beforeEach(populateUsers);

  it('should reject duplicate passwords', done => {
    request(app)
      .post('/api/user')
      .send(users[0])
      .expect(400)
      .end(done);
  });

  it('should reject invalid email', done => {
    const user = {
      _id: new ObjectID(),
      email: 'exampletest.com',
      password: '123456'
    };
    request(app)
      .post('/api/user')
      .send(user)
      .expect(400)
      .end(done);
  });

  it('should reject password < 6', done => {
    const user = {
      _id: new ObjectID(),
      email: 'example@test.com',
      password: '12345'
    };
    request(app)
      .post('/api/user')
      .send(user)
      .expect(400)
      .end(done);
  });

  it('should reject missing password', done => {
    const user = {
      _id: new ObjectID(),
      email: 'example@test.com'
    };
    request(app)
      .post('/api/user')
      .send(user)
      .expect(400)
      .end(done);
  });
  it('should reject missing email', done => {
    const user = {
      _id: new ObjectID(),
      password: '12334555'
    };
    request(app)
      .post('/api/user')
      .send(user)
      .expect(400)
      .end(done);
  });

  it('should create a user with valid credentials and hashed password', done => {
    const user = {
      _id: new ObjectID(),
      email: 'example@test.co.uk',
      password: '123456'
    };
    request(app)
      .post('/api/user')
      .send(user)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toEqual(user._id.toHexString());
        //should also probably check to make
        //sure confidential information is not returned!

        //now check that the data has saved correctly in the databas
      })
      .end((err, res) => {
        if (err) return done(err);
        User.findOne({ _id: user._id })
          .then(userDB => {
            expect(userDB).toBeTruthy();
            expect(userDB.password).not.toBe(user.password); //it must have been hashed
            expect(userDB._id.toHexString()).toBe(user._id.toHexString());
            expect(userDB.email).toBe(user.email);
            done();
          })
          .catch(err => {
            return done(err);
          });
      });

    it('should create a  valid JWT token', done => {
      const user = {
        _id: new ObjectID(),
        email: 'example@test.co.uk',
        password: '123456'
      };
      const token = jwt.sign({ user_id, access: 'auth' }, keys.jwtSecret);
      request(app)
        .post('/api/user')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          User.findOne({ _id: user._id })
            .then(userDB => {
              expect(userDB.tokens[0]).toBeTruthy();
              expect(userDB.tokens[0].token).toBe(token);
              done();
            })
            .catch(err => {
              return done(err);
            });
        });
    });
  });
});
