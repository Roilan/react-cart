var React = require('react');
var Reflux = require('reflux');
var AdminStore = require('../../Stores/AdminStore');
var AdminActions = require('../../Actions/AdminActions');

var AdminAddItem = React.createClass({
  mixins: [Reflux.connect(AdminStore)],

  //onChange={this.props.updateItemState('itemName')}

  getInitialState () {
    return {
      itemName: '',
      itemPrice: '',
      itemAmt: ''
    }
  },

  addItem: function (e) {
    e.preventDefault();
    AdminActions.AdminAddItem();
  },

  updateItem (name) {
    return (e) => {
      AdminActions.updateItem(name, e.target.value);
    }
  },

  render () {
    return (
      <div className='col-sm-12'>
        <h4>Admin: Add Item</h4>

        <span>Name: {this.state.itemName}</span> <br />
        <span>Price: {this.state.itemPrice}</span> <br />
        <span>Amt: {this.state.itemAmt}</span>

        <form onSubmit={this.addItem}>
          <li className="row list-inline">
            <label htmlFor='itemName'>Name:</label>
            <input type='text' id='itemName'
              defaultValue={this.state.itemName}
              onChange={this.updateItem('itemName')}
            />

            <label htmlFor='itemPrice'>Price:</label>
            <input type='number' id='itemPrice'
              defaultValue={this.state.itemPrice}
              onChange={this.updateItem('itemPrice')}
            />

            <label htmlFor='itemAmt'>Amount:</label>
            <input type='number' id='itemAmt'
              defaultValue={this.state.itemAmt}
              onChange={this.updateItem('itemAmt')}
            />

            <button id='cartAddBtn'className='btn btn-primary'>Add</button>
          </li>
        </form>
      </div>
    )
  }
});

module.exports = AdminAddItem;