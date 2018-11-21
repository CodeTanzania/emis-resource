'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Item } = require(path.join(__dirname, '..', '..'));


describe('Item Static Post', () => {

  before(done => clear('Item', done));

  let item = Item.fake();

  it('should be able to post', (done) => {
    Item.post(item, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(item._id);
      expect(created.name).to.eql(item.name);
      done(error, created);
    });
  });

  after(done => clear('Item', done));

});

describe('Item Instance Post', () => {

  before(done => clear('Item', done));

  let item = Item.fake();

  it('should be able to post', (done) => {
    item.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(item._id);
      expect(created.name).to.eql(item.name);
      done(error, created);
    });
  });

  after(done => clear('Item', done));

});
