/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const argv = require('yargs').argv;
const fakeResponder = require('./fake-responder.js');
const bundleMaker = require('./bundle.js');

const PORT = argv.port || '4444';

// Initialize express app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(morgan('dev')); // used to log incoming requests

// Allow Cross Origin request from 'test.localhost:9999'
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/bundle', bundleMaker, (req, res) => {
  res.send();
});

app.post('/appnexus', fakeResponder, (req, res) => {
  res.send();
});

app.get('/testbid', (req, res) => {
  const bidRequests = JSON.parse(req.query.bids);
  const bidResponses = bidRequests.map(function (bidRequest) {
    return {
      requestId: bidRequest.bidId,
      cpm: 10,
      currency: 'USD',
      width: bidRequest.sizes[0][0],
      height: bidRequest.sizes[0][1],
      creativeId: 123456789,
      netRevenue: true,
      ttl: 500,
      ad: '<h1>tet ad</h1>',
      mediaType: 'banner',
      meta: {
          advertiserDomains: ['https://example.com']
      }
    };
  });
  res.send(bidResponses);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`fake-server listening on http://localhost:${PORT}`);
});
