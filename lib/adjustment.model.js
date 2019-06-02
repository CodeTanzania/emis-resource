'use strict';

/**
 * @module Adjustment
 * @name Adjustment
 * @description A representation of an item(i.e materials, services, staff,
 * assets etc.) stock changes(i.e additions and deductions) occured in
 * emergency(or disaster) management(or event).
 *
 * @see {@link https://en.wikipedia.org/wiki/Resource}
 * @see {@link https://en.wikipedia.org/wiki/Inventory}
 * @see {@link https://en.wikipedia.org/wiki/Resource_management}
 * @see {@link https://en.wikipedia.org/wiki/Disaster}
 * @see {@link https://www.fema.gov/media-library/assets/documents/89520}
 * @see {@link https://www.doa.la.gov/osp/Vendorcenter/docs/unitofmeasurecodes.pdf}
 * @see {@link https://www.urmc.rochester.edu/purchasing/documents/um.pdf}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */

/* dependencies */
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const { include } = require('@lykmapipo/include');
const { Schema, SchemaTypes } = require('@lykmapipo/mongoose-common');
const { model, SCHEMA_OPTIONS,copyInstance } = require('@lykmapipo/mongoose-common');
const actions = require('mongoose-rest-actions');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const Item = include(__dirname, 'item.model');
const Stock = include(__dirname, 'stock.model');
const { ObjectId } = SchemaTypes; //TODO type color and icon

/* adjustment types */ const TYPE_ADDITION = 'Addition';
const TYPE_DEDUCTION = 'Deduction';
const TYPES = [TYPE_ADDITION, TYPE_DEDUCTION]; //TODO reason color and icon

/* adjustment reasons */ const REASONS = [
  'Consumed',
  'Cycle Count',
  'Disposed',
  'Demaged',
  'Expired',
  'Purchased',
  'Sold',
  'Transfered',
  'Unknown',
];

/* schema options */
const POPULATION_MAX_DEPTH = 1;
const MODEL_NAME = getString('MODEL_NAME', 'Adjustment');
const COLLECTION_NAME = getString('COLLECTION_NAME', 'adjustments');
const OPTION_AUTOPOPULATE = {
  maxDepth: POPULATION_MAX_DEPTH,
};
const OPTION_AUTOPOPULATE_FEATURE = {
  select: { category: 1, type: 1, name: 1 },
  maxDepth: POPULATION_MAX_DEPTH,
};
const OPTION_AUTOPOPULATE_PARTY = {
  select: { name: 1, email: 1, mobile: 1 },
  maxDepth: POPULATION_MAX_DEPTH,
};

/**
 * @name AdjustmentSchema
 * @type {Schema}
 * @since 1.0.0
 * @version 0.1.0
 * @private
 */
const AdjustmentSchema = new Schema(
  {
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
     * @property {boolean} taggable - allow field use for tagging
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
      taggable: true,
      fake: true,
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
     * @property {boolean} taggable - allow field use for tagging
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
      taggable: true,
      fake: true,
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
     * @property {boolean} taggable - allow field use for tagging
     *
     * @since 1.0.0
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
      autopopulate: Item.OPTION_AUTOPOPULATE,
      taggable: true,
    },

    /**
     * @name stock
     * @description A stock in which adjustment is performed.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced model(or collection)
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "store": {
     *     "category":"Building",
     *     "type":"Warehouse",
     *     "name":"Mbeya"
     *   },
     *   "owner": {
     *     _id: "5bcda2c073dd0700048fb846",
     *     "name": "Red Cross Association",
     *     "email": "red@cross.org",
     *     "mobile": "255717096096"
     *   },
     *   "item": {
     *     _id: "5bcda2c073dd0700048fb846",
     *     "type": "Vehicle",
     *     "code": "VHC",
     *     "name": "Ambulance"
     *   }
     * }
     */
    stock: {
      type: ObjectId,
      ref: Stock.MODEL_NAME,
      required: true,
      index: true,
      exists: true,
      taggable: true,
    },

    /**
     * @name store
     * @alias warehouse
     * @description A storage facility where stock a kept physically.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced model(or collection)
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "category":"Building",
     *   "type":"Warehouse",
     *   "name":"Mbeya"
     * }
     */
    store: {
      type: ObjectId,
      ref: Feature.MODEL_NAME,
      required: true,
      index: true,
      exists: true,
      autopopulate: OPTION_AUTOPOPULATE_FEATURE,
      taggable: true,
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
        type: 'number',
      },
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
        type: 'number',
      },
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
        type: 'paragraph',
      },
    },

    /**
     * @name party
     * @description A party(i.e institution, organization etc) performing stock
     * adjustment.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced model(or collection)
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   _id: "5bcda2c073dd0700048fb846",
     *   "name": "Red Cross Association",
     *   "email": "red@cross.org",
     *   "mobile": "255717096096"
     * }
     */
    party: {
      type: ObjectId,
      ref: Party.MODEL_NAME,
      required: true,
      index: true,
      exists: true,
      autopopulate: OPTION_AUTOPOPULATE_PARTY,
      taggable: true,
    },

    /**
     * @name expiredAt
     * @description The expiry time of the stock adjusted.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * 2018-02-01T16:49:00
     */
    expiredAt: {
      type: Date,
      index: true,
      fake: {
        generator: 'date',
        type: 'future',
      },
    },
  },
  SCHEMA_OPTIONS
);

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
  // ensure item
  this.item = this.item || _.get(this, 'stock.item');

  // ensure store
  this.store = this.store || _.get(this, 'stock.store');

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
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description prepare item seeding upsert criteria
 * @param {Object} seed plain object item seed
 * @return {Object} criteria used to upsert item
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @public
 */
AdjustmentSchema.statics.prepareSeedCriteria = seed => {
  // prepare item upsert criteria by _id or fields
  let criteria = copyInstance(seed);
  criteria = criteria._id ?
   _.pick(criteria, '_id'):
   _.pick(criteria, 'type', 'reason', 'item', 'stock', 'store');
   // return item upsert criteria
  return criteria;
};

/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */

/* plug mongoose rest actions */
AdjustmentSchema.plugin(actions);

/* export adjustment model */
exports = module.exports = model(MODEL_NAME, AdjustmentSchema);
