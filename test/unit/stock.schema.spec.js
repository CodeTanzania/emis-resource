'use strict';

/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Schema } = require('mongoose');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const { Item, Stock } = include(__dirname, '..', '..');

describe('Stock Schema', () => {
  it('should have store field', () => {
    const store = Stock.path('store');

    expect(store).to.exist;
    expect(store).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(store.options).to.exist;
    expect(store.options).to.be.an('object');
    expect(store.options.type).to.exist;
    expect(store.options.ref).to.exist;
    expect(store.options.ref).to.be.eql(Feature.MODEL_NAME);
    expect(store.options.required).to.be.true;
    expect(store.options.index).to.be.true;
    expect(store.options.exists).to.be.true;
    expect(store.options.autopopulate).to.exist;
    expect(store.options.autopopulate).to.be.an('object');
  });

  it('should have owner field', () => {
    const owner = Stock.path('owner');

    expect(owner).to.exist;
    expect(owner).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(owner.options).to.exist;
    expect(owner.options).to.be.an('object');
    expect(owner.options.type).to.exist;
    expect(owner.options.ref).to.exist;
    expect(owner.options.ref).to.be.eql(Party.MODEL_NAME);
    expect(owner.options.required).to.be.true;
    expect(owner.options.index).to.be.true;
    expect(owner.options.exists).to.be.true;
    expect(owner.options.autopopulate).to.exist;
    expect(owner.options.autopopulate).to.be.an('object');
  });

  it('should have item field', () => {
    const item = Stock.path('item');

    expect(item).to.exist;
    expect(item).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(item.options).to.exist;
    expect(item.options).to.be.an('object');
    expect(item.options.type).to.exist;
    expect(item.options.ref).to.exist;
    expect(item.options.ref).to.be.eql(Item.MODEL_NAME);
    expect(item.options.required).to.be.true;
    expect(item.options.index).to.be.true;
    expect(item.options.exists).to.be.true;
    expect(item.options.autopopulate).to.exist;
    expect(item.options.autopopulate).to.be.an('object');
  });

  it('should have minAllowed field', () => {
    const minAllowed = Stock.path('minAllowed');

    expect(minAllowed).to.exist;
    expect(minAllowed).to.be.instanceof(Schema.Types.Number);
    expect(minAllowed.options).to.exist;
    expect(minAllowed.options).to.be.an('object');
    expect(minAllowed.options.type).to.exist;
    expect(minAllowed.options.min).to.exist;
    expect(minAllowed.options.min).to.be.eql(0);
    expect(minAllowed.options.default).to.exist;
    expect(minAllowed.options.default).to.be.eql(0);
    expect(minAllowed.options.fake).to.exist;
    expect(minAllowed.options.fake).to.be.an('object');
  });

  it('should have maxAllowed field', () => {
    const maxAllowed = Stock.path('maxAllowed');

    expect(maxAllowed).to.exist;
    expect(maxAllowed).to.be.instanceof(Schema.Types.Number);
    expect(maxAllowed.options).to.exist;
    expect(maxAllowed.options).to.be.an('object');
    expect(maxAllowed.options.type).to.exist;
    expect(maxAllowed.options.min).to.exist;
    expect(maxAllowed.options.min).to.be.eql(0);
    expect(maxAllowed.options.default).to.exist;
    expect(maxAllowed.options.default).to.be.eql(0);
    expect(maxAllowed.options.fake).to.exist;
    expect(maxAllowed.options.fake).to.be.an('object');
  });
});
