'use strict'

var $ = require('jquery')
var _ = require('underscore')

module.exports = function (popSelected, tpopSelected) {
  // rückmelden, welche Objekte gewählt wurden
  var rueckmeldung = ''
  var popId
  var popNr
  var tpopId
  var tpopNr
  var popTpopNr
  var listentitel
  var exportieren
  var exportierenPop
  var exportierenTPop

  // globale Variabeln anlegen, damit die Exportfunktionen sie später nutzen können
  window.apf.olMap.popSelected = popSelected
  window.apf.olMap.tpopSelected = tpopSelected

  if (popSelected.length > 0) {
    // pop nach nr sortieren
    popSelected = _.sortBy(popSelected, function (pop) {
      popNr = pop.get('popNr')
      return parseInt(popNr, 10)
    })
    if (tpopSelected.length > 0) {
      // tpop und pop betitteln
      rueckmeldung += "<p class='ergebnisAuswahlListeTitel'>" + popSelected.length + ' Populationen: </p>'
    }
    rueckmeldung += '<table>'
    popSelected.forEach(function (pop) {
      popId = pop.get('myId')
      rueckmeldung += '<tr><td><a href="#" onclick="window.apf.oeffnePop(\'' + popId + '\')">'
      rueckmeldung += pop.get('popNr') + ':<\/a></td><td><a href="#" onclick="window.apf.oeffnePop(\'' + popId + '\')">' + pop.get('popName') + '<\/a></td></tr>'
    })
    rueckmeldung += '</table>'
  }
  if (tpopSelected.length > 0) {
    // tpop nach nr dann tpopnr sortieren
    tpopSelected = _.sortBy(tpopSelected, function (tpop) {
      popNr = tpop.get('popNr') || 0
      tpopNr = tpop.get('tpopNr') || 0
      popTpopNr = parseFloat(parseInt(popNr, 10) + '.' + parseInt(tpopNr, 10))
      return popTpopNr
    })
    if (popSelected.length > 0) {
      // tpop und pop betitteln
      rueckmeldung += "<p class='ergebnisAuswahlListeTitel ergebnisAuswahlListeTitelTPop'>" + tpopSelected.length + ' Teilpopulationen: </p>'
    }
    rueckmeldung += '<table>'
    tpopSelected.forEach(function (tpop) {
      tpopId = tpop.get('myId')
      rueckmeldung += '<tr><td><a href="#" onclick="window.apf.oeffneTPopInNeuemTab(\'' + tpopId + '\')">'
      rueckmeldung += tpop.get('tpopNrLabel') + ':<\/a></td><td><a href="#" onclick="window.apf.oeffneTPopInNeuemTab(\'' + tpopId + '\')">'
      rueckmeldung += tpop.get('tpopName') + '<\/a></td></tr>'
    })
    rueckmeldung += '</table>'
  }

  // Listentitel erstellen
  exportieren = 'Exportieren: '
  exportierenPop = "<a href='#' class='exportPop'>Populationen</a>"
  exportierenTPop = "<a href='#' class='exportTpop'>Teilpopulationen</a>, <a href='#' class='exportKontr'>Kontrollen</a>, <a href='#' class='exportMassn'>Massnahmen</a>"
  if (popSelected.length > 0 && tpopSelected.length > 0) {
    listentitel = 'Gewählt wurden ' + popSelected.length + ' Populationen und ' + tpopSelected.length + ' Teilpopulationen'
    exportieren += exportierenPop + ', ' + exportierenTPop
  } else if (popSelected.length > 0) {
    listentitel = 'Gewählt wurden ' + popSelected.length + ' Populationen:'
    exportieren += exportierenPop
  } else if (tpopSelected.length > 0) {
    listentitel = 'Gewählt wurden ' + tpopSelected.length + ' Teilpopulationen:'
    exportieren += exportierenTPop
  } else {
    listentitel = 'Keine Populationen/Teilpopulationen gewählt'
    exportieren = ''
  }
  $('#olMapErgebnisAuswahlHeaderText').html(listentitel)
  $('#olMapErgebnisAuswahlListe').html(rueckmeldung)
  $('#olMapErgebnisAuswahlFooter').html(exportieren)
  // Ergebnis-Div einblenden
  $('#olMapErgebnisAuswahl').css('display', 'block')
}
