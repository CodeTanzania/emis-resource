'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item, Adjustment } = require(path.join(__dirname, '..', '..'));


describe('Adjustment getById', () => {

  before(done => clear('Adjustment', 'Item', 'Party', done));

  let item = Item.fake();
  let adjustment = Adjustment.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  before((done) => {
    adjustment.item = item;
    adjustment.post((error, created) => {
      adjustment = created;
      done(error, created);
    });
  });

  it('should be able to get an instance', (done) => {
    Adjustment.getById(adjustment._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(adjustment._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {
    const options = {
      _id: adjustment._id,
      select: 'item'
    };

    Adjustment.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(adjustment._id);
      expect(found.item).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length.at.least(2);
      _.map([
        'createdAt',
        'updatedAt'
      ], function (field) {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });

  });

  it('should throw if not exists', (done) => {
    const fake = Adjustment.fake();
    Adjustment.getById(fake._id, (error, found) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(found).to.not.exist;
      done();
    });
  });

  after(done => clear('Adjustment', 'Item', 'Party', done));

});
