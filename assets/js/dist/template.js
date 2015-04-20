(function() {

var CartItem = React.createClass({displayName: "CartItem",
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
            React.createElement("li", {className: "row list-inline items-row"}, 
                React.createElement("form", null, 
                    React.createElement("span", null, this.state.itemAmt), 
                    React.createElement("input", {type: "number", className: "itemAmt", value: this.state.itemAmt, onChange: this.handleChange}), 
                    React.createElement("span", {className: "itemName"}, this.state.itemName), 
                    React.createElement("button", {className: "btn btn-primary btn-sm btn-cart"}, "Add"), 
                    React.createElement("span", {className: "itemPrice"}, "$", this.state.itemPrice)
                )
            )
        );
    }

});

var CartNames = React.createClass({displayName: "CartNames",
   render: function() {
       return(
            React.createElement("li", {className: "row list-inline item-title"}, 
                React.createElement("span", null, "Amt"), 
                React.createElement("span", null, "Name"), 
                React.createElement("span", null, "Price")
            )
       );
   }
});

var Cart = React.createClass({displayName: "Cart",
   render: function() {
       return(
           React.createElement("div", {className: "col-sm-12 text-left"}, 
               React.createElement("ul", null, 
                   React.createElement(CartNames, null), 
                   React.createElement(CartItem, null)
               )
           )
       );
   }
});

React.render(
    React.createElement(Cart, null),
    document.getElementById('CartItems')
);

})();
