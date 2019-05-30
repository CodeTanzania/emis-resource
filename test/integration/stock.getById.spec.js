'use strict';


/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock } = include(__dirname, '..', '..');


describe('Stock getById', () => {

  before(done => clear('Stock', 'Item', 'Party', 'Feature', done));

  let location = Feature.fake();
  let store = Feature.fake();
  let owner = Party.fake();
  let item = Item.fake();
  let stock = Stock.fake();

  before((done) => {
    location.post((error, created) => {
      location = created;
      done(error, created);
    });
  });

  before((done) => {
    store.post((error, created) => {
      store = created;
      done(error, created);
    });
  });

  before((done) => {
    owner.location = location;
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

  it('should be able to get an instance', (done) => {
    Stock.getById(stock._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(stock._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {
    const options = {
      _id: stock._id,
      select: 'item'
    };

    Stock.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(stock._id);
      expect(found.item).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length.at.least(2);
      _.map([
        'minAllowed',
        'createdAt',
        'updatedAt'
      ], function (field) {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });

  });

  it('should throw if not exists', (done) => {
    const fake = Stock.fake();
    Stock.getById(fake._id, (error, found) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(found).to.not.exist;
      done();
    });
  });

  after(done => clear('Stock', 'Item', 'Party', 'Feature', done));

});
