var Reflux = require('reflux');
var request = require('reqwest');
var api = require('../Api');
var AdminActions = require('../Actions/AdminActions');
var StoreActions = require('../Actions/StoreActions');

var AdminStore = Reflux.createStore({
  listenables: [AdminActions],

  items: {},

  updateItem (name, value) {
    this.items[name] = value

    this.trigger(this.items);
  },

  addItem () {
    var itemName = this.items.itemName;
    var itemPrice = this.items.itemPrice;
    var itemAmt = this.items.itemAmt;

    if (itemName && itemPrice && itemAmt !== '') {
      request({
        url: api.store,
        method: 'POST',
        data: {
          price: this.items.itemPrice,
          name: this.items.itemName,
          amt: this.items.itemAmt
        },
        success: () => {
          StoreActions.updateStoreItems();
        }
      })
    } else {
      console.log('error');
      console.log(this.items);
    }
  }
});

module.exports = AdminStore;