'use strict'

var $ = require('jquery')
var melde = require('./melde')
var getApiHost = require('./getApiHost')

module.exports = function (xKoord, yKoord) {
  var $kopiereKoordinatenInPopRueckmeldung = $('#kopiereKoordinatenInPopRueckmeldung')

  // prüfen, ob X- und Y-Koordinaten vergeben sind
  if (xKoord > 100000 && yKoord > 100000) {
    // Koordinaten der Pop nachführen
    $.ajax({
      type: 'put',
      url: getApiHost() + '/update/apflora/tabelle=pop/tabelleIdFeld=PopId/tabelleId=' + window.localStorage.popId + '/feld=PopXKoord/wert=' + xKoord + '/user=' + encodeURIComponent(window.sessionStorage.user)
    }).done(function () {
      $.ajax({
        type: 'put',
        url: getApiHost() + '/update/apflora/tabelle=pop/tabelleIdFeld=PopId/tabelleId=' + window.localStorage.popId + '/feld=PopYKoord/wert=' + yKoord + '/user=' + encodeURIComponent(window.sessionStorage.user)
      }).done(function () {
        $kopiereKoordinatenInPopRueckmeldung.fadeIn('slow')
        setTimeout(function () {
          $kopiereKoordinatenInPopRueckmeldung.fadeOut('slow')
        }, 3000)
      }).fail(function () {
        melde('Fehler: Y-Koordinate wurde nicht kopiert (die X-Koordinate offenbar schon)')
      })
    }).fail(function () {
      melde('Fehler: Koordinaten wurden nicht kopiert')
    })
  } else {
    // auffordern, die Koordinaten zu vergeben und Speichern abbrechen
    melde('Sie müssen zuerst Koordinaten erfassen', 'Koordinaten nicht kopiert')
  }
}
