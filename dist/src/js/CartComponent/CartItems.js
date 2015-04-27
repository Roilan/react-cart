var React = require('react');

var CartItems = React.createClass({
    render: function() {
      var cartItems = this.props.cartItems.map(function(item, i) {
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
          {cartItems}
        </ul>
      )
    }
});

var Cart = React.createClass({
  render: function() {
    return (
      <div>
        <CartItems cartItems={this.props.cartItems}/>
      </div>
    )
  }
});

module.exports = Cart;