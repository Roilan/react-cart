var React = require('react');
var request = require('reqwest');
var Cart = require('./CartItems');

var api = 'http://104.236.200.153:3000/';
var apiCart = api + 'api/currentcart';

var CartContainer = React.createClass({
  getInitialState: function() {
    return {
      cartItems: [],
      cartItemAmt: '',
      cartItemName: '',
      cartItemPrice: ''
    }
  },
  componentDidMount: function() {
    this.updateCartItems();
  },
  updateItemState: function(key) {
    var update = {};

    return function(e) {
      update[key] = e.target.value;
      this.setState(update);
    }.bind(this)
  },
  updateCartItems: function() {
    request({
      url: apiCart,
      method: 'GET',
      success: function(response) {
        this.setState({cartItems: response});
      }.bind(this)
    })
  },
  render: function() {
    return (
      <div>
        <Cart cartItems={this.state.cartItems} />
      </div>
    )
  }
});

module.exports = CartContainer;