// wird gemeinsam für Feld- und Freiwilligenkontrollen verwendet
// Feldkontrollen: Felder der Freiwilligenkontrollen ausblenden
// Freiwilligenkontrollen: Felder der Feldkontrollen ausblenen plus Register Biotop

'use strict'

var $ = require('jquery')
var dateFormat = require('dateformat')
var _ = require('underscore')
var limiter = require('../lib/limiter')
var initiiereAp = require('./initiiereAp')
var initiierePop = require('./initiierePop')
var initiiereTPop = require('./initiiereTPop')
var getAdressenHtml = require('./getAdressenHtml')
var getZaehleinheitenOptionen = require('./getZaehleinheitenOptionen')
var getLrDelarzeHtml = require('./getLrDelarzeHtml')
var getIdealbiotopUebereinstHtml = require('./getIdealbiotopUebereinstHtml')
var zeigeFormular = require('./zeigeFormular')
var melde = require('./melde')
var leereFelderVonFormular = require('./leereFelderVonFormular')
var tPopKontrZaehl = require('../templates/tPopKontrZaehl')
var initializeTooltipsInElement = require('./initializeTooltipsInElement')
var getApiHost = require('./getApiHost')

module.exports = function (apId, popId, tpopId, feldKontrId, kontrTyp) {
  var $TPopKontrDatum = $('#TPopKontrDatum')
  // prüfen, ob voraussetzungen gegeben sind
  if (!apId && !window.localStorage.apId) {
    // Anwendung neu initiieren
    window.apf.initiiereApp()
    return
  }
  if (!popId && !window.localStorage.popId && !window.apf.pop && (window.apf.pop && !window.apf.pop.PopId)) {
    // es fehlen benötigte Daten > zwei Ebenen höher
    initiiereAp(apId)
    return
  }
  if (!tpopId && !window.localStorage.tpopId) {
    // es fehlen benötigte Daten > eine Ebene höher
    initiierePop(apId, popId)
    return
  }
  if (!feldKontrId && !window.localStorage.tpopfeldkontrId) {
    // es fehlen benötigte Daten > eine Ebene höher
    initiiereTPop(apId, popId, tpopId)
    return
  }

  // apId setzen
  window.localStorage.apId = window.localStorage.apId || apId
  apId = apId || window.localStorage.apId
  // popId setzen
  if (!window.localStorage.popId) {
    if (!window.apf.pop || !window.apf.pop.PopId) {
      window.localStorage.popId = popId
    } else {
      window.localStorage.popId = window.apf.pop.PopId
    }
  }
  if (!popId) {
    if (!window.apf.pop || !window.apf.pop.PopId) {
      popId = window.localStorage.popId
    } else {
      popId = window.apf.pop.PopId
    }
  }
  // tpopId setzen
  window.localStorage.tpopId = window.localStorage.tpopId || tpopId
  tpopId = tpopId || window.localStorage.tpopId
  // feldKontrId setzen
  window.localStorage.tpopfeldkontrId = window.localStorage.tpopfeldkontrId || feldKontrId
  feldKontrId = feldKontrId || window.localStorage.tpopfeldkontrId

  // typ setzen, falls er nicht übergeben wurde (provisorisch)
  // TODO: entfernen, wenn router übernimmt
  if (!kontrTyp && window.localStorage.tpopfreiwkontr) {
    kontrTyp = 'freiwKontr'
  }
  if (!kontrTyp && !window.localStorage.tpopfreiwkontr) {
    kontrTyp = 'feldKontr'
  }

  var feldlisteFeldkontr
  var feldlisteFreiwkontr
  var $TPopKontrJahr = $('#TPopKontrJahr')
  var $TPopKontrJungPflJN_ja = $('#TPopKontrJungPflJN_ja')
  var $TPopKontrJungPflJN_nein = $('#TPopKontrJungPflJN_nein')
  var $TPopKontrJungPflJN_leer = $('#TPopKontrJungPflJN_leer')
  var htmlZaehlungen = ''

  // Variablen setzen für Formular Feldkontrollen, hier damit nur ein mal
  feldlisteFeldkontr = ['TPopKontrJahr', 'TPopKontrDatum', 'TPopKontrTxt', 'TPopKontrBearb', 'TPopKontrTyp', 'TPopKontrJungpfl', 'TPopKontrVitalitaet', 'TPopKontrUeberleb', 'TPopKontrEntwicklung', 'TPopKontrUrsach', 'TPopKontrUrteil', 'TPopKontrAendUms', 'TPopKontrAendKontr', 'TPopKontrGuid', 'TPopKontrFlaeche', 'TPopKontrVegTyp', 'TPopKontrKonkurrenz', 'TPopKontrMoosschicht', 'TPopKontrKrautschicht', 'TPopKontrStrauchschicht', 'TPopKontrBaumschicht', 'TPopKontrBodenTyp', 'TPopKontrBodenKalkgehalt', 'TPopKontrBodenDurchlaessigkeit', 'TPopKontrBodenHumus', 'TPopKontrBodenNaehrstoffgehalt', 'TPopKontrBodenAbtrag', 'TPopKontrWasserhaushalt', 'TPopKontrHandlungsbedarf', 'TPopKontrIdealBiotopUebereinst', 'TPopKontrLeb', 'TPopKontrLebUmg']

  feldlisteFreiwkontr = ['TPopKontrJahr', 'TPopKontrDatum', 'TPopKontrTxt', 'TPopKontrBearb', 'TPopKontrPlan', 'TPopKontrUebFlaeche', 'TPopKontrUebPfl', 'TPopKontrNaBo', 'TPopKontrJungPflJN', 'TPopKontrVegHoeMax', 'TPopKontrVegHoeMit', 'TPopKontrGefaehrdung', 'TPopKontrGuid']

  // damit kann man die verbleibende Anzahl Zeichen, die in einem Feld erfasst werden, anzeigen
  limiter($)

  // Felder zurücksetzen
  leereFelderVonFormular('tpopfeldkontr')

  // alle Felder ausblenden. Später werden die benötigten eingeblendet
  $('.feldTpopkontr').each(function () {
    $(this).hide()
  })

  // Zählungen leeren
  $('#tPopKontrZaehlungen').html('')

  // Daten für die tpopfeldkontr aus der DB holen
  $.ajax({
    type: 'get',
    url: getApiHost() + '/apflora/tabelle=tpopkontr/feld=TPopKontrId/wertNumber=' + feldKontrId
  }).done(function (data) {
    // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
    if (data && data[0]) {
      data = data[0]

      // tpopfeldkontr bereitstellen
      window.apf.tpopfeldkontr = data

      // gemeinsame Felder
      // mit Daten beliefern
      $TPopKontrJahr.val(data.TPopKontrJahr)
      if (data.TPopKontrDatum) {
        // chrome akzeptiert nur - getrennte Daten. Und zeigt sie dann gemäss Pattern korrekt an
        // die übrigen stellen mit - getrennte Daten leider mit - dar
        if (!window.chrome) {
          $TPopKontrDatum.val(dateFormat(data.TPopKontrDatum, 'dd.mm.yyyy'))
        } else {
          $TPopKontrDatum.val(dateFormat(data.TPopKontrDatum, 'yyyy-mm-dd'))
        }
      }
      $('#TPopKontrTxt').val(data.TPopKontrTxt)
      $('#TPopKontrGuid').val(data.TPopKontrGuid)

      // Adressen holen, um TPopKontrBearb zu füllen
      getAdressenHtml(function (html) {
        $('#TPopKontrBearb')
          .html(html)
          .val(window.apf.tpopfeldkontr.TPopKontrBearb)
      })

      // Felder, die nur in der Feldkontrolle vorkommen
      if (kontrTyp === 'feldKontr') {
        $('#TPopKontrTyp' + data.TPopKontrTyp).prop('checked', true)
        $('#TPopKontrJungpfl').val(data.TPopKontrJungpfl)
        $('#TPopKontrVitalitaet')
          .val(data.TPopKontrVitalitaet)
          .limiter(255, $('#TPopKontrVitalitaet_limit'))
        $('#TPopKontrUeberleb').val(data.TPopKontrUeberleb)
        $('#TPopKontrEntwicklung' + data.TPopKontrEntwicklung).prop('checked', true)
        $('#TPopKontrUrsach')
          .val(data.TPopKontrUrsach)
          .limiter(255, $('#TPopKontrUrsach_limit'))
        $('#TPopKontrUrteil')
          .val(data.TPopKontrUrteil)
          .limiter(255, $('#TPopKontrUrteil_limit'))
        $('#TPopKontrAendUms')
          .val(data.TPopKontrAendUms)
          .limiter(255, $('#TPopKontrAendUms_limit'))
        $('#TPopKontrAendKontr')
          .val(data.TPopKontrAendKontr)
          .limiter(255, $('#TPopKontrAendKontr_limit'))
        // Biotop
        $('#TPopKontrFlaeche').val(data.TPopKontrFlaeche)
        $('#TPopKontrVegTyp')
          .val(data.TPopKontrVegTyp)
          .limiter(100, $('#TPopKontrVegTyp_limit'))
        $('#TPopKontrKonkurrenz')
          .val(data.TPopKontrKonkurrenz)
          .limiter(100, $('#TPopKontrKonkurrenz_limit'))
        $('#TPopKontrMoosschicht')
          .val(data.TPopKontrMoosschicht)
          .limiter(100, $('#TPopKontrMoosschicht_limit'))
        $('#TPopKontrKrautschicht')
          .val(data.TPopKontrKrautschicht)
          .limiter(100, $('#TPopKontrKrautschicht_limit'))
        $('#TPopKontrStrauchschicht')
          .val(data.TPopKontrStrauchschicht)
          .limiter(255, $('#TPopKontrStrauchschicht_limit'))
        $('#TPopKontrBaumschicht')
          .val(data.TPopKontrBaumschicht)
          .limiter(100, $('#TPopKontrBaumschicht_limit'))
        $('#TPopKontrBodenTyp')
          .val(data.TPopKontrBodenTyp)
          .limiter(255, $('#TPopKontrBodenTyp_limit'))
        $('#TPopKontrBodenKalkgehalt')
          .val(data.TPopKontrBodenKalkgehalt)
          .limiter(100, $('#TPopKontrBodenKalkgehalt_limit'))
        $('#TPopKontrBodenDurchlaessigkeit')
          .val(data.TPopKontrBodenDurchlaessigkeit)
          .limiter(100, $('#TPopKontrBodenDurchlaessigkeit_limit'))
        $('#TPopKontrBodenHumus')
          .val(data.TPopKontrBodenHumus)
          .limiter(100, $('#TPopKontrBodenHumus_limit'))
        $('#TPopKontrBodenNaehrstoffgehalt')
          .val(data.TPopKontrBodenNaehrstoffgehalt)
          .limiter(100, $('#TPopKontrBodenNaehrstoffgehalt_limit'))
        $('#TPopKontrBodenAbtrag')
          .val(data.TPopKontrBodenAbtrag)
          .limiter(255, $('#TPopKontrBodenAbtrag_limit'))
        $('#TPopKontrWasserhaushalt')
          .val(data.TPopKontrWasserhaushalt)
          .limiter(255, $('#TPopKontrWasserhaushalt_limit'))
        $('#TPopKontrHandlungsbedarf').val(data.TPopKontrHandlungsbedarf)
        $('#TPopKontrIdealBiotopUebereinst' + data.TPopKontrIdealBiotopUebereinst).prop('checked', true)

        // TPopKontrLeb: Daten holen - oder vorhandene nutzen
        getLrDelarzeHtml(function (html) {
          $('#TPopKontrLeb')
            .html(html)
            .val(window.apf.tpopfeldkontr.TPopKontrLeb)
          $('#TPopKontrLebUmg')
            .html(html)
            .val(window.apf.tpopfeldkontr.TPopKontrLebUmg)
        })
      }

      // TPopKontrIdealBiotopUebereinst: Daten holen - oder vorhandene nutzen
      getIdealbiotopUebereinstHtml(function (html) {
        $('#TPopKontrIdealBiotopUebereinst')
          .html(html)
          .val(window.apf.tpopfeldkontr.TPopKontrIdealBiotopUebereinst)
      })

      // Felder, die nur in freiwkontr vorkommen
      if (kontrTyp === 'freiwKontr') {
        if (data.TPopKontrPlan === 1) {
          $('#TPopKontrPlan').prop('checked', true)
        } else {
          $('#TPopKontrPlan').prop('checked', false)
        }
        $('#TPopKontrUebFlaeche').val(data.TPopKontrUebFlaeche)
        $('#TPopKontrUebPfl').val(data.TPopKontrUebPfl)
        $('#TPopKontrNaBo').val(data.TPopKontrNaBo)
        $TPopKontrJungPflJN_ja.prop('checked', false)
        $TPopKontrJungPflJN_nein.prop('checked', false)
        $TPopKontrJungPflJN_leer.prop('checked', false)
        if (data.TPopKontrJungPflJN === 1) {
          $TPopKontrJungPflJN_ja.prop('checked', true)
        } else if (data.TPopKontrJungPflJN === 0) {
          $TPopKontrJungPflJN_nein.prop('checked', true)
        } else {
          $TPopKontrJungPflJN_leer.prop('checked', true)
        }
        $('#TPopKontrVegHoeMax').val(data.TPopKontrVegHoeMax)
        $('#TPopKontrVegHoeMit').val(data.TPopKontrVegHoeMit)
        $('#TPopKontrGefaehrdung')
          .val(data.TPopKontrGefaehrdung)
          .limiter(255, $('#TPopKontrGefaehrdung_limit'))
      }

      // fieldcontain-divs der benötigten Felder einblenden
      if (kontrTyp === 'freiwKontr') {
        _.each(feldlisteFreiwkontr, function (feld) {
          $('#fieldcontain_' + feld).show()
        })
      } else {
        _.each(feldlisteFeldkontr, function (feld) {
          $('#fieldcontain_' + feld).show()
        })
      }

      // Formulare blenden
      zeigeFormular('tpopfeldkontr')
      if (kontrTyp === 'feldKontr') {
        window.history.pushState(null, null, 'index.html?ap=' + apId + '&pop=' + popId + '&tpop=' + tpopId + '&tpopfeldkontr=' + feldKontrId)
      } else {
        window.history.pushState(null, null, 'index.html?ap=' + apId + '&pop=' + popId + '&tpop=' + tpopId + '&tpopfreiwkontr=' + feldKontrId)
      }

      // Register in Feldkontr blenden
      if (kontrTyp === 'freiwKontr') {
        $('#tpopfeldkontrTabsBiotop').hide()
        $('#biotopTabLi').hide()
        $('#tpopfeldkontrTabs').tabs('option', 'active', 0)
      } else {
        $('#tpopfeldkontrTabsBiotop').show()
        $('#biotopTabLi').show()
        // Dieses Element wird fälschlicherweise in Entwicklung eingeblendet
        // keine Ahnung wieso
        // ausblenden!
        $('#tpopfeldkontrTabsBiotop').hide()
      }

      // Fokus steuern
      $TPopKontrDatum.focus()
      $(window).scrollTop(0)

      // Daten für Zählungen holen
      $.ajax({
        type: 'get',
        url: getApiHost() + '/apflora/tabelle=tpopkontrzaehl/feld=TPopKontrId/wertNumber=' + feldKontrId
      }).done(function (data) {
        // nach TPopKontrId sortieren
        // Topos will, dass die Eingabereihenfolge erhalten bleibt
        data = _.sortBy(data, 'TPopKontrZaehlId')
        // zuerst die Zähleinheiten holen
        $.when(getZaehleinheitenOptionen()).then(function () {
          var leereZaehleinheit = {
            Anzahl: null,
            Methode: null,
            Zaehleinheit: null,
            zaehlungenOptionen: window.apf.tPopKontrZaehleinheitOptionen
          }
          htmlZaehlungen = ''
          _.each(data, function (zaehleinheit, index) {
            if (index < 3) {
              // index wird für den Titel der Zähleinheit verwendet. Bsp: "1. Zähleinheit"
              zaehleinheit.index = index + 1
              zaehleinheit.zaehlungenOptionen = window.apf.tPopKontrZaehleinheitOptionen
              htmlZaehlungen += tPopKontrZaehl(zaehleinheit)
            }
          })
          // leere anfügen, falls noch nicht 3
          if (data && data.length < 1) {
            leereZaehleinheit.index = 1
            htmlZaehlungen += tPopKontrZaehl(leereZaehleinheit)
          }
          if (data && data.length < 2) {
            leereZaehleinheit.index = 2
            htmlZaehlungen += tPopKontrZaehl(leereZaehleinheit)
          }
          if (data && data.length < 3) {
            leereZaehleinheit.index = 3
            htmlZaehlungen += tPopKontrZaehl(leereZaehleinheit)
          }
          $('#tPopKontrZaehlungen').html(htmlZaehlungen)
          // darf erst starten, wenn die letzte Aktion fertig ist
          // darum timeout
          setTimeout(function () {
            initializeTooltipsInElement($('#tPopKontrZaehlungen'))
          }, 0)
        })
      })
    }
  }).fail(function () {
    melde('Fehler: keine Daten für die Kontrolle erhalten')
  })
}
