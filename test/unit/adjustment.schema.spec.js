'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Schema } = require('mongoose');
const { Feature } = require('@codetanzania/emis-feature');
const { Item, Stock, Adjustment } = include(__dirname, '..', '..');


describe('Adjustment Schema', () => {

  it('should have type field', () => {
    const type = Adjustment.path('type');

    expect(type).to.exist;
    expect(type).to.be.instanceof(Schema.Types.String);
    expect(type.options).to.exist;
    expect(type.options).to.be.an('object');
    expect(type.options.type).to.exist;
    expect(type.options.trim).to.be.true;
    expect(type.options.required).to.be.true;
    expect(type.options.enum).to.exist;
    expect(type.options.enum).to.be.eql(Adjustment.TYPES);
    expect(type.options.index).to.be.true;
    expect(type.options.searchable).to.be.true;
    expect(type.options.fake).to.exist;
    expect(type.options.fake).to.be.true;
  });

  it('should have reason field', () => {
    const reason = Adjustment.path('reason');

    expect(reason).to.exist;
    expect(reason).to.be.instanceof(Schema.Types.String);
    expect(reason.options).to.exist;
    expect(reason.options).to.be.an('object');
    expect(reason.options.type).to.exist;
    expect(reason.options.trim).to.be.true;
    expect(reason.options.required).to.be.true;
    expect(reason.options.enum).to.exist;
    expect(reason.options.enum).to.be.eql(Adjustment.REASONS);
    expect(reason.options.index).to.be.true;
    expect(reason.options.searchable).to.be.true;
    expect(reason.options.fake).to.exist;
    expect(reason.options.fake).to.be.true;
  });

  it('should have item field', () => {
    const item = Adjustment.path('item');

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

  it('should have stock field', () => {
    const stock = Adjustment.path('stock');

    expect(stock).to.exist;
    expect(stock).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(stock.options).to.exist;
    expect(stock.options).to.be.an('object');
    expect(stock.options.type).to.exist;
    expect(stock.options.ref).to.exist;
    expect(stock.options.ref).to.be.eql(Stock.MODEL_NAME);
    // expect(stock.options.required).to.be.true;
    expect(stock.options.index).to.be.true;
    expect(stock.options.exists).to.be.true;
    // expect(stock.options.autopopulate).to.exist;
    // expect(stock.options.autopopulate).to.be.an('object');
  });

  it('should have store field', () => {
    const store = Adjustment.path('store');

    expect(store).to.exist;
    expect(store).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(store.options).to.exist;
    expect(store.options).to.be.an('object');
    expect(store.options.type).to.exist;
    expect(store.options.ref).to.exist;
    expect(store.options.ref).to.be.eql(Feature.MODEL_NAME);
    // expect(store.options.required).to.be.true;
    expect(store.options.index).to.be.true;
    expect(store.options.exists).to.be.true;
    // expect(store.options.autopopulate).to.exist;
    // expect(store.options.autopopulate).to.be.an('object');
  });

  it('should have quantity field', () => {
    const quantity = Adjustment.path('quantity');

    expect(quantity).to.exist;
    expect(quantity).to.be.instanceof(Schema.Types.Number);
    expect(quantity.options).to.exist;
    expect(quantity.options).to.be.an('object');
    expect(quantity.options.type).to.exist;
    expect(quantity.options.min).to.exist;
    expect(quantity.options.min).to.be.eql(0);
    expect(quantity.options.required).to.be.true;
    expect(quantity.options.fake).to.exist;
    expect(quantity.options.fake).to.be.an('object');
  });

  it('should have cost field', () => {
    const cost = Adjustment.path('cost');

    expect(cost).to.exist;
    expect(cost).to.be.instanceof(Schema.Types.Number);
    expect(cost.options).to.exist;
    expect(cost.options).to.be.an('object');
    expect(cost.options.type).to.exist;
    expect(cost.options.min).to.exist;
    expect(cost.options.min).to.be.eql(0);
    expect(cost.options.required).to.be.true;
    expect(cost.options.fake).to.exist;
    expect(cost.options.fake).to.be.an('object');
  });

  it('should have remarks field', () => {
    const remarks = Adjustment.path('remarks');

    expect(remarks).to.exist;
    expect(remarks).to.be.instanceof(Schema.Types.String);
    expect(remarks.options).to.exist;
    expect(remarks.options).to.be.an('object');
    expect(remarks.options.type).to.exist;
    expect(remarks.options.trim).to.be.true;
    expect(remarks.options.required).to.be.true;
    expect(remarks.options.index).to.be.true;
    expect(remarks.options.searchable).to.be.true;
    expect(remarks.options.fake).to.exist;
    expect(remarks.options.fake).to.be.an('object');
  });

});
