'use strict';

/* ensure mongo uri */
process.env.MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/emis-resource';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { include } = require('@lykmapipo/include');
const { waterfall } = require('async');
const { start, get, mount } = require('@lykmapipo/express-common');
const { connect } = require('@lykmapipo/mongoose-common');
const { Feature, featureRouter } = require('@codetanzania/emis-feature');
const { Party, partyRouter } = require('@codetanzania/emis-stakeholder');
const {
  Item,
  Stock,
  Adjustment,
  apiVersion,
  info,
  adjustmentRouter,
  itemRouter,
  stockRouter,
  warehouseRouter,
} = include(__dirname, '..');

// seeds
const seedParties = next => Party.seed(next);
const seedItems = (parties, next) => {
  Item.seed((error, items) => next(error, parties, items));
};
const seedFeatures = (parties, items, next) => {
  Feature.seed((error, features) => next(error, parties, items, features));
};
const seedStocks = (parties, items, features, next) => {
  const stocks = _.map(items, (item, index) => {
    return {
      store: features[index % features.length],
      owner: parties[index % parties.length],
      item: item,
      quantity: Math.ceil(Math.random() * 1000),
      minAllowed: Math.ceil(Math.random() * 10),
      maxAllowed: Math.ceil(Math.random() * 10000),
    };
  });
  Stock.seed(stocks, (error, stocks) => next(error, items, stocks));
};
const seedAdjustments = (items, stocks, next) => {
  const adjustments = _.map(items, (item, index) => {
    const adjustment = Adjustment.fake();
    adjustment.item = item;
    adjustment.stock = stocks[index];
    adjustment.store = stocks[index].store;
    adjustment.party = stocks[index].owner;
    adjustment.quantity = Math.ceil(Math.random() * 100);
    adjustment.cost = Math.ceil(Math.random() * 10000);
    return adjustment;
  });
  Adjustment.insertMany(adjustments, next);
};

// establish mongodb connection
connect(error => {
  // seed
  waterfall(
    [seedParties, seedItems, seedFeatures, seedStocks, seedAdjustments],
    (error, results) => {
      // expose module info
      get('/', (request, response) => {
        response.status(200);
        response.json(info);
      });

      mount(
        featureRouter,
        partyRouter,
        adjustmentRouter,
        itemRouter,
        stockRouter,
        warehouseRouter
      );

      // fire the app
      start((error, env) => {
        console.log(`visit http://0.0.0.0:${env.PORT}`);
      });
    }
  );
});
