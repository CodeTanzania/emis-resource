'use strict';


/**
 * @name emis-resource
 * @module emis-resource
 * @description A representation of item(i.e materials, services, staff,
 * assets etc.) and it stock that may be consumed or made available in
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
 *
 * @example
 *
 * const { app } = require('@codetanzania/emis-resource');
 * app.start(error => { ... });
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const pkg = require(path.join(__dirname, 'package.json'));
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);
const app = require('@lykmapipo/express-common');
const Item = require(path.join(__dirname, 'lib', 'item.model'));
const Stock = require(path.join(__dirname, 'lib', 'stock.model'));
const Adjustment = require(path.join(__dirname, 'lib', 'adjustment.model'));
const itemRouter = require(path.join(__dirname, 'lib', 'item.http.router'));
const stockRouter = require(path.join(__dirname, 'lib', 'stock.http.router'));
const adjustmentRouter =
  require(path.join(__dirname, 'lib', 'adjustment.http.router'));


/**
 * @name info
 * @description package information
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.info = _.merge({}, _.pick(pkg, [
  'name', 'description', 'version', 'license',
  'homepage', 'repository', 'bugs', 'sandbox', 'contributors'
]));


/**
 * @name Item
 * @description Item model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.Item = Item;


/**
 * @name Stock
 * @description Stock model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.Stock = Stock;


/**
 * @name Adjustment
 * @description Adjustment model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.Adjustment = Adjustment;


/**
 * @name itemRouter
 * @description item http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.itemRouter = itemRouter;


/**
 * @name stockRouter
 * @description stock http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.stockRouter = stockRouter;


/**
 * @name adjustmentRouter
 * @description adjustment http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.adjustmentRouter = adjustmentRouter;


/**
 * @name apiVersion
 * @description http router api version
 * @type {String}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.apiVersion = itemRouter.apiVersion;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(exports.itemRouter);
    app.mount(exports.stockRouter);
    app.mount(exports.adjustmentRouter);
    return app;
  }

});
