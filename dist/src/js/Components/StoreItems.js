var React = require('react');
var Reflux = require('reflux');
var CartStore = require('../Stores/CartStore');
var StoreActions = require('../Actions/StoreActions');

var StoreItems = React.createClass({
  mixins: [Reflux.connect(CartStore)],

  getInitialState () {
    return {
      storeItems: []
    }
  },

  addItem (item) {
    return (e) => {
      e.preventDefault();
      StoreActions.addItemToCart(item);
    }
  },

  render () {
    var items = this.state.storeItems.map((item, i) => {
      return (
        <li className='row list-inline items-row' key={i}>
          <form>
            <input type='number' className='itemAmt' defaultValue={item.amt} />
            <span className="itemName">{item.name}</span>
            <button
              className="btn btn-primary btn-sm btn-cart"
              onClick={this.addItem(item)}>
              Add
            </button>
            <span className="itemPrice">{item.price}</span>
          </form>
        </li>
      )
    });

    return (
      <ul>
        <li className="row list-inline text-center">
          <h2>The Store</h2>
        </li>
        <li className="row list-inline item-title">
          <span>Amt</span>
          <span>Name</span>
          <span>Price</span>
        </li>

        {items}
      </ul>
    )
  }
});

module.exports = StoreItems;