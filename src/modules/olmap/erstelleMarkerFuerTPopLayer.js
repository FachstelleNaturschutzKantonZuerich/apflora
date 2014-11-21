/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('ol');

module.exports = function (tpop) {
    return new ol.Feature({
        geometry:      new ol.geom.Point([tpop.TPopXKoord, tpop.TPopYKoord]),
        tpopNr:        tpop.TPopNr,
        popNr:         tpop.PopNr,
        tpop_nr_label: window.apf.erstelleTPopNrLabel(tpop.PopNr, tpop.TPopNr),
        tpop_name:     tpop.TPopFlurname || '(kein Name)',
        name:          window.apf.erstelleTPopNrLabel(tpop.PopNr, tpop.TPopNr),  // brauchts das noch? TODO: entfernen
        popupContent:  window.apf.olmap.erstelleContentFuerTPop(tpop),
        popupTitle:    tpop.Artname,
        // koordinaten werden benötigt damit das popup am richtigen Ort verankert wird
        xkoord:        tpop.TPopXKoord,
        ykoord:        tpop.TPopYKoord,
        myTyp:         'tpop',
        myId:          tpop.TPopId
    });
};