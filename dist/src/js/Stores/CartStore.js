var Reflux = require('reflux');
var request = require('reqwest');
var CartActions = require('../Actions/CartActions');
var StoreActions = require('../Actions/StoreActions');

var api = 'http://104.236.200.153:3000/';
var apiCart = api + 'api/currentcart';
var apiStore = api + 'api/store';

var CartStore = Reflux.createStore({
  listenables: [CartActions, StoreActions],

  cartItems: [],
  storeItems: [],

  init () {
    this.updateCartItems();
    this.updateStoreItems();
  },

  updateCartItems () {
    request({
      url: apiCart,
      method: 'GET',
      success: (response) => {
        this.trigger({cartItems: response});
      }
    });
  },

  updateStoreItems () {
    request({
      url: apiStore,
      method: 'GET',
      success: (response) => {
        this.trigger({storeItems: response});
      }
    })
  }
});

module.exports = CartStore;