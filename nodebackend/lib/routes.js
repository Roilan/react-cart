// lib/routes.js

var api = require('./api');

module.exports = [
    // *** ITEM ***
    {
        method: 'GET',
        path: '/api/store',
        handler: api.items.all
    },
    {
        method: 'GET',
        path: '/api/store/{id}',
        handler: api.items.byId
    },
    {
        method: 'DELETE',
        path: '/api/store/{id}',
        handler: api.items.delete
    },
    {
        method: 'POST',
        path: '/api/store',
        handler: api.items.create
    },
    {
        method: 'PUT',
        path: '/api/store/{id}',
        handler: api.items.update
    },


    // *** CART ***
    {
        method: 'GET',
        path: '/api/currentcart',
        handler: api.cart.all
    },
    {
        method: 'GET',
        path: '/api/currentcart/{id}',
        handler: api.cart.byId
    },
    {
        method: 'DELETE',
        path: '/api/currentcart/{id}',
        handler: api.cart.delete
    },
    {
        method: 'POST',
        path: '/api/currentcart',
        handler: api.cart.create
    },
    {
        method: 'PUT',
        path: '/api/currentcart/{id}',
        handler: api.cart.update
    },
];
