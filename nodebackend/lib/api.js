// lib/api.js

var models = require('../models');

// --- Item ---
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
        models.Item.findOrCreate({ where: { name: request.payload.name, description: request.payload.description, price: request.payload.price } })
        .success(function (item) {
            reply(item).code(200);
        })
        .error(function (err) {
            reply(err.errors).code(500)
        });
    },
    
    update: function (request, reply) {
        models.Item.update({ name: request.payload.name, description: request.payload.description, price: request.payload.price }, { where :{ id: request.params.id }})
        .then(function (item) {
            reply(item).code(200);
        })
          .error(function (err) {
            reply(err.errors).code(500);
        })
    }
    
};