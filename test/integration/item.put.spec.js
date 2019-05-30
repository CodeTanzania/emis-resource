'use strict';


/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item } = include(__dirname, '..', '..');


describe('Item Static Put', () => {

  before(done => clear('Item', done));

  let item = Item.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to put', (done) => {
    item = item.fakeOnly('name');
    Item.put(item._id, item, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(item._id);
      expect(updated.name).to.eql(item.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Item.fake().toObject();
    Item.put(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear('Item', done));

});


describe('Item Instance Put', () => {

  before(done => clear('Item', done));

  let item = Item.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to put', (done) => {
    item = item.fakeOnly('name');
    item.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(item._id);
      expect(updated.name).to.eql(item.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    item.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(item._id);
      done();
    });
  });

  after(done => clear('Item', done));

});
