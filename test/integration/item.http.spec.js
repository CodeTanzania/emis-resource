'use strict';


/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item, apiVersion, app } = require(path.join(__dirname, '..', '..'));


describe('Item Rest API', function () {

  before(done => clear('Item', done));

  let item = Item.fake();

  it('should handle HTTP POST on /items', (done) => {
    request(app)
      .post(`/v${apiVersion}/items`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(item)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = new Item(response.body);

        expect(created._id).to.exist;
        expect(created._id).to.be.eql(item._id);
        expect(created.name).to.exist;

        //set
        item = created;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /items', (done) => {
    request(app)
      .get(`/v${apiVersion}/items`)
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

  it('should handle HTTP GET on /items/id:', (done) => {
    request(app)
      .get(`/v${apiVersion}/items/${item._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = new Item(response.body);

        expect(found._id).to.exist;
        expect(found._id).to.be.eql(item._id);
        expect(found.name).to.be.equal(item.name);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /items/id:', (done) => {
    const { name } = item.fakeOnly('name');
    request(app)
      .patch(`/v${apiVersion}/items/${item._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Item(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(item._id);
        expect(patched.name).to.be.equal(item.name);

        //set
        item = patched;

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /items/id:', (done) => {
    const { name } = item.fakeOnly('name');
    request(app)
      .put(`/v${apiVersion}/items/${item._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = new Item(response.body);

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(item._id);
        expect(updated.name).to.be.equal(item.name);

        //set
        item = updated;

        done(error, response);
      });
  });

  it('should handle HTTP DELETE on /items/:id', (done) => {
    request(app)
      .delete(`/v${apiVersion}/items/${item._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = new Item(response.body);

        expect(deleted._id).to.exist;
        expect(deleted._id).to.be.eql(item._id);
        expect(deleted.name).to.be.equal(item.name);
        done(error, response);
      });
  });

  after(done => clear('Item', done));

});
