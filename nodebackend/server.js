var Hapi = require('hapi');
var Good = require('good');


var models = require('./models');

// create the server
var server = new Hapi.Server();
server.connection({ port : 3000 })

// routes
server.route(require('./lib/routes'));


server.register({
    register: Good,
    options: {
        reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }
    
    
    
    models.sequelize.sync().then(function () {
        server.start(function () {
            console.log('Running on 3000');
        });
    });

});