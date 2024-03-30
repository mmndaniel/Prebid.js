'use strict';

import { registerBidder } from '../src/adapters/bidderFactory.js';
import { BANNER, VIDEO } from '../src/mediaTypes.js';
import { config } from '../src/config.js';


/**
 * @typedef {import('../src/adapters/bidderFactory.js').BidRequest} BidRequest
 */

const BIDDER_CODE = 'test';
const GVLID_CODE = 12345;

export const spec = {
  code: BIDDER_CODE,
  gvlid: GVLID_CODE,
  supportedMediaTypes: [BANNER, VIDEO],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function(bid) {
    return true;
  },

  /**
   * Takes an array of valid bid requests, all of which are guaranteed to have passed the isBidRequestValid() test.
   * Make a server request from the list of BidRequests.
   *
   * @param {*} validBidRequests
   * @param {*} bidderRequest
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function(validBidRequests, bidderRequest) {
    return {
        method: 'GET',
        url: `//localhost:4444/testbid`,
        data: `bids=${JSON.stringify(validBidRequests)}`,
        bids: validBidRequests
      };
  },

  /**
   * Parse the response and generate one or more bid objects.
   *
   * @param {*} serverResponse
   * @param {*} originalRequest
   */
  interpretResponse: function(serverResponse, originalRequest) {
    const responseBody = serverResponse.body;
    return responseBody;
  }
}
registerBidder(spec);
