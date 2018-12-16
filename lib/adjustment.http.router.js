'use strict';


/**
 * @apiDefine Adjustment Adjustment
 *
 * @apiDescription A representation of an item(i.e materials, services, staff,
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
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 1.0.0
 * @version 1.0.0
 * @public
 */


/**
 * @apiDefine Adjustment
 * @apiSuccess {String} _id Unique item(or resource) identifier
 * @apiSuccess {String} type Human readable type of performed stock adjustment.
 * @apiSuccess {String} reason Human readable reason of performed stock
 * adjustment.
 * @apiSuccess {Item} item An item under which stock adjustment is performed.
 * @apiSuccess {Number} quantity Value which a stock of an item(or resource)
 * is adjusted.
 * @apiSuccess {Number} cost Total cost associated with adjustion a stock of an
 * item(or resource).
 * @apiSuccess {String} remarks A brief summary about performed adjustment if
 * available i.e additional details that clarify why adjustment was performed.
 * @apiSuccess {Date} createdAt Date when adjustment was created.
 * @apiSuccess {Date} updatedAt Date when adjustment was last updated.
 */


/**
 * @apiDefine Adjustments
 * @apiSuccess {Adjustment[]} data List of adjustments
 * @apiSuccess {String} data._id Unique item(or resource) identifier
 * @apiSuccess {String} data.type Human readable type of performed stock
 * adjustment.
 * @apiSuccess {String} data.reason Human readable reason of performed stock
 * adjustment.
 * @apiSuccess {Item} data.item An item under which stock adjustment is
 * performed.
 * @apiSuccess {Number} data.quantity Value which a stock of an item(or resource)
 * is adjusted.
 * @apiSuccess {Number} data.cost Total cost associated with adjustion a stock
 * of an item(or resource).
 * @apiSuccess {String} data.remarks A brief summary about performed adjustment
 * if available i.e additional details that clarify why adjustment was performed.
 * @apiSuccess {Date} data.createdAt Date when adjustment was created.
 * @apiSuccess {Date} data.updatedAt Date when adjustment was last updated.
 * @apiSuccess {Number} total Total number of adjustments
 * @apiSuccess {Number} size Number of adjustments returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest adjustments
 * was last modified
 */


/**
 * @apiDefine AdjustmentSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "_id": "5bf52d8cfd8603182a58c989",
 *    "type": "Deduction",
 *    "reason": "Cycle Count",
 *    "item": {
 *        "_id": "5bf52d88fd8603182a58c933",
 *        "type": "Other",
 *        "code": "BS",
 *        "name": "BAR SOAP",
 *        "color": "#D72E29"
 *    },
 *    "quantity": 44,
 *    "cost": 6350,
 *    "remarks": "Sit quis libero dolorum quasi officia neque.",
 *    "updatedAt": "2018-11-21T10:03:57.679Z",
 *    "createdAt": "2018-11-21T10:03:57.679Z"
 *  }
 */


/**
 * @apiDefine AdjustmentsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "data": [
 *  {
 *    "_id": "5bf52d8cfd8603182a58c989",
 *    "type": "Deduction",
 *    "reason": "Cycle Count",
 *    "item": {
 *        "_id": "5bf52d88fd8603182a58c933",
 *        "type": "Other",
 *        "code": "BS",
 *        "name": "BAR SOAP",
 *        "color": "#D72E29"
 *    },
 *    "quantity": 44,
 *    "cost": 6350,
 *    "remarks": "Sit quis libero dolorum quasi officia neque.",
 *    "updatedAt": "2018-11-21T10:03:57.679Z",
 *    "createdAt": "2018-11-21T10:03:57.679Z"
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
const PATH_LIST = '/adjustments';
const PATH_SINGLE = '/adjustments/:id';
const PATH_SCHEMA = '/adjustments/schema/';


/* declarations */
const Adjustment = include(__dirname, 'adjustment.model');
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /adjustments List Adjustments
 * @apiVersion 1.0.0
 * @apiName GetAdjustments
 * @apiGroup Adjustment
 * @apiDescription Returns a list of adjustments
 * @apiUse RequestHeaders
 * @apiUse Adjustments
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse AdjustmentsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getAdjustments(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery);

  Adjustment
    .get(options, function onGetAdjustments(error, results) {

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
 * @api {get} /adjustments/schema Get Adjustments Schema
 * @apiVersion 1.0.0
 * @apiName GetAdjustmentSchema
 * @apiGroup Adjustment
 * @apiDescription Returns item json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getAdjustmentSchema(request, response) {
  const schema = Adjustment.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /adjustments Create New Adjustments
 * @apiVersion 1.0.0
 * @apiName PostAdjustment
 * @apiGroup Adjustment
 * @apiDescription Create new item
 * @apiUse RequestHeaders
 * @apiUse Adjustment
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse AdjustmentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .post(PATH_LIST, function postAdjustment(request, response, next) {

    // obtain request body
    const body = _.merge({}, request.body);

    // TODO Stock.adjust(body)
    Adjustment
      .post(body, function onPostAdjustment(error, created) {

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
 * @api {get} /adjustments/:id Get Existing Adjustments
 * @apiVersion 1.0.0
 * @apiName GetAdjustment
 * @apiGroup Adjustment
 * @apiDescription Get existing item
 * @apiUse RequestHeaders
 * @apiUse Adjustment
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse AdjustmentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .get(PATH_SINGLE, function getAdjustment(request, response, next) {

    // obtain request options
    const options = _.merge({}, request.mquery);

    // obtain item id
    options._id = request.params.id;

    Adjustment
      .getById(options, function onGetAdjustment(error, found) {

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
 * @api {patch} /adjustments/:id Patch Existing Adjustments
 * @apiVersion 1.0.0
 * @apiName PatchAdjustment
 * @apiGroup Adjustment
 * @apiDescription Patch existing item
 * @apiUse RequestHeaders
 * @apiUse Adjustment
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse AdjustmentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .patch(PATH_SINGLE, function patchAdjustment(request, response, next) {

    // obtain item id
    const { id } = request.params;

    // obtain request body
    const patches = _.merge({}, request.body);

    // TODO Stock.adjust(patches)
    Adjustment
      .patch(id, patches, function onPatchAdjustment(error, patched) {

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
 * @api {put} /adjustments/:id Put Existing Adjustments
 * @apiVersion 1.0.0
 * @apiName PutAdjustment
 * @apiGroup Adjustment
 * @apiDescription Put existing item
 * @apiUse RequestHeaders
 * @apiUse Adjustment
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse AdjustmentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .put(PATH_SINGLE, function putAdjustment(request, response, next) {

    // obtain item id
    const { id } = request.params;

    // obtain request body
    const updates = _.merge({}, request.body);

    // TODO Stock.adjust(update)
    Adjustment
      .put(id, updates, function onPutAdjustment(error, updated) {

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
 * @api {delete} /adjustments/:id Delete Existing Adjustments
 * @apiVersion 1.0.0
 * @apiName DeleteAdjustment
 * @apiGroup Adjustment
 * @apiDescription Delete existing item
 * @apiUse RequestHeaders
 * @apiUse Adjustment
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse AdjustmentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .delete(PATH_SINGLE, function deleteAdjustment(request, response, next) {

    // obtain item id
    const { id } = request.params;

    // TODO method not supported
    Adjustment
      .del(id, function onDeleteAdjustment(error, deleted) {

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
