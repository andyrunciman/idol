const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');
const Contact = require('../../models/contact');
const User = require('../../models/user');

const userOneId = new ObjectID();

//make an authenticated user
const userOne = {
  _id: userOneId,
  email: 'test@test.com',
  password: '123456',
  tokens: [
    {
      token: jwt.sign(
        { _id: userOneId.toHexString(), access: 'auth' },
        keys.jwtSecret
      ),
      access: 'auth'
    }
  ]
};

//make an unauthenticated user
const userTwo = {
  _id: new ObjectID(),
  email: 'test3@test.com',
  password: '123456'
};

const users = [userOne, userTwo];

const populateUsers = () =>
  User.deleteMany({}).then(() => {
    //dont use insertMany as the pre routine wont fire and the passwords wont be hashed
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  });

/**
 * Exports default contacts for testing
 */
const contacts = [
  {
    _id: new ObjectID(),
    email: 'test1@test.com',
    name: 'test1',
    dob: Date.now(),
    postcode: 'TE12ST',
    address: '1 Testing Road',
    telephone: '01265555222',
    _creator: users[0]
  },
  {
    _id: new ObjectID(),
    email: 'test2@test.com',
    name: 'test2',
    _creator: users[0]
  },
  {
    _id: new ObjectID(),
    email: 'test10@test.com',
    name: 'test3',
    _creator: new ObjectID()
  }
];

/**
 * Populates the database with contacts after removing any old ones
 */
const populateContacts = () =>
  //doesnt need done as returning a promise
  Contact.deleteMany({}).then(() => Contact.insertMany(contacts));

const deleteUsers = () => User.deleteMany({});

module.exports = {
  contacts,
  populateContacts,
  deleteUsers,
  users,
  populateUsers
};
