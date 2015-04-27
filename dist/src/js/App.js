var React = require('react');

var StoreContainer = require('./StoreComponent/StoreContainer');
var CartContainer = require('./CartComponent/CartContainer');

React.render(
  <StoreContainer />,
  document.getElementById('StoreItems')
);

React.render(
  <CartContainer />,
  document.getElementById('ShoppingCart')
);