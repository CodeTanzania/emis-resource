'use strict';


/**
 * @name emis-resource
 * @module emis-resource
 * @description WIP
 *
 * @see {@link https://en.wikipedia.org/wiki/Disaster}
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
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);
const app = require('@lykmapipo/express-common');


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];


/* extract information from package.json */
exports.info = _.merge({}, _.pick(pkg, fields));


/* export models */
exports.Item = require(path.join(__dirname, 'lib', 'item.model'));
exports.Stock = require(path.join(__dirname, 'lib', 'stock.model'));
exports.Adjustment = require(path.join(__dirname, 'lib', 'adjustment.model'));


/* export routers*/
// exports.itemRouter = require(path.join(__dirname, 'lib', 'item.http.router'));


/* export router api version */
// exports.apiVersion = itemRouter.apiVersion;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind incident type router */
    // app.mount(itemRouter);
    return app;
  }

});
