var React = require('react');
var Reflux = require('reflux');
var CartStore = require('../Stores/CartStore');

var CartItems = React.createClass({
  mixins: [Reflux.connect(CartStore)],

  getInitialState () {
    return {
      cartItems: []
    }
  },

  render () {
    var items = this.state.cartItems.map((item, i) => {
      return (
        <li className='row list-inline items-row' key={i}>
          <span className='itemAmt'>{item.amt}</span>
          <span className='itemName'>{item.name}</span>
          <button className='btn btn-danger btn-sm btn-cart-remove'>Remove</button>
          <button className='btn btn-primary btn-sm btn-cart'>Update</button>
          <span className='itemPrice'>{item.totalprice}</span>
        </li>
      )
    });

    return (
      <ul>
        <li className='row list-inline text-center'>
          <h2>Current Cart</h2>
        </li>
        {items}
      </ul>
    )
  }
});

module.exports = CartItems;