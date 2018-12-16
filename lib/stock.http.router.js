'use strict';


/**
 * @apiDefine Stock Stock
 *
 * @apiDescription A representation of item(i.e materials, services, staff,
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
 * @version 1.0.0
 * @public
 */


/**
 * @apiDefine Stock
 * @apiSuccess {String} _id Unique item(or resource) identifier
 * @apiSuccess {Feature} stock A storage facility where stock a kept physically.
 * @apiSuccess {Party} owner A party(i.e institution, organization etc)
 * owning item under stock.
 * @apiSuccess {Item} item An item under stock.
 * @apiSuccess {Number} quantity Current available number of items in stock of
 * an item(or resource).
 * @apiSuccess {Number} minAllowed Overall lower threshold stock of an
 * item(or resource) below which re-fill will be required.
 * @apiSuccess {Number} maxAllowed Overall upper threshold stock of an
 * item(or resource) above which re-allocation/no-purchase will be required.
 * @apiSuccess {Date} createdAt Date when stock was created.
 * @apiSuccess {Date} updatedAt Date when stock was last updated.
 */


/**
 * @apiDefine Stocks
 * @apiSuccess {Object[]} data List of stocks
 * @apiSuccess {String} data._id Unique item(or resource) identifier
 * @apiSuccess {Feature} data.stock A storage facility where stock a kept
 * physically.
 * @apiSuccess {Party} data.owner A party(i.e institution, organization etc)
 * owning item under stock.
 * @apiSuccess {Item} data.item An item under stock.
 * @apiSuccess {Number} data.quantity Current available number of items in stock of
 * an item(or resource).
 * @apiSuccess {Number} data.minAllowed Overall lower threshold stock of an
 * item(or resource) below which re-fill will be required.
 * @apiSuccess {Number} data.maxAllowed Overall upper threshold stock of an
 * item(or resource) above which re-allocation/no-purchase will be required.
 * @apiSuccess {Date} data.createdAt Date when stock was created.
 * @apiSuccess {Date} data.updatedAt Date when stock was last updated.
 * @apiSuccess {Number} total Total number of stocks
 * @apiSuccess {Number} size Number of stocks returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest stocks
 * was last modified
 */


/**
 * @apiDefine StockSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "_id": "5bf523def4e7140b728f8890",
 *    "store": {
 *       "category":"Building",
 *       "type":"Warehouse",
 *       "name":"Mbeya"
 *    },
 *    "owner": {
 *       "_id": "5bf523dbf4e7140b728f885f"
 *       "name": "Lally Elias",
 *       "email": "lallyelias87@gmail.com",
 *       "mobile": "255714095061",
 *    },
 *    "item": {
 *       "_id": "5bf523dcf4e7140b728f8868"
 *       "type": "Other",
 *       "code": "BS",
 *       "name": "BAR SOAP",
 *       "color": "#D72E29",
 *    },
 *    "quantity": 682,
 *    "minAllowed": 9,
 *    "maxAllowed": 9217,
 *    "updatedAt": "2018-11-21T09:22:39.340Z",
 *    "createdAt": "2018-11-21T09:22:39.340Z"
 *  }
 */


/**
 * @apiDefine StocksSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "data": [
 *  {
 *    "_id": "5bf523def4e7140b728f8890",
 *    "store": {
 *       "category":"Building",
 *       "type":"Warehouse",
 *       "name":"Mbeya"
 *    },
 *    "owner": {
 *       "_id": "5bf523dbf4e7140b728f885f"
 *       "name": "Lally Elias",
 *       "email": "lallyelias87@gmail.com",
 *       "mobile": "255714095061",
 *    },
 *    "item": {
 *       "_id": "5bf523dcf4e7140b728f8868"
 *       "type": "Other",
 *       "code": "BS",
 *       "name": "BAR SOAP",
 *       "color": "#D72E29",
 *    },
 *    "quantity": 682,
 *    "minAllowed": 9,
 *    "maxAllowed": 9217,
 *    "updatedAt": "2018-11-21T09:22:39.340Z",
 *    "createdAt": "2018-11-21T09:22:39.340Z"
 *  }
 *    ],
 *   "total": 10,
 *   "size": 2,
 *   "limit": 2,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 5,
 *   "lastModified": "2018-05-06T10:19:04.910Z"
 * }
 *
 */


/* dependencies */
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const { include } = require('@lykmapipo/include');
const Router = require('@lykmapipo/express-common').Router;


/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_LIST = '/stocks';
const PATH_SINGLE = '/stocks/:id';
const PATH_SCHEMA = '/stocks/schema/';


/* declarations */
const Stock = include(__dirname, 'stock.model');
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /stocks List Stocks
 * @apiVersion 1.0.0
 * @apiName GetStocks
 * @apiGroup Stock
 * @apiDescription Returns a list of stocks
 * @apiUse RequestHeaders
 * @apiUse Stocks
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse StocksSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getStocks(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery);

  Stock
    .get(options, function onGetStocks(error, results) {

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
 * @api {get} /stocks/schema Get Stocks Schema
 * @apiVersion 1.0.0
 * @apiName GetStockSchema
 * @apiGroup Stock
 * @apiDescription Returns item json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getStockSchema(request, response) {
  const schema = Stock.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /stocks Create New Stocks
 * @apiVersion 1.0.0
 * @apiName PostStock
 * @apiGroup Stock
 * @apiDescription Create new stock
 * @apiUse RequestHeaders
 * @apiUse Stock
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse StockSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .post(PATH_LIST, function postStock(request, response, next) {

    // obtain request body
    const body = _.merge({}, request.except('quantity'));

    Stock
      .post(body, function onPostStock(error, created) {

        // forward error
        if (error) {
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
 * @api {get} /stocks/:id Get Existing Stocks
 * @apiVersion 1.0.0
 * @apiName GetStock
 * @apiGroup Stock
 * @apiDescription Get existing stock
 * @apiUse RequestHeaders
 * @apiUse Stock
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse StockSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .get(PATH_SINGLE, function getStock(request, response, next) {

    // obtain request options
    const options = _.merge({}, request.mquery);

    // obtain stock id
    options._id = request.params.id;

    Stock
      .getById(options, function onGetStock(error, found) {

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
 * @api {patch} /stocks/:id Patch Existing Stocks
 * @apiVersion 1.0.0
 * @apiName PatchStock
 * @apiGroup Stock
 * @apiDescription Patch existing stock
 * @apiUse RequestHeaders
 * @apiUse Stock
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse StockSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .patch(PATH_SINGLE, function patchStock(request, response, next) {

    // obtain stock id
    const { id } = request.params;

    // obtain request body
    const patches = _.merge({}, request.except('quantity'));

    Stock
      .patch(id, patches, function onPatchStock(error, patched) {

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
 * @api {put} /stocks/:id Put Existing Stocks
 * @apiVersion 1.0.0
 * @apiName PutStock
 * @apiGroup Stock
 * @apiDescription Put existing stock
 * @apiUse RequestHeaders
 * @apiUse Stock
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse StockSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .put(PATH_SINGLE, function putStock(request, response, next) {

    // obtain stock id
    const { id } = request.params;

    // obtain request body
    const updates = _.merge({}, request.except('quantity'));

    Stock
      .put(id, updates, function onPutStock(error, updated) {

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
 * @api {delete} /stocks/:id Delete Existing Stocks
 * @apiVersion 1.0.0
 * @apiName DeleteStock
 * @apiGroup Stock
 * @apiDescription Delete existing stock
 * @apiUse RequestHeaders
 * @apiUse Stock
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse StockSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .delete(PATH_SINGLE, function deleteStock(request, response, next) {

    // obtain stock id
    const { id } = request.params;

    Stock
      .del(id, function onDeleteStock(error, deleted) {

        // forward error
        if (error) {
          next(error);
        }

        // handle response
        else {
          response.status(200);
          response.json(deleted);
        }

      });

  });


/* expose incided type router */
exports = module.exports = router;
