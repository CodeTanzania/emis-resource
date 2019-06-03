'use strict';

/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item } = include(__dirname, '..', '..');

describe('Item Static Delete', () => {
  before(done => clear('Item', done));

  let item = Item.fake();

  before(done => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    Item.del(item._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(item._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    Item.del(item._id, (error, deleted) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => clear('Item', done));
});

describe('Item Instance Delete', () => {
  before(done => clear('Item', done));

  let item = Item.fake();

  before(done => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    item.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(item._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    item.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(item._id);
      done();
    });
  });

  after(done => clear('Item', done));
});
