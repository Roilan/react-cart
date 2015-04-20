(function() {

var CartItem = React.createClass({
    getInitialState: function() {
        return {
            itemAmt: 1,
            itemName: 'Food',
            itemPrice: '9.99'
        };
    },

    handleChange: function(e) {
      this.setState({
         itemAmt: e.target.value
      });
    },

    render: function() {
        return(
            <li className='row list-inline items-row'>
                <form>
                    <span>{this.state.itemAmt}</span>
                    <input type='number' className='itemAmt' value={this.state.itemAmt} onChange={this.handleChange} />
                    <span className='itemName'>{this.state.itemName}</span>
                    <button className='btn btn-primary btn-sm btn-cart'>Add</button>
                    <span className='itemPrice'>${this.state.itemPrice}</span>
                </form>
            </li>
        );
    }

});

var CartNames = React.createClass({
   render: function() {
       return(
            <li className="row list-inline item-title">
                <span>Amt</span>
                <span>Name</span>
                <span>Price</span>
            </li>
       );
   }
});

var Cart = React.createClass({
   render: function() {
       return(
           <div className='col-sm-12 text-left'>
               <ul>
                   <CartNames />
                   <CartItem />
               </ul>
           </div>
       );
   }
});

React.render(
    <Cart />,
    document.getElementById('CartItems')
);

})();
