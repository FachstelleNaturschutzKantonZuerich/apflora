'use strict'

var $ = require('jquery')
var zeigeFormular = require('../zeigeFormular')
var erstelleTPopLayer = require('./erstelleTPopLayer')
var initiiereLayertree = require('./initiiereLayertree')
var zeigePopInTPop = require('./zeigePopInTPop')
var waehleAusschnittFuerUebergebeneTPop = require('./waehleAusschnittFuerUebergebeneTPop')
var melde = require('../melde')
var istLayerSichtbarNachName = require('./istLayerSichtbarNachName')
var getApiHost = require('../getApiHost')

module.exports = function (tpopListeMarkiert) {
  var markierteTpop,
    // wenn layer "Populationen" sichtbar ist, sichtbar behalten
    overlayPopVisible = istLayerSichtbarNachName('Populationen')

  markierteTpop = waehleAusschnittFuerUebergebeneTPop(tpopListeMarkiert)

  // Grundkarte aufbauen
  $.when(zeigeFormular('olMap')).then(function () {
    // Karte zum richtigen Ausschnitt zoomen
    window.apf.olMap.map.updateSize()
    window.apf.olMap.map.getView().fitExtent(markierteTpop.bounds, window.apf.olMap.map.getSize())
    // tpop und pop ergänzen
    // alle tpop holen
    $.ajax({
      type: 'get',
      url: getApiHost() + '/tpopKarteAlle/apId=' + window.apf.ap.ApArtId
    }).done(function (tpopListe) {
      $.when(
        // Layer für Symbole und Beschriftung erstellen
        erstelleTPopLayer(tpopListe, markierteTpop.tpopidMarkiert, true),
        // alle Pop holen
        zeigePopInTPop(overlayPopVisible)
      ).then(function () {
        // layertree neu aufbauen
        initiiereLayertree()
      })
    }).fail(function () {
      melde('Fehler: Es konnten keine Teilpopulationen aus der Datenbank abgerufen werden')
    })
  })
}
