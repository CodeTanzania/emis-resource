'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item, Adjustment } = require(path.join(__dirname, '..', '..'));

describe('Adjustment Static Delete', () => {

  before(done => clear('Adjustment', 'Item', done));

  let item = Item.fake();
  let adjustment = Adjustment.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  before((done) => {
    adjustment.item = item;
    adjustment.post((error, created) => {
      adjustment = created;
      done(error, created);
    });
  });

  it('should be able to delete', (done) => {
    Adjustment.del(adjustment._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(adjustment._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    Adjustment.del(adjustment._id, (error, deleted) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => clear('Adjustment', 'Item', done));

});

describe('Adjustment Instance Delete', () => {

  before(done => clear('Adjustment', 'Item', done));

  let item = Item.fake();
  let adjustment = Adjustment.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  before((done) => {
    adjustment.item = item;
    adjustment.post((error, created) => {
      adjustment = created;
      done(error, created);
    });
  });

  it('should be able to delete', (done) => {
    adjustment.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(adjustment._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    adjustment.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(adjustment._id);
      done();
    });
  });

  after(done => clear('Adjustment', 'Item', done));

});
