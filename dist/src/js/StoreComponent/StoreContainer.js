var React = require('react');
var request = require('reqwest');
var StoreItems = require('./StoreItems');
var AddStoreItem = require('./AddStoreItem');

var api = 'http://104.236.200.153:3000/';

var StoreContainer = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            itemName: '',
            itemPrice: '',
            itemDescription: ''
        }
    },
    componentDidMount: function() {
        this.updateStoreItems();
    },
    addToStore: function(e) {
        e.preventDefault();

        if(this.state.itemDescription && this.state.itemName && this.state.itemPrice !== '') {
            request({
                url: api + 'api/items',
                method: 'POST',
                data: {
                    price: this.state.itemPrice,
                    name: this.state.itemName,
                    description: this.state.itemDescription
                },
                success: function() {
                    this.updateStoreItems();
                }.bind(this)
            });
        } else {
            console.log('empty!');
        }
    },
    updateItemState: function(key) {
        var update = {};

        return function(e) {
            update[key] = e.target.value;
            this.setState(update);
        }.bind(this)
    },
    updateStoreItems: function() {
        request({
            url: api + 'api/items',
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
            <div>
                <AddStoreItem
                    itemName={this.state.itemName}
                    itemPrice={this.state.itemPrice}
                    itemDescription={this.state.itemDescription}
                    updateItemState={this.updateItemState}
                    addToStore={this.addToStore}
                />

                <StoreItems items={this.state.items} />
            </div>
        )
    }
});

module.exports = StoreContainer;