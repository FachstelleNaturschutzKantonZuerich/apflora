'use strict'

var $ = require('jquery')
var erstelleIdAusDomAttributId = require('../erstelleIdAusDomAttributId')
var melde = require('../melde')
var erstelleTree = require('./erstelleTree')
var getApiHost = require('../getApiHost')

module.exports = function (nodeApId) {
  var apId = erstelleIdAusDomAttributId(nodeApId)

  $.ajax({
    type: 'put',
    url: getApiHost() + '/update/apflora/tabelle=pop/tabelleIdFeld=PopId/tabelleId=' + window.apf.popId + '/feld=ApArtId/wert=' + apId + '/user=' + encodeURIComponent(window.sessionStorage.user)
  }).done(function () {
    // Baum neu aufbauen
    $.when(erstelleTree(apId)).then(function () {
      // dann den eingefügten Node wählen
      $('#tree').jstree('select_node', "[typ='pop']#" + window.apf.popId)
    })
    // einfügen soll nicht mehr angezeigt werden
    delete window.apf.popZumVerschiebenGemerkt
    // nicht mehr benötigte Variablen entfernen
    delete window.apf.popBezeichnung
    delete window.apf.popId
  }).fail(function () {
    melde('Fehler: Die Population wurde nicht verschoben')
  })
}
