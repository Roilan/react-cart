var React = require('react');

var StoreItems = require('./Components/StoreItems');
var CartItems = require('./Components/CartItems');

var AdminAddItem = require('./Components/Admin/AdminAddItem');

React.render(
  <StoreItems />,
  document.getElementById('StoreItems')
);

React.render(
  <CartItems />,
  document.getElementById('ShoppingCart')
);

React.render(
  <AdminAddItem />,
  document.getElementById('AdminPanel')
);