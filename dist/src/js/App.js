var React = require('react');

var StoreItems = require('./Components/StoreItems');
var CartItems = require('./Components/CartItems');

React.render(
  <StoreItems />,
  document.getElementById('StoreItems')
);

React.render(
  <CartItems />,
  document.getElementById('ShoppingCart')
);