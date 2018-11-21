'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item, Adjustment } = require(path.join(__dirname, '..', '..'));

describe('Adjustment Static Post', () => {

  before(done => clear('Adjustment', 'Item', 'Party', done));

  let item = Item.fake();
  let adjustment = Adjustment.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to post', (done) => {
    adjustment.item = item;
    Adjustment.post(adjustment, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(adjustment._id);
      expect(created.item._id).to.eql(adjustment.item._id);
      done(error, created);
    });
  });

  after(done => clear('Adjustment', 'Item', 'Party', done));

});

describe('Adjustment Instance Post', () => {

  before(done => clear('Adjustment', 'Item', 'Party', done));

  let item = Item.fake();
  let adjustment = Adjustment.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to post', (done) => {
    adjustment.item = item;
    adjustment.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(adjustment._id);
      expect(created.item._id).to.eql(adjustment.item._id);
      done(error, created);
    });
  });

  after(done => clear('Adjustment', 'Item', 'Party', done));

});
