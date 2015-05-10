var Reflux = require('reflux');
var request = require('reqwest');
var CartActions = require('../Actions/CartActions');

var api = 'http://104.236.200.153:3000/';
var apiCart = api + 'api/currentcart';

var CartStore = Reflux.createStore({
  listenables: [CartActions],

  cartItems: [],

  init () {
    this.updateCartItems();
  },

  updateCartItems () {
    request({
      url: apiCart,
      method: 'GET',
      success: (response) => {
        this.trigger({cartItems: response});
      }
    });
  }
});

module.exports = CartStore;