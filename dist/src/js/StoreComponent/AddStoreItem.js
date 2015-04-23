var React = require('react');

var AddStoreItem = React.createClass({
    render: function() {
       return (
           <div className='col-sm-12'>
               <h4>Admin: Add Item</h4>
               <form>
                   <ul>
                       <li className='row list-inline'>
                           <label htmlFor='itemName'>Name:</label>
                           <input type='text' id='itemName'
                               defaultValue={this.props.itemName}
                               onChange={this.props.updateItemState('itemName')}
                           />

                           <label htmlFor='itemPrice'>Price:</label>
                           <input type='number' id='itemPrice'
                               defaultValue={this.props.itemPrice}
                               onChange={this.props.updateItemState('itemPrice')}
                           />

                           <label htmlFor='itemDescription'>Description:</label>
                           <input type='text' id='itemDescription'
                               defaultValue={this.props.itemDescription}
                               onChange={this.props.updateItemState('itemDescription')}
                           />

                           <button id='cartAddBtn' className='btn btn-primary' onClick={this.props.addToStore}>
                               Add
                           </button>
                       </li>
                   </ul>
               </form>
           </div>
       )
    }
});

module.exports = AddStoreItem;