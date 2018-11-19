'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { Schema } = require('mongoose');
const { Item } = require(path.join(__dirname, '..', '..'));


describe('Item Schema', () => {

  it('should have type field', () => {
    const type = Item.path('type');

    expect(type).to.exist;
    expect(type).to.be.instanceof(Schema.Types.String);
    expect(type.options).to.exist;
    expect(type.options).to.be.an('object');
    expect(type.options.type).to.exist;
    expect(type.options.trim).to.be.true;
    expect(type.options.required).to.be.true;
    expect(type.options.enum).to.exist;
    expect(type.options.enum).to.be.eql(Item.TYPES);
    expect(type.options.index).to.be.true;
    expect(type.options.searchable).to.be.true;
    expect(type.options.default).to.exist;
    expect(type.options.default).to.be.eql(Item.DEFAULT_TYPE);
    expect(type.options.fake).to.exist;
    expect(type.options.fake).to.be.true;
  });

  it('should have code field', () => {
    const code = Item.path('code');

    expect(code).to.exist;
    expect(code).to.be.instanceof(Schema.Types.String);
    expect(code.options).to.exist;
    expect(code.options).to.be.an('object');
    expect(code.options.type).to.exist;
    expect(code.options.trim).to.be.true;
    expect(code.options.required).to.be.true;
    expect(code.options.uppercase).to.be.true;
    expect(code.options.index).to.be.true;
    // expect(code.options.unique).to.be.true;
    expect(code.options.searchable).to.be.true;
  });

  it('should have name field', () => {
    const name = Item.path('name');

    expect(name).to.exist;
    expect(name).to.be.instanceof(Schema.Types.String);
    expect(name.options).to.exist;
    expect(name.options).to.be.an('object');
    expect(name.options.type).to.exist;
    expect(name.options.trim).to.be.true;
    expect(name.options.required).to.be.true;
    // expect(name.options.startcase).to.be.true;
    expect(name.options.index).to.be.true;
    expect(name.options.unique).to.be.true;
    expect(name.options.searchable).to.be.true;
    expect(name.options.fake).to.exist;
    expect(name.options.fake).to.be.an('object');
  });

  it('should have description field', () => {
    const description = Item.path('description');

    expect(description).to.exist;
    expect(description).to.be.instanceof(Schema.Types.String);
    expect(description.options).to.exist;
    expect(description.options).to.be.an('object');
    expect(description.options.type).to.exist;
    expect(description.options.trim).to.be.true;
    expect(description.options.index).to.be.true;
    expect(description.options.searchable).to.be.true;
    expect(description.options.fake).to.exist;
    expect(description.options.fake).to.be.an('object');
  });

  it('should have uom field', () => {
    const uom = Item.path('uom');

    expect(uom).to.exist;
    expect(uom).to.be.instanceof(Schema.Types.String);
    expect(uom.options).to.exist;
    expect(uom.options).to.be.an('object');
    expect(uom.options.type).to.exist;
    expect(uom.options.trim).to.be.true;
    expect(uom.options.required).to.be.true;
    expect(uom.options.enum).to.exist;
    expect(uom.options.enum).to.be.eql(Item.UOMS);
    expect(uom.options.index).to.be.true;
    expect(uom.options.searchable).to.be.true;
    expect(uom.options.default).to.exist;
    expect(uom.options.default).to.be.eql(Item.DEFAULT_UOM);
    expect(uom.options.fake).to.exist;
    expect(uom.options.fake).to.be.true;
  });

  it('should have minStockAllowed field', () => {
    const minStockAllowed = Item.path('minStockAllowed');

    expect(minStockAllowed).to.exist;
    expect(minStockAllowed).to.be.instanceof(Schema.Types.Number);
    expect(minStockAllowed.options).to.exist;
    expect(minStockAllowed.options).to.be.an('object');
    expect(minStockAllowed.options.type).to.exist;
    expect(minStockAllowed.options.min).to.exist;
    expect(minStockAllowed.options.min).to.be.eql(0);
    expect(minStockAllowed.options.default).to.exist;
    expect(minStockAllowed.options.default).to.be.eql(0);
    expect(minStockAllowed.options.fake).to.exist;
    expect(minStockAllowed.options.fake).to.be.an('object');
  });

  it('should have maxStockAllowed field', () => {
    const maxStockAllowed = Item.path('maxStockAllowed');

    expect(maxStockAllowed).to.exist;
    expect(maxStockAllowed).to.be.instanceof(Schema.Types.Number);
    expect(maxStockAllowed.options).to.exist;
    expect(maxStockAllowed.options).to.be.an('object');
    expect(maxStockAllowed.options.type).to.exist;
    expect(maxStockAllowed.options.min).to.exist;
    expect(maxStockAllowed.options.min).to.be.eql(0);
    expect(maxStockAllowed.options.default).to.exist;
    expect(maxStockAllowed.options.default).to.be.eql(0);
    expect(maxStockAllowed.options.fake).to.exist;
    expect(maxStockAllowed.options.fake).to.be.an('object');
  });


  it('should have color field', () => {
    const color = Item.path('color');

    expect(color).to.exist;
    expect(color).to.be.instanceof(Schema.Types.String);
    expect(color.options).to.exist;
    expect(color.options).to.be.an('object');
    expect(color.options.type).to.exist;
    expect(color.options.trim).to.be.true;
    expect(color.options.uppercase).to.be.true;
    expect(color.options.enum).to.exist;
    expect(color.options.enum).to.be.eql(_.values(Item.COLORS));
    expect(color.options.default).to.exist;
    expect(color.options.default).to.be.eql(Item.DEFAULT_COLOR);
    expect(color.options.fake).to.exist;
    expect(color.options.fake).to.be.true;
  });

  it('should have icon field', () => {
    const icon = Item.path('icon');

    expect(icon).to.exist;
    expect(icon).to.be.instanceof(Schema.Types.String);
    expect(icon.options).to.exist;
    expect(icon.options).to.be.an('object');
    expect(icon.options.type).to.exist;
    expect(icon.options.trim).to.be.true;
    expect(icon.options.fake).to.not.exist;
  });

  it('should have expirable field', () => {
    const expirable = Item.path('expirable');

    expect(expirable).to.exist;
    expect(expirable).to.be.instanceof(Schema.Types.Boolean);
    expect(expirable.options).to.exist;
    expect(expirable.options).to.be.an('object');
    expect(expirable.options.type).to.exist;
    expect(expirable.options.index).to.be.true;
    expect(expirable.options.default).to.be.false;
    expect(expirable.options.fake).to.not.exist;
  });

});
