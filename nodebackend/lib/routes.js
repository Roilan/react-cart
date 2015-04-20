// lib/routes.js

var api = require('./api');

module.exports = [
    {
        method: 'GET',
        path: '/api/items',
        handler: api.items.all
    },
    {
        method: 'GET',
        path: '/api/items/{id}',
        handler: api.items.byId
    },
    {
        method: 'DELETE',
        path: '/api/items/{id}',
        handler: api.items.delete
    },
    {
        method: 'POST',
        path: '/api/items',
        handler: api.items.create
    },
    {
        method: 'PUT',
        path: '/api/items/{id}',
        handler: api.items.update
    }
];