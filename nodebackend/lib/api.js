// lib/api.js

var models = require('../models');

// --- Item --- (Using: /api/store)
exports.items = {
    all: function (request, reply) {
        models.Item.findAll()
      .then(function (items) {
            reply(items).code(200);
        })
        .error(function (err) {
            reply(err.errors).code(500);
        })
    },

    byId: function (request, reply) {
        models.Item.findOne(request.params.id)
        .success(function (item) {
            reply(item).code(200);
        })
        .error(function (err) {
            reply(err.errors).code(500);
        })
    },

    delete: function (request, reply) {
        models.Item.destroy({ where: { id: request.params.id } })
        .then(function () {
            reply().code(200);
        })
          .error(function (err) {
            reply(err.errors).code(500);
        })
    },

    create: function (request, reply) {
        models.Item.findOrCreate({ where: { name: request.payload.name, description: request.payload.description, price: request.payload.price, amt:1 } })
        .success(function (item) {
            reply(item).code(200);
        })
        .error(function (err) {
            reply(err.errors).code(500)
        });
    },
    update: function (request, reply) {
        models.Item.update({ name: request.payload.name, description: request.payload.description, price: request.payload.price, amt: request.payload.amt }, { where :{ id: request.params.id }})
        .then(function (item) {
            reply(item).code(200);
        })
          .error(function (err) {
            reply(err.errors).code(500);
        })
    }

  };

  exports.cart = {


    //--- Cart (Using: /api/currentcart)
    all: function (request, reply) {
        models.Cart.findAll()
      .then(function (cart) {
            reply(cart).code(200);
        })
        .error(function (err) {
            reply(err.errors).code(500);
        })
    },

    byId: function (request, reply) {
        models.Cart.findOne(request.params.id)
        .success(function (cart) {
            reply(cart).code(200);
        })
        .error(function (err) {
            reply(err.errors).code(500);
        })
    },

    delete: function (request, reply) {
        models.Cart.destroy({ where: { id: request.params.id } })
        .then(function () {
            reply().code(200);
        })
          .error(function (err) {
            reply(err.errors).code(500);
        })
    },

    create: function (request, reply) {
        models.Cart.findOrCreate({ where: { name: request.payload.name, price: request.payload.price, amt: request.payload.amt, totalprice: request.payload.totalprice } })
        .success(function (cart) {
            reply(cart).code(200);
        })
        .error(function (err) {
            reply(err.errors).code(500)
        });
    },

    update: function (request, reply) {
        models.Cart.update({ name: request.payload.name, price: request.payload.price, amt: request.payload.amt, totalprice: request.payload.totalprice }, { where :{ id: request.params.id }})
        .then(function (item) {
            reply(item).code(200);
        })
          .error(function (err) {
            reply(err.errors).code(500);
        })
    }

};
