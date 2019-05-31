'use strict';

/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Item } = include(__dirname, '..', '..');

describe('Item Instance', () => {
  it('`preValidate` should be a function', () => {
    const item = Item.fake();
    expect(item.preValidate).to.exist;
    expect(item.preValidate).to.be.a('function');
    expect(item.preValidate.length).to.be.equal(1);
    expect(item.preValidate.name).to.be.equal('preValidate');
  });

  it('`preValidate` should set code', done => {
    const item = Item.fake();
    item.code = undefined;
    expect(item.code).to.not.exist;

    item.preValidate(error => {
      expect(item.code).to.exist;
      done(error);
    });
  });

  it('`preValidate` should set color', done => {
    const item = Item.fake();
    item.color = undefined;
    expect(item.color).to.not.exist;

    item.preValidate(error => {
      expect(item.color).to.exist;
      done(error);
    });
  });
});

describe('Item Statics', () => {
  it('should expose model name', () => {
    expect(Item.MODEL_NAME).to.exist;
    expect(Item.MODEL_NAME).to.be.equal('Item');
  });

  it('should expose collection name', () => {
    expect(Item.COLLECTION_NAME).to.exist;
    expect(Item.COLLECTION_NAME).to.be.equal('items');
  });

  it('should expose autopulate options', () => {
    expect(Item.OPTION_AUTOPOPULATE).to.exist;
    expect(Item.OPTION_AUTOPOPULATE).to.be.eql({
      select: { type: 1, code: 1, name: 1, uom: 1, color: 1, icon: 1 },
      maxDepth: Item.POPULATION_MAX_DEPTH,
    });
  });

  it('should expose item types', () => {
    expect(Item.DEFAULT_TYPE).to.exist;
    expect(Item.DEFAULT_TYPE).to.be.equal('Other');

    expect(Item.TYPES).to.exist;
    expect(Item.TYPES).to.be.eql(
      _.orderBy(
        _.map(
          ['Equipment', 'Consumable', 'Vehicle', 'Service', 'Other'],
          _.startCase
        )
      )
    );
  });

  it('should expose item unit of measures', () => {
    expect(Item.DEFAULT_UOM).to.exist;
    expect(Item.DEFAULT_UOM).to.be.equal('unit');

    expect(Item.UOMS).to.exist;
    expect(Item.UOMS).to.be.eql(
      _.orderBy(
        _.map(
          [
            'bag',
            'box',
            'carton',
            'drum',
            'dozen',
            'gallon',
            'kit',
            'pallet',
            'piece',
            'bucket',
            'bottle',
            'crate',
            'set',
            'bale',
            'roll',
            'unit',
          ],
          _.toLower
        )
      )
    );
  });
});
