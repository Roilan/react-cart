var React = require('react');

var StoreContainer = require('./StoreComponent/StoreContainer');
var CartItems = require('./Components/CartItems');

React.render(
  <StoreContainer />,
  document.getElementById('StoreItems')
);

React.render(
  <CartItems />,
  document.getElementById('ShoppingCart')
);