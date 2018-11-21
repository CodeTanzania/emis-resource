'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock } = require(path.join(__dirname, '..', '..'));

describe('Stock Static Delete', () => {

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

  it('should be able to delete', (done) => {
    Stock.del(stock._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(stock._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    Stock.del(stock._id, (error, deleted) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => clear('Stock', 'Item', 'Party', done));

});

describe('Stock Instance Delete', () => {

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

  it('should be able to delete', (done) => {
    stock.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(stock._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    stock.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(stock._id);
      done();
    });
  });

  after(done => clear('Stock', 'Item', 'Party', done));

});
