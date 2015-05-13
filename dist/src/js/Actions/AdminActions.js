var Reflux = require('reflux');

var AdminActions = Reflux.createActions([
  'AdminAddItem',
  'AdminUpdateItem',
  'updateItem'
]);

module.exports = AdminActions;