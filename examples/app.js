'use strict';


/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-resource');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { waterfall } = require('async');
const mongoose = require('mongoose');
const { Party } = require('@codetanzania/emis-stakeholder');
const {
  Item,
  Stock,
  Adjustment,
  apiVersion,
  info,
  app
} = require(path.join(__dirname, '..'));


/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);

waterfall([
  (next) => { Party.seed(next); },

  (parties, next) => {
    Item.seed((error, items) => next(error, parties, items));
  },

  (parties, items, next) => {
    const stocks = _.map(items, (item, index) => {
      return {
        owner: parties[index % parties.length],
        item: item,
        quantity: Math.ceil(Math.random() * 1000),
        minAllowed: Math.ceil(Math.random() * 10),
        maxAllowed: Math.ceil(Math.random() * 10000),
      };
    });
    Stock.seed(stocks, (error /*, stocks*/ ) => next(error, items));
  },

  (items, next) => {
    const adjustments = _.map(items, (item) => {
      const adjustment = Adjustment.fake();
      adjustment.item = item;
      adjustment.quantity = Math.ceil(Math.random() * 100);
      adjustment.cost = Math.ceil(Math.random() * 10000);
      return adjustment;
    });
    Adjustment.insertMany(adjustments, next);
  }
], (error /*, results*/ ) => {

  console.log(error);

  /* expose module info */
  app.get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  /* fire the app */
  app.start((error, env) => {
    console.log(
      `visit http://0.0.0.0:${env.PORT}/v${apiVersion}/items`
    );
  });

});
