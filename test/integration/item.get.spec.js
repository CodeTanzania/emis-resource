'use strict';

/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item } = include(__dirname, '..', '..');

describe('Item Get', () => {
  before(done => clear('Item', done));

  let items = Item.fake(32);

  before(done => {
    Item.insertMany(items, (error, created) => {
      items = created;
      done(error, created);
    });
  });

  it('should be able to get without options', done => {
    Item.get((error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length(10);
      expect(results.total).to.exist;
      expect(results.total).to.be.equal(32);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(4);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should be able to get with options', done => {
    const options = { page: 1, limit: 20 };
    Item.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length(20);
      expect(results.total).to.exist;
      expect(results.total).to.be.equal(32);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(20);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(2);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should be able to search with options', done => {
    const options = { filter: { q: items[0].name } };
    Item.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length.of.at.least(1);
      expect(results.total).to.exist;
      expect(results.total).to.be.at.least(1);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should parse filter options', done => {
    const options = { filter: { name: items[0].name } };
    Item.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length.of.at.least(1);
      expect(results.total).to.exist;
      expect(results.total).to.be.at.least(1);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  after(done => clear('Item', done));
});
