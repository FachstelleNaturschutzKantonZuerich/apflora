'use strict'

var $ = require('jquery')
var initiiereAp = require('./initiiereAp')
var limiter = require('../lib/limiter')
var zeigeFormular = require('./zeigeFormular')
var melde = require('./melde')
var leereFelderVonFormular = require('./leereFelderVonFormular')
var getApiHost = require('./getApiHost')

// damit kann man die verbleibende Anzahl Zeichen, die in einem Feld erfasst werden, anzeigen
// Quelle: https://www.scriptiny.com/2012/09/jquery-input-textarea-limiter/
module.exports = function (apId, berId) {
  // prüfen, ob voraussetzungen gegeben sind
  if (!apId && !window.localStorage.apId) {
    // Anwendung neu initiieren
    window.apf.initiiereApp()
    return
  }
  if (!berId && !window.localStorage.berId) {
    // es fehlen benötigte Daten > eine Ebene höher
    initiiereAp(apId)
    return
  }

  // apId setzen
  window.localStorage.apId = window.localStorage.apId || apId
  apId = apId || window.localStorage.apId

  // berId setzen
  window.localStorage.berId = window.localStorage.berId || berId
  berId = berId || window.localStorage.berId

  var $BerAutor = $('#BerAutor')
  var $BerJahr = $('#BerJahr')
  var $BerTitel = $('#BerTitel')
  var $BerURL = $('#BerURL')

  // damit kann man die verbleibende Anzahl Zeichen, die in einem Feld erfasst werden, anzeigen
  limiter($)

  // Felder zurücksetzen
  leereFelderVonFormular('ber')
  // Daten für die ber aus der DB holen
  $.ajax({
    type: 'get',
    url: getApiHost() + '/apflora/tabelle=ber/feld=BerId/wertNumber=' + window.localStorage.berId
  }).done(function (data) {
    // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
    if (data && data[0]) {
      data = data[0]

      // ber bereitstellen
      window.apf.ber = data

      // Felder mit Daten beliefern
      $BerAutor.val(data.BerAutor)
      $BerJahr.val(data.BerJahr)
      $BerTitel
        .val(data.BerTitel)
        .limiter(255, $('#BerTitel_limit'))
      $BerURL
        .val(data.BerURL)
        .limiter(255, $('#BerURL_limit'))

      // URL-Link initialisieren, wird bei Änderung der URL in index.html angepasst
      $('#BerURLHref').attr('onClick', "window.open('" + data.BerURL + "', target='_blank')")

      // Formulare blenden
      zeigeFormular('ber')
      window.history.pushState(null, null, 'index.html?ap=' + window.localStorage.apId + '&ber=' + window.localStorage.berId)

      // bei neuen Datensätzen Fokus steuern
      if (!$BerAutor.val()) {
        $BerAutor.focus()
      } else if (!$BerJahr.val()) {
        $BerJahr.focus()
      } else if (!$BerTitel.val()) {
        $BerTitel.focus()
      } else if (!$BerURL.val()) {
        $BerURL.focus()
      }
    }
  }).fail(function () {
    melde('Fehler: Keine Daten für den Bericht erhalten')
  })
}
