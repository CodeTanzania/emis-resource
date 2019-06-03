'use strict';

/* ensure mongo uri */
process.env.MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/emis-resource';

/* dependencies */
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
  info,
  adjustmentRouter,
  itemRouter,
  stockRouter,
  warehouseRouter,
} = include(__dirname, '..');


// seeds
const seedParties = (features, next) => {
  let parties = include(__dirname, 'seeds', 'parties');

  parties = _.map(parties, party => {
    party.location = _.sample(features).toObject(); // todo: examine this
    return party;
  });

  Party.seed(parties, (error, seeded) => {
    parties = seeded;
    next(error, parties, features);
  });
};

const seedItems = (parties, features, next) => {
  Item.seed((error, items) => next(error, parties, features, items));
};

const seedFeatures = (next) => {
  let features = include(__dirname, 'seeds', 'features');
  Feature.seed(features,(error, seeded) => {
    features = seeded;
    next(error, features);
  });
};

const seedStocks = (parties, features, items, next) => {
  const stocks = _.map(items, (item) => {
    return {
      store: _.sample(features),
      owner: _.sample(parties),
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
    [ seedFeatures, seedParties, /*seedItems, seedStocks, seedAdjustments*/],
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
