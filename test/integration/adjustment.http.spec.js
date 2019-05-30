'use strict';


/* dependencies */
const request = require('supertest');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock, Adjustment } = include(__dirname, '..', '..');
const { apiVersion, app } = include(__dirname, '..', '..');


describe('Adjustment Rest API', () => {

  before(done => {
    clear('Adjustment', 'Stock', 'Item', 'Party', 'Feature', done);
  });

  let location = Feature.fake();
  let store = Feature.fake();
  let owner = Party.fake();
  let item = Item.fake();
  let stock = Stock.fake();
  let adjustment = Adjustment.fake();

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

  before((done) => {
    adjustment.item = item;
    adjustment.stock = stock;
    adjustment.store = store;
    adjustment.party = owner;
    done();
  });

  it('should handle HTTP POST on /adjustments', (done) => {
    request(app)
      .post(`/${apiVersion}/adjustments`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(adjustment)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = new Adjustment(response.body);

        expect(created._id).to.exist;
        expect(created._id).to.be.eql(adjustment._id);
        expect(created.item).to.exist;

        //set
        adjustment = created;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /adjustments', (done) => {
    request(app)
      .get(`/${apiVersion}/adjustments`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        //assert payload
        const result = response.body;
        expect(result.data).to.exist;
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;
        expect(result.lastModified).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP GET on /adjustments/id:', (done) => {
    request(app)
      .get(`/${apiVersion}/adjustments/${adjustment._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = new Adjustment(response.body);

        expect(found._id).to.exist;
        expect(found._id).to.be.eql(adjustment._id);
        expect(found.item.name).to.be.equal(adjustment.item.name);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /adjustments/id:', (done) => {
    const { quantity } = adjustment.fakeOnly('quantity');
    request(app)
      .patch(`/${apiVersion}/adjustments/${adjustment._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ quantity })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Adjustment(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(adjustment._id);
        expect(patched.item.name).to.be.equal(adjustment.item.name);

        //set
        adjustment = patched;

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /adjustments/id:', (done) => {
    const { quantity } = adjustment.fakeOnly('quantity');
    request(app)
      .put(`/${apiVersion}/adjustments/${adjustment._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ quantity })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = new Adjustment(response.body);

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(adjustment._id);
        expect(updated.item.name).to.be.equal(adjustment.item.name);

        //set
        adjustment = updated;

        done(error, response);
      });
  });

  it('should handle HTTP DELETE on /adjustments/:id', (done) => {
    request(app)
      .delete(`/${apiVersion}/adjustments/${adjustment._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = new Adjustment(response.body);

        expect(deleted._id).to.exist;
        expect(deleted._id).to.be.eql(adjustment._id);
        expect(deleted.item.name).to.be.equal(adjustment.item.name);
        done(error, response);
      });
  });

  after(done => {
    clear('Adjustment', 'Stock', 'Item', 'Party', 'Feature', done);
  });

});
