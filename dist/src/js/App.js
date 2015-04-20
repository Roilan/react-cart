var CartAddButton = require('./CartAddButton');

var CartItemList = React.createClass({
    render: function() {

        var itemAmt = this.props.itemAmt.map(function(item, i) {
            return <input type='number' className='itemAmt' defaultValue={item} key={i} />
        });

        var itemName = this.props.itemName.map(function(name, i) {
            return <span className='itemName' key={i}>{name}</span>
        });

        var itemPrice = this.props.itemPrice.map(function(price, i) {
           return <span className='itemPrice' key={i}>{price}</span>
        })

        return (
            <li className='row list-inline items-row'>
                <form>
                    {itemAmt}
                    {itemName}
                    {itemPrice}

                    <CartAddButton />
                </form>
            </li>
        )
    }
});

var CartItem = React.createClass({
    getInitialState: function() {
        return {
            cartItemAmt: [9, 5],
            cartItemName: ['Food', 'Treats'],
            cartItemPrice: ['9.99', '5.99']
        }
    },
    render: function() {
        return (
            <ul>
                <li className="row list-inline item-title">
                    <span>Amt</span>
                    <span>Name</span>
                    <span>Price</span>
                </li>

                <CartItemList
                    itemAmt={this.state.cartItemAmt}
                    itemName={this.state.cartItemName}
                    itemPrice={this.state.cartItemPrice}
                />
            </ul>
        );
    }

});

var CartContainer = React.createClass({
    render: function() {
       return(
           <div className='col-sm-12 text-left'>
               <CartItem />
           </div>
       );
   }
});

React.render(
    <CartContainer />,
    document.getElementById('CartItems')
);

