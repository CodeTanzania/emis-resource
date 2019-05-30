'use strict';


/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item } = include(__dirname, '..', '..');


describe('Item getById', () => {

  before(done => clear('Item', done));

  let item = Item.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to get an instance', (done) => {
    Item.getById(item._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(item._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {
    const options = {
      _id: item._id,
      select: 'name'
    };

    Item.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(item._id);
      expect(found.name).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(2);
      _.map([
        'description',
        'createdAt',
        'updatedAt'
      ], function (field) {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });

  });

  it('should throw if not exists', (done) => {
    const item = Item.fake();
    Item.getById(item._id, (error, found) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(found).to.not.exist;
      done();
    });
  });

  after(done => clear('Item', done));

});
