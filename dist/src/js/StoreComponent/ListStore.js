var AddButton = require('./AddButton');
var request = require('reqwest');

var ItemList = React.createClass({
    render: function() {
        var items = this.props.items.map(function(item, i) {
            return (
                <li className='row list-inline items-row' key={i}>
                    <form>
                        <input type='number' className='itemAmt' defaultValue={item.id} />
                        <span className='itemName'>{item.name}</span>
                        <AddButton />
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
    getInitialState: function() {
        return {
            items: []
        }
    },
    componentDidMount: function() {
        request({
            url: 'http://104.236.200.153:3000/api/items',
            method: 'GET',
            success: function(response) {
                this.setState({
                    items: response
                });
            }.bind(this)
        });
    },
    render: function() {
        return(
            <div className='col-sm-12 text-left'>
                <ItemList items={this.state.items} />
            </div>
        );
    }
});

module.exports = StoreItems;