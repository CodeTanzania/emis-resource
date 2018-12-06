'use strict';


/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const {
  Item,
  Stock,
  apiVersion,
  app
} = require(path.join(__dirname, '..', '..'));


describe('Stock Rest API', function () {

  before(done => clear('Stock', 'Item', 'Party', 'Feature', done));

  let store = Feature.fake();
  let owner = Party.fake();
  let item = Item.fake();
  let stock = Stock.fake();

  before((done) => {
    store.post((error, created) => {
      store = created;
      stock.store = store;
      done(error, created);
    });
  });

  before((done) => {
    owner.post((error, created) => {
      owner = created;
      stock.owner = owner;
      done(error, created);
    });
  });

  before((done) => {
    item.post((error, created) => {
      item = created;
      stock.item = item;
      done(error, created);
    });
  });

  it('should handle HTTP POST on /stocks', (done) => {
    request(app)
      .post(`/v${apiVersion}/stocks`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(stock)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = new Stock(response.body);

        expect(created._id).to.exist;
        expect(created._id).to.be.eql(stock._id);
        expect(created.item).to.exist;

        //set
        stock = created;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /stocks', (done) => {
    request(app)
      .get(`/v${apiVersion}/stocks`)
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

  it('should handle HTTP GET on /stocks/id:', (done) => {
    request(app)
      .get(`/v${apiVersion}/stocks/${stock._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = new Stock(response.body);

        expect(found._id).to.exist;
        expect(found._id).to.be.eql(stock._id);
        expect(found.item.name).to.be.equal(stock.item.name);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /stocks/id:', (done) => {
    const { minAllowed } = stock.fakeOnly('minAllowed');
    request(app)
      .patch(`/v${apiVersion}/stocks/${stock._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ minAllowed })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Stock(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(stock._id);
        expect(patched.item.name).to.be.equal(stock.item.name);

        //set
        stock = patched;

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /stocks/id:', (done) => {
    const { minAllowed } = stock.fakeOnly('minAllowed');
    request(app)
      .put(`/v${apiVersion}/stocks/${stock._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ minAllowed })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = new Stock(response.body);

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(stock._id);
        expect(updated.item.name).to.be.equal(stock.item.name);

        //set
        stock = updated;

        done(error, response);
      });
  });

  it('should handle HTTP DELETE on /stocks/:id', (done) => {
    request(app)
      .delete(`/v${apiVersion}/stocks/${stock._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = new Stock(response.body);

        expect(deleted._id).to.exist;
        expect(deleted._id).to.be.eql(stock._id);
        expect(deleted.item.name).to.be.equal(stock.item.name);
        done(error, response);
      });
  });

  after(done => clear('Stock', 'Item', 'Party', 'Feature', done));

});
