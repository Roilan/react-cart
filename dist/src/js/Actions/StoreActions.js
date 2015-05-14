var Reflux = require('reflux');

var StoreActions = Reflux.createActions([
  'updateStoreItems',
  'addItemToCart'
]);

module.exports = StoreActions;