/*jslint node: true, browser: true, nomen: true */
'use strict';


var mysql      = require('mysql'),
    async      = require('async'),
    config     = require('../src/modules/configuration'),
    connection = mysql.createConnection({
        host: 'localhost',
        user: config.db.userName,
        password: config.db.passWord,
        database: 'alexande_apflora'
    }),
    connection2 = mysql.createConnection({
        host: 'localhost',
        user: config.db.userName,
        password: config.db.passWord,
        database: 'alexande_beob'
    });

var returnFunction = function (request, callback) {
    var apId = decodeURIComponent(request.params.apId), // ApArtId
        user = decodeURIComponent(request.params.user), // der Benutzername
        date = new Date().toISOString();                // wann gespeichert wird

    console.log('apId = ', apId);
    console.log('user = ', user);
    console.log('date = ', date);

    // neuen AP einfügen
    connection.query(
        'INSERT INTO alexande_apflora.tblAktionsplan (ApArtId, MutWann, MutWer) VALUES (' + apId + ', "' + date + '", "' + user + '")',
        function (err, data) {
            console.log('apInsert, insertIntoTblAktionsplan: data after insert = ', data);
            if (err) { callback(err, null); }
            // Artwert holen
            connection2.query(
                'SELECT Artwert FROM alexande_beob.ArtenDb_Arteigenschaften WHERE TaxonomieId=' + apId,
                function (err, data) {
                    console.log('apInsert, getArtwert: data after insert = ', data);
                    // keine Fehler melden, wenn bloss der Artwert nicht geholt wurde
                    if (data && data[0]) {
                        var artwert = data[0];
                        console.log('artwert = ', artwert);
                        if (artwert) {
                            connection.query(
                                'UPDATE alexande_apflora.tblAktionsplan SET ApArtwert="' + artwert + '" WHERE ApArtId = ' + apId,
                                function (err, data) {
                                    console.log('apInsert, update Aktionsplan with artwert: data after update = ', data);
                                    callback(err, apId);
                                }
                            );
                        }
                    } else {
                        callback(err, null);
                    }
                }
            );

        }
    );
};

module.exports = returnFunction;