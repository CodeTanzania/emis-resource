'use strict';


/* dependencies */
const faker = require('@benmaruchu/faker');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item } = include(__dirname, '..', '..');


describe('Item Upsert', () => {

  before(done => clear('Item', done));

  let item;

  beforeEach((done) => {
    item = Item.fakeExcept('description');
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able upsert non existing', (done) => {
    Item.upsert(item, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(item._id);
      expect(upserted.name).to.be.eql(item.name);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by _id', (done) => {
    const updates = {
      _id: item._id,
      description: faker.lorem.sentence()
    };
    Item.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(item._id);
      expect(upserted.name).to.be.eql(item.name);
      expect(upserted.description).to.not.be.eql(item.description);
      expect(upserted.description).to.be.eql(updates.description);
      expect(upserted.createdAt).to.be.eql(item.createdAt);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by fields', (done) => {
    const updates = {
      name: item.name,
      description: faker.lorem.sentence()
    };
    Item.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(item._id);
      expect(upserted.name).to.be.eql(item.name);
      expect(upserted.description).to.not.be.eql(item.description);
      expect(upserted.description).to.be.eql(updates.description);
      expect(upserted.createdAt).to.be.eql(item.createdAt);
      done(error, upserted);
    });
  });

  after(done => clear('Item', done));

});
