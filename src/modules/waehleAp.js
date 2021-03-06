// wird aufgerufen, wenn der ap geändert wird

/* jslint node: true, browser: true, nomen: true, todo: true, white: true, asi: true */
'use strict'

// ULTRA KOMISCHER FEHLER: Wenn Module vor module.exports referenziert werden,
// sind sie leere Objekte!!!!!

module.exports = function (apId) {
  var $ = require('jquery')
  var _ = require('underscore')
  var zeigeFormular = require('./zeigeFormular')
  var initiiereAp = require('./initiiereAp')
  var waehleApliste = require('./waehleApliste')
  var melde = require('./melde')
  var erstelleTree = require('./jstree/erstelleTree')
  var getApiHost = require('./getApiHost')
  var programm = $("[name='programmWahl']:checked").attr('id')
  var apWaehlenText
  var placeholderText = 'Artförderprogramm wählen'

  if (apId) {
    // einen AP gewählt
    window.localStorage.apId = apId

    if (programm === 'programmNeu') {
      // zuerst einen neuen Datensatz anlegen
      $.ajax({
        type: 'post',
        url: getApiHost() + '/apInsert/apId=' + apId + '/user=' + encodeURIComponent(window.sessionStorage.user)
      }).done(function () {
        // nachdem ein neues Programm erstellt wurde, soll nicht mehr "neu" zur Wahl stehen, sondern "alle"
        $('#programmNeu').attr('checked', false)
        $('#programmAlle').attr('checked', true)
        $('#programmWahl').buttonset()
        // alle zwischengespeicherten aplisten löschen
        delete window.apf.apliste
        // Auswahlliste für Programme updaten
        $.when(waehleApliste('programmAlle')).then(function () {
          // Strukturbaum updaten
          $.when(erstelleTree(apId)).then(function () {
            // gewählte Art in Auswahlliste anzeigen
            apWaehlenText = _.find(window.apf.apliste.programmAlle, function (art) {
              return art.id == apId
            })
            if (apWaehlenText) {
              $('#apWaehlen').val(apId)
              $('#apWaehlenText').val(apWaehlenText.label)
            }
            $('#ApArtId').val(apId)
            // gewählte Art in Formular anzeigen
            initiiereAp(apId)
          })
        })
      }).fail(function () {
        melde('Fehler: Keine Daten für Programme erhalten')
      })
    } else {
      erstelleTree(apId)
      $('#ap').show()
      initiiereAp(apId)
    }
  } else {
    // leeren Wert gewählt
    $('#apWaehlenText').val('')
    if (programm === 'programmNeu') { placeholderText = 'Art für neues Förderprogramm wählen' }
    if (programm === 'programmAp') { placeholderText = 'Aktionsplan wählen' }
    $('#apWaehlenText').attr('placeholder', placeholderText)
    $('#tree').hide()
    $('#suchen').hide()
    $('#exportieren2').hide()
    $('#hilfe').hide()
    $('#apLoeschen').hide()
    $('#exportieren1').show()
    $('#ap').hide()
    zeigeFormular()
    window.history.pushState(null, null, 'index.html')
  }
}
