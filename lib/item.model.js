'use strict';


/**
 * @module Item
 * @name Item
 * @alias Resource
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
const { getString, getStrings } = require('@lykmapipo/env');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Schema } = require('mongoose');


/* item types */
const DEFAULT_TYPE = 'Other';
const TYPES = _.orderBy(_.map(getStrings('ITEM_TYPES', [
  'Equipment', 'Consumable',
  'Vehicle', 'Service',
  DEFAULT_TYPE
]), _.startCase));


/* item type colors */
const COLOR_EQUIPMENT = '#3366FF';
const COLOR_CONSUMABLE = '#88E729';
const COLOR_VEHICLE = '#FFFF00';
const COLOR_SERVICE = '#FE9901';
const COLOR_OTHER = '#D72E29';
const DEFAULT_COLOR = COLOR_OTHER;
const COLORS = {
  COLOR_EQUIPMENT,
  COLOR_CONSUMABLE,
  COLOR_VEHICLE,
  COLOR_SERVICE,
  COLOR_OTHER
};


/* item unit of measures */
const DEFAULT_UOM = 'unit';
const UOMS = _.orderBy(_.map(getStrings('ITEM_UOMS', [
  'bag', 'box', 'carton',
  'drum', 'dozen', 'gallon',
  'kit', 'pallet', 'piece',
  'bucket', 'bottle', 'crate',
  DEFAULT_UOM
]), _.toLower));


/* schema options */
const POPULATION_MAX_DEPTH = 1;
const MODEL_NAME = getString('MODEL_NAME', 'Item');
const COLLECTION_NAME = getString('COLLECTION_NAME', 'items');
const ITEM_SEED = getString('ITEM_SEED', 'items');
const SCHEMA_OPTIONS = ({
  timestamps: true,
  emitIndexErrors: true,
  collection: COLLECTION_NAME
});
const OPTION_AUTOPOPULATE = ({
  select: { type: 1, code: 1, name: 1, color: 1, icon: 1 },
  maxDepth: POPULATION_MAX_DEPTH
});


/**
 * @name ItemSchema
 * @type {Schema}
 * @since 1.0.0
 * @version 0.1.0
 * @private
 */
const ItemSchema = new Schema({
  /**
   * @name type
   * @description Human readable type of an item(or resource).
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {string[]} enum - collection of allowed values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * Equipment
   */
  type: {
    type: String,
    trim: true,
    required: true,
    enum: TYPES,
    index: true,
    searchable: true,
    default: DEFAULT_TYPE,
    fake: true
  },


  /**
   * @name code
   * @description Human readable, unique identifier of an item.
   *
   * If not set it will be generated from the initial letters of an item name.
   *
   * It used in generation of item physical tag or barcode when needed.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} uppercase - force value to uppercase
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure unique database index
   * @property {boolean} searchable - allow searching
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * PC
   */
  code: {
    type: String,
    trim: true,
    required: true,
    uppercase: true,
    index: true,
    unique: true,
    searchable: true
  },


  /**
   * @name name
   * @description Human readable name of an item(or resource).
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} startcase - forcing start case(or title case)
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure unique database index
   * @property {boolean} searchable - allow searching
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Personal Computer
   */
  name: {
    type: String,
    trim: true,
    required: true,
    startcase: true,
    index: true,
    unique: true,
    searchable: true,
    fake: {
      generator: 'commerce',
      type: 'productName'
    }
  },


  /**
   * @name description
   * @description A brief summary(definition) about an item(or resource) if
   * available i.e additional details that clarify what is an
   * item(or resource).
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
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
  description: {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    }
  },


  /**
   * @name uom
   * @description Human readable unit of measure of an item(or resource).
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {string[]} enum - collection of allowed values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * piece
   */
  uom: {
    type: String,
    trim: true,
    required: true,
    enum: UOMS,
    index: true,
    searchable: true,
    default: DEFAULT_UOM,
    fake: true
  },


  /**
   * @name minStockAllowed
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
  minStockAllowed: {
    type: Number,
    min: 0,
    index: true,
    default: 0,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name maxStockAllowed
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
  maxStockAllowed: {
    type: Number,
    min: 0,
    index: true,
    default: 0,
    fake: {
      generator: 'random',
      type: 'number'
    }
  },


  /**
   * @name color
   * @description A color code(in hexadecimal format) used to differentiate an
   * item(or resource) type visually.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force upper-casing
   * @property {string[]} enum - collection of allowed values
   * @property {boolean} default - default value set when none provided
   * @property {object} fake - fake data generator options
   *
   * @since 1.0.0
   * @version 0.1.0
   * @instance
   * @example
   * #20687C
   */
  color: {
    type: String,
    trim: true,
    uppercase: true,
    enum: _.values(COLORS),
    default: DEFAULT_COLOR,
    fake: true
  },


  /**
   * @name icon
   * @description An icon(in url, base64, svg formats) used to differentiate
   * item(or resource) type visually.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} default - default value set when none provided
   *
   * @since 1.1.0
   * @version 0.1.0
   * @instance
   */
  icon: {
    type: String,
    trim: true
  },


  /**
   * @name expirable
   * @description Flag whether an item(or resource) may expire when stocked.
   *
   * It used to generate stock about to expire warn notifications.
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
   * piece
   */
  expirable: {
    type: Boolean,
    index: true,
    default: false
  }

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Hook
 *------------------------------------------------------------------------------
 */


ItemSchema.pre('validate', function preValidate(next) {

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
 * @description item schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 1.0.0
 * @version 0.1.0
 * @instance
 */
ItemSchema.methods.preValidate = function preValidate(done) {

  // ensure type
  if (_.isEmpty(this.type)) {
    this.type = DEFAULT_TYPE;
  }

  // ensure code
  if (this.name && _.isEmpty(this.code)) {

    // prepare code
    let code = _.compact(this.name.split(' '));

    // generate code
    code = _.reduce(code, function generateGCode(code, word) {
      return _.toUpper(code + _.first(word));
    }, '');

    // assign code
    this.code = code;
  }

  // ensure item color
  if (!_.isEmpty(this.type)) {
    const colorKey = `COLOR_${this.type.toUpperCase()}`;
    this.color = _.get(COLORS, colorKey, DEFAULT_COLOR);
  }

  // continue
  return done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* constants */
ItemSchema.statics.MODEL_NAME = MODEL_NAME;
ItemSchema.statics.COLLECTION_NAME = COLLECTION_NAME;
ItemSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;
ItemSchema.statics.POPULATION_MAX_DEPTH = POPULATION_MAX_DEPTH;

ItemSchema.statics.TYPES = TYPES;
ItemSchema.statics.DEFAULT_TYPE = DEFAULT_TYPE;

ItemSchema.statics.DEFAULT_COLOR = DEFAULT_COLOR;
ItemSchema.statics.COLOR_EQUIPMENT = COLOR_EQUIPMENT;
ItemSchema.statics.COLOR_CONSUMABLE = COLOR_CONSUMABLE;
ItemSchema.statics.COLOR_VEHICLE = COLOR_VEHICLE;
ItemSchema.statics.COLOR_SERVICE = COLOR_SERVICE;
ItemSchema.statics.COLOR_OTHER = COLOR_OTHER;
ItemSchema.statics.DEFAULT_COLOR = DEFAULT_COLOR;
ItemSchema.statics.COLORS = COLORS;

ItemSchema.statics.UOMS = UOMS;
ItemSchema.statics.DEFAULT_UOM = DEFAULT_UOM;


/**
 * @name upsert
 * @function upsert
 * @description create or update existing item
 * @param {Object} item valid item details
 * @param {Function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */
ItemSchema.statics.upsert = function upsert(item, done) {

  //normalize arguments
  let _item = (
    _.isFunction(item.toObject) ?
    item.toObject() :
    item
  );

  //refs
  const Item = this;

  // prepare upsert
  async.waterfall([

    function findExistingItem(next) {
      // prepare criteria by _id or fields
      let criteria = _.merge({}, _item);
      criteria = (
        criteria._id ?
        _.pick(criteria, '_id') :
        _.pick(criteria, 'type', 'name')
      );
      Item.findOne(criteria, next);
    },

    function upsertItem(found, next) {
      // instantiate if not found
      if (!found) {
        found = new Item(_item);
      }

      // prepare updates
      _item = _.merge({}, _item, found.toObject());

      // do upsert
      found.updatedAt = new Date();
      found.put(_item, next);
    }
  ], done);
};


/**
 * @name seed
 * @function seed
 * @description seed items into database, on duplicate existing wins
 * on merging.
 * @param {Item[]} [items] set of item(s) to seed
 * @param {Function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 * @public
 */
ItemSchema.statics.seed = function seed(seeds, done) {

  // normalize arguments
  let _seeds = _.isFunction(seeds) ? [] : [].concat(seeds);
  const _done = _.isFunction(seeds) ? seeds : done;

  // refs
  const Item = this;

  // init items collection
  let items = [];

  // try load seeds from environment
  const BASE_PATH = getString('BASE_PATH', process.cwd());
  const SEEDS_PATH = getString('SEEDS_PATH', path.join(BASE_PATH, 'seeds'));
  const SEED_PATH = path.join(SEEDS_PATH, ITEM_SEED);
  try {
    const seed = require(SEED_PATH);
    _seeds = [].concat(_seeds).concat(seed);
  } catch (e) { /* ignore */ }

  // collect unique item from seeds
  _seeds = _.compact(_seeds);
  _seeds = _.uniqWith(_seeds, _.isEqual);

  // upsert items
  items = _.map([].concat(_seeds), function (item) {
    return function upsertItems(next) {
      Item.upsert(item, next);
    };
  });

  // seed items
  async.parallel(items, _done);

};


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions */
ItemSchema.plugin(actions);


/* export item model */
exports = module.exports = mongoose.model(MODEL_NAME, ItemSchema);
