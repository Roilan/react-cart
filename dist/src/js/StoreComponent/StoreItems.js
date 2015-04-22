var ItemList = React.createClass({
    render: function() {
        var items = this.props.items.map(function(item, i) {
            return (
                <li className='row list-inline items-row' key={i}>
                    <form>
                        <input type='number' className='itemAmt' defaultValue={item.id} />
                        <span className='itemName'>{item.name}</span>
                        <button className='btn btn-primary btn-sm btn-cart'>Add</button>
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

var StoreItems = React.createClass({
    render: function() {
        return(
            <div className='col-sm-12 text-left'>
                <ItemList items={this.props.items} />
            </div>
        );
    }
});

module.exports = StoreItems;