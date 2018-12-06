'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock } = require(path.join(__dirname, '..', '..'));

describe('Stock Static Post', () => {

  before(done => clear('Stock', 'Item', 'Party', 'Feature', done));

  let store = Feature.fake();
  let owner = Party.fake();
  let item = Item.fake();
  let stock = Stock.fake();

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

  it('should be able to post', (done) => {
    stock.store = store;
    stock.owner = owner;
    stock.item = item;
    Stock.post(stock, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(stock._id);
      expect(created.item._id).to.eql(stock.item._id);
      done(error, created);
    });
  });

  after(done => clear('Stock', 'Item', 'Party', 'Feature', done));

});

describe('Stock Instance Post', () => {

  before(done => clear('Stock', 'Item', 'Party', 'Feature', done));

  let store = Feature.fake();
  let owner = Party.fake();
  let item = Item.fake();
  let stock = Stock.fake();

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

  it('should be able to post', (done) => {
    stock.store = store;
    stock.owner = owner;
    stock.item = item;
    stock.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(stock._id);
      expect(created.item._id).to.eql(stock.item._id);
      done(error, created);
    });
  });

  after(done => clear('Stock', 'Item', 'Party', 'Feature', done));

});
