var request = require('reqwest');

var AddStoreItem = React.createClass({
    getInitialState: function() {
      return {
          itemName: '',
          itemPrice: '',
          itemDescription: ''
      }
    },
    addToStore: function(e) {
        e.preventDefault();

        if(this.state.itemDescription && this.state.itemName && this.state.itemPrice !== '') {
            request({
                url: 'http://104.236.200.153:3000/api/items',
                method: 'POST',
                data: {
                    price: this.state.itemPrice,
                    name: this.state.itemName,
                    description: this.state.itemDescription
                },
                success: function(response) {
                    console.log(response);

                }
            });
        }
    },
    updateCurrentState: function(key) {
        var update = {};

        return function(e) {
            update[key] = e.target.value;
            this.setState(update);
        }.bind(this)
    },
    render: function() {
       return (
           <div className='col-sm-12'>
               <form>
                   <ul>
                       <li className='row list-inline'>
                           <label htmlFor='itemName'>Name:</label>
                           <input type='text' id='itemName'
                               defaultValue={this.state.itemName}
                               onChange={this.updateCurrentState('itemName')}
                           />

                           <label htmlFor='itemPrice'>Price:</label>
                           <input type='number' id='itemPrice'
                               defaultValue={this.state.itemPrice}
                               onChange={this.updateCurrentState('itemPrice')}
                           />

                           <label htmlFor='itemDescription'>Description:</label>
                           <input type='text' id='itemDescription'
                               defaultValue={this.state.itemDescription}
                               onChange={this.updateCurrentState('itemDescription')}
                           />

                           <button id='cartAddBtn' className='btn btn-primary'onClick={this.addToStore}>
                               Add
                           </button>
                       </li>

                       <li>
                           <span>{this.state.itemName}</span> <br />
                           <span>{this.state.itemPrice}</span> <br />
                           <span>{this.state.itemDescription}</span>
                       </li>
                   </ul>
               </form>
           </div>
       )
    }
});

module.exports = AddStoreItem;