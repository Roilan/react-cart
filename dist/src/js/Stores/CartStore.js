var Reflux = require('reflux');
var request = require('reqwest');
var api = require('../Api');
var CartActions = require('../Actions/CartActions');
var StoreActions = require('../Actions/StoreActions');

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
      url: api.cart,
      method: 'GET',
      success: (response) => {
        this.trigger({cartItems: response});
      }
    });
  },

  updateStoreItems () {
    request({
      url: api.store,
      method: 'GET',
      success: (response) => {
        this.trigger({storeItems: response});
      }
    })
  }
});

module.exports = CartStore;