'use strict';


/**
 * @module Adjustment
 * @name Adjustment
 * @description WIP
 *
 * @see {@link https://en.wikipedia.org/wiki/Disaster}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const { getString } = require('@lykmapipo/env');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Schema } = require('mongoose');
const { ObjectId } = Schema.Types;
const Item = require(path.join(__dirname, 'item.model'));


/* adjustment types */ //TODO type color and icon
const TYPE_ADDITION = 'Addition';
const TYPE_DEDUCTION = 'Deduction';
const TYPES = [TYPE_ADDITION, TYPE_DEDUCTION];


/* adjustment reasons */ //TODO reason color and icon
const REASONS = [
  'Consumed', 'Cycle Count', 'Disposed',
  'Demaged', 'Expired', 'Purchased',
  'Sold', 'Transfered', 'Unknown'
];


/* schema options */
const POPULATION_MAX_DEPTH = 1;
const MODEL_NAME = getString('MODEL_NAME', 'Adjustment');
const COLLECTION_NAME = getString('COLLECTION_NAME', 'adjustments');
const ADJUSTMENT_SEED = getString('ADJUSTMENT_SEED', 'adjustments');
const SCHEMA_OPTIONS = ({
  timestamps: true,
  emitIndexErrors: true,
  collection: COLLECTION_NAME
});
const OPTION_AUTOPOPULATE = ({
  maxDepth: POPULATION_MAX_DEPTH
});


/**
 * @name AdjustmentSchema
 * @type {Schema}
 * @since 1.0.0
 * @version 0.1.0
 * @private
 */
const AdjustmentSchema = new Schema({
  /**
   * @name type
   * @description Human readable type of performed stock adjustment.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {string[]} enum - collection of allowed values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * Addition
   */
  type: {
    type: String,
    trim: true,
    required: true,
    enum: TYPES,
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name reason
   * @description Human readable reason of performed stock adjustment.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {string[]} enum - collection of allowed values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * Expired
   */
  reason: {
    type: String,
    trim: true,
    required: true,
    enum: REASONS,
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name item
   * @description An item under which stock adjustment is performed.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced model(or collection)
   * @property {boolean} index - ensure database index
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - auto population(eager loading) options
   *
   * @since 1.1.0
   * @version 0.1.0
   * @instance
   * @example
   * {
   *   _id: "5bcda2c073dd0700048fb846",
   *   "type": "Vehicle",
   *   "code": "VHC",
   *   "name": "Ambulance"
   * }
   */
  item: {
    type: ObjectId,
    ref: Item.MODEL_NAME,
    required: true,
    index: true,
    exists: true,
    autopopulate: Item.OPTION_AUTOPOPULATE
  },


  /**
   * @name quantity
   * @description Value which a stock of an item(or resource) is adjusted.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} min - set minimum value allowed
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * piece
   */
  quantity: {
    type: Number,
    min: 0,
    required: true,
    index: true,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name cost
   * @description Total cost associated with adjustion a stock of an
   * item(or resource).
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} min - set minimum value allowed
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * piece
   */
  cost: {
    type: Number,
    min: 0,
    required: true,
    index: true,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name remarks
   * @description A brief summary about performed adjustment if
   * available i.e additional details that clarify why adjustment was performed.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   *
   */
  remarks: {
    type: String,
    trim: true,
    required: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    }
  }

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Hook
 *------------------------------------------------------------------------------
 */


AdjustmentSchema.pre('validate', function preValidate(next) {

  this.preValidate(next);

});


/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @function preValidate
 * @description adjustment schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 1.0.0
 * @version 0.1.0
 * @instance
 */
AdjustmentSchema.methods.preValidate = function preValidate(done) {

  // continue
  return done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* constants */
AdjustmentSchema.statics.MODEL_NAME = MODEL_NAME;
AdjustmentSchema.statics.COLLECTION_NAME = COLLECTION_NAME;
AdjustmentSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
AdjustmentSchema.statics.POPULATION_MAX_DEPTH = POPULATION_MAX_DEPTH;
AdjustmentSchema.statics.TYPES = TYPES;
AdjustmentSchema.statics.REASONS = REASONS;


/**
 * @name upsert
 * @function upsert
 * @description create or update existing adjustment
 * @param {Object} adjustment valid adjustment details
 * @param {Function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */
AdjustmentSchema.statics.upsert = function upsert(adjustment, done) {

  //normalize arguments
  let _adjustment = (
    _.isFunction(adjustment.toObject) ?
    adjustment.toObject() :
    adjustment
  );

  //refs
  const Adjustment = this;

  // prepare upsert
  async.waterfall([ //TODO load adjustment by name

    function findExistingAdjustment(next) {
      // prepare criteria by _id or fields
      let criteria = _.merge({}, _adjustment);
      criteria = (
        criteria._id ?
        _.pick(criteria, '_id') :
        _.pick(criteria, 'type', 'reason', 'item._id')
      );
      Adjustment.findOne(criteria, next);
    },

    function upsertAdjustment(found, next) {
      // instantiate if not found
      if (!found) {
        found = new Adjustment(_adjustment);
      }

      // prepare updates
      _adjustment = _.merge({}, _adjustment, found.toObject());

      // do upsert
      found.updatedAt = new Date();
      found.put(_adjustment, next);
    }
  ], done);
};


/**
 * @name seed
 * @function seed
 * @description seed adjustments into database, on duplicate existing wins
 * on merging.
 * @param {Adjustment[]} [adjustments] set of adjustment(s) to seed
 * @param {Function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */
AdjustmentSchema.statics.seed = function seed(seeds, done) {

  // normalize arguments
  let _seeds = _.isFunction(seeds) ? [] : [].concat(seeds);
  const _done = _.isFunction(seeds) ? seeds : done;

  // refs
  const Adjustment = this;

  // init adjustments collection
  let adjustments = [];

  // try load seeds from environment
  const BASE_PATH = getString('BASE_PATH', process.cwd());
  const SEEDS_PATH = getString('SEEDS_PATH', path.join(BASE_PATH, 'seeds'));
  const SEED_PATH = path.join(SEEDS_PATH, ADJUSTMENT_SEED);
  try {
    const seed = require(SEED_PATH);
    _seeds = [].concat(_seeds).concat(seed);
  } catch (e) { /* ignore */ }

  // collect unique adjustment from seeds
  _seeds = _.compact(_seeds);
  _seeds = _.uniqWith(_seeds, _.isEqual);

  // upsert adjustments
  adjustments = _.map([].concat(_seeds), function (adjustment) {
    return function upsertAdjustments(next) {
      Adjustment.upsert(adjustment, next);
    };
  });

  // seed adjustments
  async.parallel(adjustments, _done);

};


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions */
AdjustmentSchema.plugin(actions);


/* export adjustment model */
exports = module.exports = mongoose.model(MODEL_NAME, AdjustmentSchema);
