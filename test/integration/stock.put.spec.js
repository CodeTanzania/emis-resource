'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock } = require(path.join(__dirname, '..', '..'));


describe('Stock Static Put', () => {

  before(done => clear('Stock', 'Item', 'Party', done));

  let owner = Party.fake();
  let item = Item.fake();
  let stock = Stock.fake();

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
    stock.owner = owner;
    stock.item = item;
    stock.post((error, created) => {
      stock = created;
      done(error, created);
    });
  });

  it('should be able to put', (done) => {
    stock = stock.fakeOnly('minAllowed');
    Stock.put(stock._id, stock, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(stock._id);
      expect(updated.minAllowed).to.eql(stock.minAllowed);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Stock.fake();
    Stock.put(fake._id, fake, (error, updated) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear('Stock', 'Item', 'Party', done));

});


describe('Stock Instance Put', () => {

  before(done => clear('Stock', 'Item', 'Party', done));

  let owner = Party.fake();
  let item = Item.fake();
  let stock = Stock.fake();

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
    stock.owner = owner;
    stock.item = item;
    stock.post((error, created) => {
      stock = created;
      done(error, created);
    });
  });

  it('should be able to put', (done) => {
    stock = stock.fakeOnly('minAllowed');
    stock.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(stock._id);
      expect(updated.minAllowed).to.eql(stock.minAllowed);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    stock.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(stock._id);
      done();
    });
  });

  after(done => clear('Stock', 'Item', 'Party', done));

});
