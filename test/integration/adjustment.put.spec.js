'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock, Adjustment } = require(path.join(__dirname, '..', '..'));


describe('Adjustment Static Put', () => {

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


  it('should be able to patch', (done) => {
    adjustment = adjustment.fakeOnly('quantity');
    Adjustment.put(adjustment._id, adjustment, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(adjustment._id);
      expect(updated.quantity).to.eql(adjustment.quantity);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Adjustment.fake();
    Adjustment.put(fake._id, fake, (error, updated) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => {
    clear('Adjustment', 'Stock', 'Item', 'Party', 'Feature', done);
  });

});


describe('Adjustment Instance Put', () => {

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


  it('should be able to patch', (done) => {
    adjustment = adjustment.fakeOnly('quantity');
    adjustment.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(adjustment._id);
      expect(updated.quantity).to.eql(adjustment.quantity);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    adjustment.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(adjustment._id);
      done();
    });
  });

  after(done => {
    clear('Adjustment', 'Stock', 'Item', 'Party', 'Feature', done);
  });

});
