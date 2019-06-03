'use strict';

/**
 * @module Stock
 * @name Stock
 * @description A representation of item(i.e materials, services, staff,
 * assets etc.) stock that may be consumed or made available in
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
const { model,copyInstance,  SCHEMA_OPTIONS } = require('@lykmapipo/mongoose-common');
const actions = require('mongoose-rest-actions');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = require('@codetanzania/emis-stakeholder');
const Item = include(__dirname, 'item.model');
const { ObjectId } = SchemaTypes;

/* schema options */
const POPULATION_MAX_DEPTH = 1;
const MODEL_NAME = getString('MODEL_NAME', 'Stock');
const COLLECTION_NAME = getString('COLLECTION_NAME', 'stocks');
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
 * @name StockSchema
 * @type {Schema}
 * @since 1.0.0
 * @version 0.1.0
 * @private
 */
const StockSchema = new Schema(
  {
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
     * @since 1.1.0
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
     * @name owner
     * @description A party(i.e institution, organization etc) owning item under
     * stock.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced model(or collection)
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
     *
     * @since 1.1.0
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
    owner: {
      type: ObjectId,
      ref: Party.MODEL_NAME,
      required: true,
      index: true,
      exists: true,
      autopopulate: OPTION_AUTOPOPULATE_PARTY,
      taggable: true,
    },

    /**
     * @name item
     * @description An item under stock.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced model(or collection)
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
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
      autopopulate: Item.OPTION_AUTOPOPULATE,
      taggable: true,
    },

    /**
     * @name quantity
     * @description Current available number of items in stock of an item(or resource).
     *
     * This is derived value and should not be set directly.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} min - set minimum value allowed
     * @property {boolean} index - ensure database index
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * 50
     */
    quantity: {
      type: Number,
      min: 0,
      index: true,
      default: 0,
      fake: {
        generator: 'random',
        type: 'number',
      },
    },

    /**
     * @name minAllowed
     * @description Overall lower threshold stock of an item(or resource) below
     * which re-fill will be required.
     *
     * It used in to generate below stock warning notifications.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} min - set minimum value allowed
     * @property {boolean} index - ensure database index
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * 10
     */
    minAllowed: {
      type: Number,
      min: 0,
      index: true,
      default: 0,
      fake: {
        generator: 'random',
        type: 'number',
      },
    },

    /**
     * @name maxAllowed
     * @description Overall upper threshold stock of an item(or resource) above
     * which re-allocation/no-purchase will be required.
     *
     * It used to generate stock overflow warn notifications.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} min - set minimum value allowed
     * @property {boolean} index - ensure database index
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 1.0.0
     * @version 0.1.0
     * @instance
     * @example
     * 100
     */
    maxAllowed: {
      type: Number,
      min: 0,
      index: true,
      default: 0,
      fake: {
        generator: 'random',
        type: 'number',
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

StockSchema.pre('validate', function preValidate(next) {
  this.preValidate(next);
});

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

/**
 * @name index
 * @description ensure unique compound index on owner and item to enforce
 * unique item stock definition per owner
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 * @private
 */
StockSchema.index({ owner: 1, item: 1 }, { unique: true });

/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description stock schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 1.0.0
 * @version 0.1.0
 * @instance
 */
StockSchema.methods.preValidate = function preValidate(done) {
  // continue
  return done();
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* constants */
StockSchema.statics.MODEL_NAME = MODEL_NAME;
StockSchema.statics.COLLECTION_NAME = COLLECTION_NAME;
StockSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
StockSchema.statics.POPULATION_MAX_DEPTH = POPULATION_MAX_DEPTH;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description prepare stock seeding upsert criteria
 * @param {Object} seed plain object stock seed
 * @return {Object} criteria used to upsert stock
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @public
 */
StockSchema.statics.prepareSeedCriteria = seed => {
  // prepare alert upsert criteria by _id or fields
  let criteria = copyInstance(seed);
  criteria = (
    criteria._id ?
      _.pick(criteria, '_id') :
      _.pick(criteria, 'owner', 'item')
  );

  // return alert source upsert criteria
  return criteria;
};

/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */

/* plug mongoose rest actions */
StockSchema.plugin(actions);

/* export stock model */
exports = module.exports = model(MODEL_NAME, StockSchema);
