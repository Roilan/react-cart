var CartAddButton = React.createClass({
    render: function() {
        return <button className='btn btn-primary btn-sm btn-cart'>Add</button>
    }
});

var CartItemList = React.createClass({
    render: function() {
        var items = this.props.items.map(function(item, i) {
           return (
               <li className='row list-inline items-row' key={i}>
                   <form>
                       <input type='number' className='itemAmt' defaultValue={item.amt} />
                       <span className='itemName'>{item.name}</span>
                       <CartAddButton />
                       <span className='itemPrice'>{item.price}</span>
                   </form>
               </li>
           )
        });

        return (
            <ul>
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

var CartContainer = React.createClass({
    getInitialState: function() {
        return {
            items: [
                {
                    amt: 9,
                    name: 'Food',
                    price: '9.99'
                },
                {
                    amt: 5,
                    name: 'Treats',
                    price: '5.99'
                }
            ]
        }
    },
    render: function() {
       return(
           <div className='col-sm-12 text-left'>
               <CartItemList items={this.state.items} />
           </div>
       );
   }
});

React.render(
    <CartContainer />,
    document.getElementById('CartItems')
);