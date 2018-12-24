'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock, Adjustment } = include(__dirname, '..', '..');

describe('Adjustment Static Delete', () => {

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

  after(done => {
    clear('Adjustment', 'Stock', 'Item', 'Party', 'Feature', done);
  });

});

describe('Adjustment Instance Delete', () => {

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

  after(done => {
    clear('Adjustment', 'Stock', 'Item', 'Party', 'Feature', done);
  });

});
