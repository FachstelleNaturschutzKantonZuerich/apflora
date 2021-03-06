'use strict'

var $ = require('jquery')
var melde = require('./melde')
var getApiHost = require('./getApiHost')

module.exports = function () {
  var $anmeldungName = $('#anmeldungName').val()
  var $anmeldungPasswort = $('#anmeldungPasswort').val()

  // Leserechte zurücksetzen
  delete window.sessionStorage.NurLesen

  if ($anmeldungName && $anmeldungPasswort) {
    $.ajax({
      type: 'get',
      url: getApiHost() + '/anmeldung/name=' + $anmeldungName + '/pwd=' + $anmeldungPasswort
    }).done(function (data) {
      if (data && data.length > 0) {
        window.sessionStorage.user = $anmeldungName
        // wenn NurLesen, globale Variable setzen
        if (data[0].NurLesen === -1) {
          window.sessionStorage.NurLesen = true
        }
        $('#anmeldungRueckmeldung')
          .html('Willkommen ' + $anmeldungName)
          .addClass('ui-state-highlight')
        setTimeout(function () {
          $('#anmeldeDialog').dialog('close', 2000)
          if (!$('#forms').is(':visible')) {
            $('#apWaehlenText').focus()
          }
        }, 1000)
      } else {
        $('#anmeldungRueckmeldung')
          .html('Anmeldung gescheitert')
          .addClass('ui-state-highlight')
        setTimeout(function () {
          $('#anmeldungRueckmeldung').removeClass('ui-state-highlight', 1500)
        }, 500)
      }
    }).fail(function () {
      melde('Anmeldung gescheitert', 'Oops!')
    })
  } else {
    $('#anmeldungRueckmeldung')
      .html('Bitte Name und Passwort ausfüllen')
      .addClass('ui-state-highlight')
    setTimeout(function () {
      $('#anmeldungRueckmeldung').removeClass('ui-state-highlight', 1500)
    }, 500)
  }
}
