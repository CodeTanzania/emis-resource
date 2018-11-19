'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Item } = require(path.join(__dirname, '..', '..'));

describe('Item Static Delete', () => {

  before((done) => {
    Item.deleteMany(done);
  });

  let item = Item.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to delete', (done) => {
    Item.del(item._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(item._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    Item.del(item._id, (error, deleted) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after((done) => {
    Item.deleteMany(done);
  });

});

describe('Item Instance Delete', () => {

  before((done) => {
    Item.deleteMany(done);
  });

  let item = Item.fake();

  before((done) => {
    item.post((error, created) => {
      item = created;
      done(error, created);
    });
  });

  it('should be able to delete', (done) => {
    item.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(item._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    item.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(item._id);
      done();
    });
  });

  after((done) => {
    Item.deleteMany(done);
  });

});
