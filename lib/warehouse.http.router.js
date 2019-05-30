'use strict';


/**
 * @apiDefine Warehouse Warehouse
 *
 * @apiDescription A representation of a storage facility where stock a
 * kept physically.
 *
 * @see {@link https://en.wikipedia.org/wiki/Geographic_information_system}
 * @see {@link https://tools.ietf.org/html/rfc7946#section-6}
 * @see {@link https://wiki.openstreetmap.org/wiki/Features}
 * @see {@link https://wiki.openstreetmap.org/wiki/Map_Features}
 * @see {@link https://docs.mongodb.com/manual/reference/geojson/}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  1.0.0
 * @version 1.0.0
 * @public
 */


/**
 * @apiDefine Warehouse
 * @apiSuccess {String} _id Unique feature identifier
 * @apiSuccess {String} [category=Building] Human readable category(or class) of
 * a feature.
 * @apiSuccess {String} [type=Warehouse] Human readable type of a feature.
 * @apiSuccess {String} [level=other] Human readable administrative level of
 * a feature.
 * @apiSuccess {String} name Human readable name of a feature.
 * @apiSuccess {String} [nickname] Human readable alternative or well known
 * name of a feature.
 * @apiSuccess {String} [about=undefined] A brief summary about a feature if
 * available i.e additional details that clarify what a feature is.
 * @apiSuccess {Point} [centroid=undefined] A geo-point that may be considered
 * as the center of a feature.
 * @apiSuccess {Geometry} geometry A geo-geometry representation of a feature.
 * @apiSuccess {Object} [properties] A map of key value pairs describing
 * (or detailing) characteristics(or traits) of a feature.
 * @apiSuccess {String[]} [tags] A set of human redable keywords describing
 * a feature.
 * @apiSuccess {String} [continent=Africa] Human readable continent where a
 * feature belongs.
 * @apiSuccess {String} [country=Tanzania] Human readable country where a
 * feature belongs.
 * @apiSuccess {Date} createdAt Date when feature was created
 * @apiSuccess {Date} updatedAt Date when feature was last updated
 *
 */


/**
 * @apiDefine Warehouses
 * @apiSuccess {Object[]} data List of features
 * @apiSuccess {String} data._id Unique feature identifier
 * @apiSuccess {String} [data.category=Building] Human readable category(or class)
 * of a feature.
 * @apiSuccess {String} [data.type=Warehouse] Human readable type of a feature.
 * @apiSuccess {String} [data.level=other] Human readable administrative level of
 * a feature.
 * @apiSuccess {String} data.name Human readable name of a feature.
 * @apiSuccess {String} [data.nickname] Human readable alternative or well known
 * name of a feature.
 * @apiSuccess {String} [data.about=undefined] A brief summary about a feature if
 * available i.e additional details that clarify what a feature is.
 * @apiSuccess {Point} [data.centroid=undefined] A geo-point that may be considered
 * as the center of a feature.
 * @apiSuccess {Geometry} data.geometry A geo-geometry representation of a feature.
 * @apiSuccess {Object} [data.properties] A map of key value pairs describing
 * (or detailing) characteristics(or traits) of a feature.
 * @apiSuccess {String[]} [data.tags] A set of human redable keywords describing
 * a feature.
 * @apiSuccess {String} [data.continent=Africa] Human readable continent where a
 * feature belongs.
 * @apiSuccess {String} [data.country=Tanzania] Human readable country where a
 * feature belongs.
 * @apiSuccess {Date} data.createdAt Date when feature was created
 * @apiSuccess {Date} data.updatedAt Date when feature was last updated
 * @apiSuccess {Number} total Total number of features
 * @apiSuccess {Number} size Number of features returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest feature
 * was last modified
 *
 */


/**
 * @apiDefine WarehouseSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5b5d92da476363251e13e0f4",
 *   "category": "Building",
 *   "type": "Warehouse",
 *   "name": "Bedfordshire",
 *   "about": "Doloribus animi quidem ratione.",
 *   "geometry": {
 *    "type": "Point",
 *    "coordinates": [-76.80207859497996, 55.69469494228919]
 *   },
 *   "updatedAt": "2018-07-29T10:11:38.110Z",
 *   "createdAt": "2018-07-29T10:11:38.110Z"
 * }
 *
 */


/**
 * @apiDefine WarehousesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *    {
 *      "_id": "5b5d92da476363251e13e0f4",
 *      "category": "Building",
 *      "type": "Warehouse",
 *      "name": "Bedfordshire",
 *      "about": "Doloribus animi quidem ratione.",
 *      "geometry": {
 *        "type": "Point",
 *        "coordinates": [-76.80207859497996, 55.69469494228919]
 *      },
 *      "updatedAt": "2018-07-29T10:11:38.110Z",
 *      "createdAt": "2018-07-29T10:11:38.110Z"
 *    }
 *   ],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-07-29T10:11:38.111Z"
 * }
 */


/* dependencies */
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const { Feature: Warehouse } = require('@codetanzania/emis-feature');
const Router = require('@lykmapipo/express-common').Router;


/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/warehouses/:id';
const PATH_LIST = '/warehouses';
const PATH_SCHEMA = '/warehouses/schema/';


/* declarations */
const defaults = { nature: 'Building', family: 'Warehouse' };
const filter = { filter: _.merge({}, defaults) };
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /warehouses List Warehouses
 * @apiVersion 1.0.0
 * @apiName GetWarehouses
 * @apiGroup Warehouse
 * @apiDescription Returns a list of warehouses
 * @apiUse RequestHeaders
 * @apiUse Warehouses
 *
 * @apiUse RequestHeadersExample
 * @apiUse WarehousesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getWarehouses(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery, filter);

  Warehouse
    .get(options, function onGetWarehouses(error, results) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});


/**
 * @api {get} /warehouses/schema Get Warehouse Schema
 * @apiVersion 1.0.0
 * @apiName GetWarehouseSchema
 * @apiGroup Warehouse
 * @apiDescription Returns warehouse json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Warehouse.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /warehouses Create New Warehouse
 * @apiVersion 1.0.0
 * @apiName PostWarehouse
 * @apiGroup Warehouse
 * @apiDescription Create new warehouse
 * @apiUse RequestHeaders
 * @apiUse Warehouse
 *
 * @apiUse RequestHeadersExample
 * @apiUse WarehouseSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postWarehouse(request, response, next) {

  // obtain request body
  const body = _.merge({}, request.body, defaults);

  Warehouse
    .post(body, function onPostWarehouse(error, created) {

      // forward error
      if (error) {
        console.log(error);
        next(error);
      }

      // handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});


/**
 * @api {get} /warehouses/:id Get Existing Warehouse
 * @apiVersion 1.0.0
 * @apiName GetWarehouse
 * @apiGroup Warehouse
 * @apiDescription Get existing warehouse
 * @apiUse RequestHeaders
 * @apiUse Warehouse
 *
 * @apiUse RequestHeadersExample
 * @apiUse WarehouseSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getWarehouse(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery, filter);

  // obtain warehouse id
  options._id = request.params.id;

  Warehouse
    .getById(options, function onGetWarehouse(error, found) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /warehouses/:id Patch Existing Warehouse
 * @apiVersion 1.0.0
 * @apiName PatchWarehouse
 * @apiGroup Warehouse
 * @apiDescription Patch existing warehouse
 * @apiUse RequestHeaders
 * @apiUse Warehouse
 *
 * @apiUse RequestHeadersExample
 * @apiUse WarehouseSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchWarehouse(request, response, next) {

  // obtain warehouse id
  const _id = request.params.id;

  // obtain request body
  const patches = _.merge({}, request.body, defaults);

  Warehouse
    .patch(_id, patches, function onPatchWarehouse(error, patched) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});


/**
 * @api {put} /warehouses/:id Put Existing Warehouse
 * @apiVersion 1.0.0
 * @apiName PutWarehouse
 * @apiGroup Warehouse
 * @apiDescription Put existing warehouse
 * @apiUse RequestHeaders
 * @apiUse Warehouse
 *
 * @apiUse RequestHeadersExample
 * @apiUse WarehouseSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putWarehouse(request, response, next) {

  // obtain warehouse id
  const _id = request.params.id;

  // obtain request body
  const updates = _.merge({}, request.body, defaults);

  Warehouse
    .put(_id, updates, function onPutWarehouse(error, updated) {

      // forward error
      if (error) {
        next(error);
      }

      // handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});


/**
 * @api {delete} /warehouses/:id Delete Existing Warehouse
 * @apiVersion 1.0.0
 * @apiName DeleteWarehouse
 * @apiGroup Warehouse
 * @apiDescription Delete existing warehouse
 * @apiUse RequestHeaders
 * @apiUse Warehouse
 *
 * @apiUse RequestHeadersExample
 * @apiUse WarehouseSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteWarehouse(request, response, next) {

  // obtain warehouse id
  const _id = request.params.id;

  // obtain request body
  const patches = _.merge({}, { deletedAt: new Date() });

  Warehouse
    .patch(_id, patches, function onDeleteWarehouse(error, deleted) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});


/* expose warehouse router */
module.exports = router;
