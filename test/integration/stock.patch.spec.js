'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock } = require(path.join(__dirname, '..', '..'));


describe('Stock Static Patch', () => {

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

  before((done) => {
    stock.store = store;
    stock.owner = owner;
    stock.item = item;
    stock.post((error, created) => {
      stock = created;
      done(error, created);
    });
  });

  it('should be able to patch', (done) => {
    stock = stock.fakeOnly('minAllowed');
    Stock.patch(stock._id, stock, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(stock._id);
      expect(updated.minAllowed).to.eql(stock.minAllowed);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Stock.fake();
    Stock.patch(fake._id, fake, (error, updated) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear('Stock', 'Item', 'Party', 'Feature', done));

});


describe('Stock Instance Patch', () => {

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

  before((done) => {
    stock.store = store;
    stock.owner = owner;
    stock.item = item;
    stock.post((error, created) => {
      stock = created;
      done(error, created);
    });
  });

  it('should be able to patch', (done) => {
    stock = stock.fakeOnly('minAllowed');
    stock.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(stock._id);
      expect(updated.minAllowed).to.eql(stock.minAllowed);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    stock.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(stock._id);
      done();
    });
  });

  after(done => clear('Stock', 'Item', 'Party', 'Feature', done));

});
