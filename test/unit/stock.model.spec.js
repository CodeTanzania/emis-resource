'use strict';

/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Stock } = include(__dirname, '..', '..');

describe('Stock Instance', () => {
  it('`preValidate` should be a function', () => {
    const adjustment = Stock.fake();
    expect(adjustment.preValidate).to.exist;
    expect(adjustment.preValidate).to.be.a('function');
    expect(adjustment.preValidate.length).to.be.equal(1);
    expect(adjustment.preValidate.name).to.be.equal('preValidate');
  });
});

describe('Stock Statics', () => {
  it('should expose model name', () => {
    expect(Stock.MODEL_NAME).to.exist;
    expect(Stock.MODEL_NAME).to.be.equal('Stock');
  });

  it('should expose collection name', () => {
    expect(Stock.COLLECTION_NAME).to.exist;
    expect(Stock.COLLECTION_NAME).to.be.equal('stocks');
  });

  it('should expose autopulate options', () => {
    expect(Stock.OPTION_AUTOPOPULATE).to.exist;
    expect(Stock.OPTION_AUTOPOPULATE).to.be.eql({
      maxDepth: Stock.POPULATION_MAX_DEPTH,
    });
  });
});
