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


/* extract information from package.json */
exports.info = _.merge({}, _.pick(pkg, [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
]));


/* export models */
exports.Item = require(path.join(__dirname, 'lib', 'item.model'));
exports.Stock = require(path.join(__dirname, 'lib', 'stock.model'));
exports.Adjustment = require(path.join(__dirname, 'lib', 'adjustment.model'));


/* export routers*/
exports.itemRouter = require(path.join(__dirname, 'lib', 'item.http.router'));
exports.stockRouter = require(path.join(__dirname, 'lib', 'stock.http.router'));


/* export router api version */
exports.apiVersion = exports.itemRouter.apiVersion;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind routers */
    app.mount(exports.itemRouter);
    app.mount(exports.stockRouter);
    return app;
  }

});
