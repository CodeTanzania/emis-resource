'use strict';

/* dependencies */
const request = require('supertest');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Warehouse, apiVersion, app } = include(__dirname, '..', '..');
const NATURE_BUILDING = 'Building';
const FAMILY_WAREHOUSE = 'Warehouse';

describe('Warehouse Rest API', function() {
  before(done => clear('Feature', done));

  let warehouse = Warehouse.fake();

  it('should handle HTTP POST on /warehouses', done => {
    request(app)
      .post(`/${apiVersion}/warehouses`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(warehouse)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = new Warehouse(response.body);

        expect(created._id).to.exist;
        expect(created._id).to.be.eql(warehouse._id);
        expect(created.name).to.exist;
        expect(created.nature).to.be.equal(NATURE_BUILDING);
        expect(created.family).to.be.equal(FAMILY_WAREHOUSE);

        //set
        warehouse = created;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /warehouses', done => {
    request(app)
      .get(`/${apiVersion}/warehouses`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        //assert payload
        const result = response.body;
        expect(result.data).to.exist;
        expect(result.data).to.have.length.at.least(1);
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;
        expect(result.lastModified).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP GET on /warehouses/id:', done => {
    request(app)
      .get(`/${apiVersion}/warehouses/${warehouse._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = new Warehouse(response.body);

        expect(found._id).to.exist;
        expect(found._id).to.be.eql(warehouse._id);
        expect(found.name).to.be.equal(warehouse.name);
        expect(found.nature).to.be.equal(NATURE_BUILDING);
        expect(found.family).to.be.equal(FAMILY_WAREHOUSE);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /warehouses/id:', done => {
    const { name } = warehouse.fakeOnly('name');
    request(app)
      .patch(`/${apiVersion}/warehouses/${warehouse._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Warehouse(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(warehouse._id);
        expect(patched.name).to.be.equal(warehouse.name);
        expect(patched.nature).to.be.equal(NATURE_BUILDING);
        expect(patched.family).to.be.equal(FAMILY_WAREHOUSE);

        //set
        warehouse = patched;

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /warehouses/id:', done => {
    const { name } = warehouse.fakeOnly('name');
    request(app)
      .put(`/${apiVersion}/warehouses/${warehouse._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = new Warehouse(response.body);

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(warehouse._id);
        expect(updated.name).to.be.equal(warehouse.name);
        expect(updated.nature).to.be.equal(NATURE_BUILDING);
        expect(updated.family).to.be.equal(FAMILY_WAREHOUSE);

        //set
        warehouse = updated;

        done(error, response);
      });
  });

  it('should handle HTTP DELETE on /warehouses/:id', done => {
    request(app)
      .delete(`/${apiVersion}/warehouses/${warehouse._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = new Warehouse(response.body);

        expect(deleted._id).to.exist;
        expect(deleted._id).to.be.eql(warehouse._id);
        expect(deleted.name).to.be.equal(warehouse.name);
        expect(deleted.nature).to.be.equal(NATURE_BUILDING);
        expect(deleted.family).to.be.equal(FAMILY_WAREHOUSE);

        done(error, response);
      });
  });

  after(done => clear('Feature', done));
});
