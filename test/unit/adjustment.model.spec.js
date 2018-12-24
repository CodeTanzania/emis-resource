'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Adjustment } = include(__dirname, '..', '..');

describe('Adjustment Instance', () => {

  it('`preValidate` should be a function', () => {
    const adjustment = Adjustment.fake();
    expect(adjustment.preValidate).to.exist;
    expect(adjustment.preValidate).to.be.a('function');
    expect(adjustment.preValidate.length).to.be.equal(1);
    expect(adjustment.preValidate.name).to.be.equal('preValidate');
  });

});

describe('Adjustment Statics', () => {

  it('should expose model name', () => {
    expect(Adjustment.MODEL_NAME).to.exist;
    expect(Adjustment.MODEL_NAME).to.be.equal('Adjustment');
  });

  it('should expose collection name', () => {
    expect(Adjustment.COLLECTION_NAME).to.exist;
    expect(Adjustment.COLLECTION_NAME).to.be.equal('adjustments');
  });

  it('should expose autopulate options', () => {
    expect(Adjustment.OPTION_AUTOPOPULATE).to.exist;
    expect(Adjustment.OPTION_AUTOPOPULATE)
      .to.be.eql({
        maxDepth: Adjustment.POPULATION_MAX_DEPTH
      });
  });

  it('should expose adjustment types', () => {
    expect(Adjustment.TYPES).to.exist;
    expect(Adjustment.TYPES).to.be.eql(['Addition', 'Deduction']);
  });

  it('should expose adjustment reasons', () => {
    expect(Adjustment.REASONS).to.exist;
    expect(Adjustment.REASONS).to.be.eql([
      'Consumed', 'Cycle Count', 'Disposed',
      'Demaged', 'Expired', 'Purchased',
      'Sold', 'Transfered', 'Unknown'
    ]);
  });

});
