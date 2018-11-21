'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item, Adjustment } = require(path.join(__dirname, '..', '..'));


describe('Adjustment Static Patch', () => {

  before(done => clear('Adjustment', 'Item', 'Party', done));

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

  it('should be able to patch', (done) => {
    adjustment = adjustment.fakeOnly('quantity');
    Adjustment.patch(adjustment._id, adjustment, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(adjustment._id);
      expect(updated.quantity).to.eql(adjustment.quantity);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Adjustment.fake();
    Adjustment.patch(fake._id, fake, (error, updated) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear('Adjustment', 'Item', 'Party', done));

});


describe('Adjustment Instance Patch', () => {

  before(done => clear('Adjustment', 'Item', 'Party', done));

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

  it('should be able to patch', (done) => {
    adjustment = adjustment.fakeOnly('quantity');
    adjustment.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(adjustment._id);
      expect(updated.quantity).to.eql(adjustment.quantity);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    adjustment.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(adjustment._id);
      done();
    });
  });

  after(done => clear('Adjustment', 'Item', 'Party', done));

});
