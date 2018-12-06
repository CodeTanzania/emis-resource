'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock, Adjustment } = require(path.join(__dirname, '..', '..'));


describe('Adjustment getById', () => {

  before(done => {
    clear('Adjustment', 'Stock', 'Item', 'Party', 'Feature', done);
  });

  let store = Feature.fake();
  let owner = Party.fake();
  let item = Item.fake();
  let stock = Stock.fake();
  let adjustment = Adjustment.fake();

  before((done) => {
    store.post((error, created) => {
      store = created;
      done(error, created);
    });
  });

  before((done) => {
    owner.post((error, created) => {
      owner = created;
      done(error, created);
    });
  });

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  before((done) => {
    stock.store = store;
    stock.owner = owner;
    stock.item = item;
    stock.post((error, created) => {
      stock = created;
      done(error, created);
    });
  });

  before((done) => {
    adjustment.item = item;
    adjustment.stock = stock;
    adjustment.store = store;
    adjustment.party = owner;
    adjustment.post((error, created) => {
      adjustment = created;
      done(error, created);
    });
  });

  it('should be able to get an instance', (done) => {
    Adjustment.getById(adjustment._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(adjustment._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {
    const options = {
      _id: adjustment._id,
      select: 'item'
    };

    Adjustment.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(adjustment._id);
      expect(found.item).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length.at.least(2);
      _.map([
        'createdAt',
        'updatedAt'
      ], function (field) {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });

  });

  it('should throw if not exists', (done) => {
    const fake = Adjustment.fake();
    Adjustment.getById(fake._id, (error, found) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(found).to.not.exist;
      done();
    });
  });

  after(done => {
    clear('Adjustment', 'Stock', 'Item', 'Party', 'Feature', done);
  });

});
