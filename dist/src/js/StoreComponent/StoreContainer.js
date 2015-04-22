var request = require('reqwest');
var StoreItems = require('./StoreItems');

var StoreContainer = React.createClass({
    getInitialState: function() {
        return {
            items: []
        }
    },
    componentDidMount: function() {
        this.updateStoreItems();
    },
    updateStoreItems: function() {
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
        return (
            <StoreItems items={this.state.items}/>
        )
    }
});

module.exports = StoreContainer;