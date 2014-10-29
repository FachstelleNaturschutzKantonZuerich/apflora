/*jslint node: true, browser: true, nomen: true */
'use strict';


var mysql      = require('mysql'),
    _          = require('underscore'),
    config     = require('../src/modules/configuration'),
    connection = mysql.createConnection({
        host: 'localhost',
        user: config.db.userName,
        password: config.db.passWord,
        database: 'alexande_apflora_views'
    });

var returnFunction = function (request, callback) {
    var view = decodeURIComponent(request.params.view), // Name des Views, aus dem die Daten geholt werden sollen
        idName = decodeURIComponent(request.params.idName), // name des Felds, für den ID's übergeben werden
        idListe = decodeURIComponent(request.params.idListe); // liste der ID's

    connection.query(
        'SELECT * FROM ' + view + ' WHERE `' + idName + '` IN (' + idListe + ')',
        function (err, data) {
            if (err) throw err;
            // null-werte eliminieren
            var data2 = data;
            _.each(data2, function (object) {
                _.each(object, function (value, key) {
                    if (value === null) {
                        object[key] = '';
                    }
                });
            });
            callback(data2);
        }
    );
};

module.exports = returnFunction;