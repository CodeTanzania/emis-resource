'use strict';


/**
 * @apiDefine Item Item
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
 * @apiDefine Item
 * @apiSuccess {String} _id Unique item(or resource) identifier
 * @apiSuccess {String} type Human readable type of an item(or resource).
 * @apiSuccess {String} [code] Human readable, unique identifier of an item.
 * @apiSuccess {String} name Human readable name of an item(or resource).
 * @apiSuccess {String} [description] A brief summary(definition) about an
 * item(or resource) if available i.e additional details that clarify what
 * is an item(or resource).
 * @apiSuccess {String} uom Human readable unit of measure of an item(or resource).
 * @apiSuccess {Number} minStockAllowed Overall lower threshold stock of an
 * item(or resource) below which re-fill will be required.
 * @apiSuccess {Number} maxStockAllowed Overall upper threshold stock of an
 * item(or resource) above which re-allocation/no-purchase will be required.
 * @apiSuccess {String} [color] A color code(in hexadecimal format) used to
 * differentiate an item(or resource) type visually.
 * @apiSuccess {String} [icon] An icon(in url, base64, svg formats) used to
 * differentiate item(or resource) type visually.
 * @apiSuccess {Boolean} [expirable=false] Flag whether an item(or resource)
 * may expire when stocked.
 * @apiSuccess {Date} createdAt Date when item(or resource) was created.
 * @apiSuccess {Date} updatedAt Date when item(or resource) was last updated.
 */


/**
 * @apiDefine Items
 * @apiSuccess {Object[]} data List of items
 * @apiSuccess {String} data._id Unique item(or resource) identifier
 * @apiSuccess {String} data.type Human readable type of an item(or resource).
 * @apiSuccess {String} [data.code] Human readable, unique identifier of an item.
 * @apiSuccess {String} data.name Human readable name of an item(or resource).
 * @apiSuccess {String} [data.description] A brief summary(definition) about an
 * item(or resource) if available i.e additional details that clarify what
 * is an item(or resource).
 * @apiSuccess {String} data.uom Human readable unit of measure of an
 * item(or resource).
 * @apiSuccess {Number} data.minStockAllowed Overall lower threshold stock of an
 * item(or resource) below which re-fill will be required.
 * @apiSuccess {Number} data.maxStockAllowed Overall upper threshold stock of an
 * item(or resource) above which re-allocation/no-purchase will be required.
 * @apiSuccess {String} [data.color] A color code(in hexadecimal format) used to
 * differentiate an item(or resource) type visually.
 * @apiSuccess {String} [data.icon] An icon(in url, base64, svg formats) used to
 * differentiate item(or resource) type visually.
 * @apiSuccess {Boolean} [expirable=false] Flag whether an item(or resource)
 * may expire when stocked.
 * @apiSuccess {Date} data.createdAt Date when item(or resource) was created.
 * @apiSuccess {Date} data.updatedAt Date when item(or resource) was last updated.
 * @apiSuccess {Number} total Total number of items(or resources)
 * @apiSuccess {Number} size Number of items(or resources) returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest items(or resources)
 * was last modified
 */


/**
 * @apiDefine ItemSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "_id": "5bf502f74abf116f49e8e11e",
 *    "type": "Other",
 *    "code": "BFA",
 *    "name": "BLANKET FOR ADULTS",
 *    "uom": "piece",
 *    "minStockAllowed": 10,
 *    "maxStockAllowed": 1000,
 *    "color": "#D72E29",
 *    "expirable": false,
 *    "updatedAt": "2018-11-21T07:02:15.131Z",
 *    "createdAt": "2018-11-21T07:02:15.131Z"
 *  }
 */


/**
 * @apiDefine ItemsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "data": [
 *    {
 *      "_id": "5bf502f74abf116f49e8e11e",
 *      "type": "Other",
 *      "code": "BFA",
 *      "name": "BLANKET FOR ADULTS",
 *      "uom": "piece",
 *      "minStockAllowed": 10,
 *      "maxStockAllowed": 1000,
 *      "color": "#D72E29",
 *      "expirable": false,
 *      "updatedAt": "2018-11-21T07:02:15.131Z",
 *      "createdAt": "2018-11-21T07:02:15.131Z"
 *     }
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
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;
const { getString } = require('@lykmapipo/env');


/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_LIST = '/items';
const PATH_SINGLE = '/items/:id';
const PATH_SCHEMA = '/items/schema/';


/* declarations */
const Item = require(path.join(__dirname, 'item.model'));
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /items List Itemss
 * @apiVersion 1.0.0
 * @apiName GetItems
 * @apiGroup Item
 * @apiDescription Returns a list of items
 * @apiUse RequestHeaders
 * @apiUse Items
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ItemsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getItems(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery);

  Item
    .get(options, function onGetItems(error, results) {

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
 * @api {get} /items/schema Get Items Schema
 * @apiVersion 1.0.0
 * @apiName GetItemSchema
 * @apiGroup Item
 * @apiDescription Returns item json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getItemSchema(request, response) {
  const schema = Item.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /items Create New Items
 * @apiVersion 1.0.0
 * @apiName PostItem
 * @apiGroup Item
 * @apiDescription Create new item
 * @apiUse RequestHeaders
 * @apiUse Item
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ItemSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .post(PATH_LIST, function postItem(request, response, next) {

    // obtain request body
    const body = _.merge({}, request.body);

    Item
      .post(body, function onPostItem(error, created) {

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
 * @api {get} /items/:id Get Existing Items
 * @apiVersion 1.0.0
 * @apiName GetItem
 * @apiGroup Item
 * @apiDescription Get existing item
 * @apiUse RequestHeaders
 * @apiUse Item
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ItemSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .get(PATH_SINGLE, function getItem(request, response, next) {

    // obtain request options
    const options = _.merge({}, request.mquery);

    // obtain item id
    options._id = request.params.id;

    Item
      .getById(options, function onGetItem(error, found) {

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
 * @api {patch} /items/:id Patch Existing Items
 * @apiVersion 1.0.0
 * @apiName PatchItem
 * @apiGroup Item
 * @apiDescription Patch existing item
 * @apiUse RequestHeaders
 * @apiUse Item
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ItemSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .patch(PATH_SINGLE, function patchItem(request, response, next) {

    // obtain item id
    const { id } = request.params;

    // obtain request body
    const patches = _.merge({}, request.body);

    Item
      .patch(id, patches, function onPatchItem(error, patched) {

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
 * @api {put} /items/:id Put Existing Items
 * @apiVersion 1.0.0
 * @apiName PutItem
 * @apiGroup Item
 * @apiDescription Put existing item
 * @apiUse RequestHeaders
 * @apiUse Item
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ItemSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .put(PATH_SINGLE, function putItem(request, response, next) {

    // obtain item id
    const { id } = request.params;

    // obtain request body
    const updates = _.merge({}, request.body);

    Item
      .put(id, updates, function onPutItem(error, updated) {

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
 * @api {delete} /items/:id Delete Existing Items
 * @apiVersion 1.0.0
 * @apiName DeleteItem
 * @apiGroup Item
 * @apiDescription Delete existing item
 * @apiUse RequestHeaders
 * @apiUse Item
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse ItemSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .delete(PATH_SINGLE, function deleteItem(request, response, next) {

    // obtain item id
    const { id } = request.params;

    Item
      .del(id, function onDeleteItem(error, deleted) {

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
