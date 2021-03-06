'use strict'

var $ = require('jquery')
var pruefeAnmeldung = require('./pruefeAnmeldung')

module.exports = function () {
  var $Useranmeldung = $('#anmeldeDialog').dialog({
    autoOpen: false,
    height: 320,
    width: 310,
    modal: true,
    closeOnEscape: false,
    buttons: {
      'anmelden': function () {
        pruefeAnmeldung()
      }
    },
    open: function (event, ui) {
      $('.ui-dialog-titlebar-close', ui.dialog).hide()
      // Reaktion auf Enter-Taste in anmeldeDialog
      $('#anmeldeDialog').on('keydown', function (e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
          pruefeAnmeldung()
        }
      })
    }
  })

  if (!window.sessionStorage.user) {
    $Useranmeldung.dialog('open')
  }
}
