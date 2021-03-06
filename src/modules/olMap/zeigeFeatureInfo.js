'use strict'

var $ = require('jquery')
var _ = require('underscore')
var ol = require('ol')
var entfernePopupOverlays = require('./entfernePopupOverlays')
var sucheFeaturesAtPixel = require('./sucheFeaturesAtPixel')

module.exports = function (pixel, coordinate) {
  var features = sucheFeaturesAtPixel(pixel)
  var overlay
  var popupId
  var popupIdArray = []
  var koordinaten
  var popupTitle
  var popupText = ''
  var featuresMitTyp

  // es scheint auch weitere Features zu geben (z.B. wenn man genau auf die Koordinate einer Pop klickt)
  // nur die gewollten behalten
  featuresMitTyp = _.filter(features, function (feature) {
    return feature.get('myTyp') || feature.get('popupTitle')
  })
  if (featuresMitTyp && featuresMitTyp.length > 0) {
    // wenn mehrere featuresMitTyp vorkommen: die Infos aller sammeln und anzeigen
    if (featuresMitTyp.length > 1) {
      featuresMitTyp.forEach(function (feature, index) {
        if (feature.get('myTyp') === 'Detailplan') {
          popupText += '<h3>Objekt ID: ' + feature.get('OBJECTID') + '</h3>'
          popupText += '<table><tr><td><p>Typ:</p></td><td><p>Detailplan</p></td></tr>' +
            '<tr><td><p>Fläche:</p></td><td><p>' + parseInt(feature.get('SHAPE_Area') / 10, 10) + '</p></td></tr>' +
            '<tr><td><p>Bemerkunge:</p></td><td><p>' + (feature.get('Bemerkunge') || '') + '</p></td></tr>' +
            '<tr><td><p>Bemerkun_1:</p></td><td><p>' + (feature.get('Bemerkun_1') || '') + '</p></td></tr></table>'
        } else {
          popupText += '<h3>' + feature.get('popupTitle') + '</h3>'
          popupText += feature.get('popupContent')
        }
        if (index + 1 < featuresMitTyp.length) {
          popupText += '<hr>'
        }
      })
      popupTitle = featuresMitTyp.length + ' Treffer'
      // als Koordinaten den Ort des Klicks nehmen
      koordinaten = coordinate
    } else {
      // es gibt nur einen feature
      if (featuresMitTyp[0].get('myTyp') === 'Detailplan') {
        popupText = '<table><tr><td><p>Typ:</p></td><td><p>Detailplan</p></td></tr>' +
          '<tr><td><p>Fläche:</p></td><td><p>' + parseInt(featuresMitTyp[0].get('SHAPE_Area') / 10, 10) + '</p></td></tr>' +
          '<tr><td><p>Bemerkunge:</p></td><td><p>' + (featuresMitTyp[0].get('Bemerkunge') || '') + '</p></td></tr>' +
          '<tr><td><p>Bemerkun_1:</p></td><td><p>' + (featuresMitTyp[0].get('Bemerkun_1') || '') + '</p></td></tr></table>'
        popupTitle = 'Objekt ID: ' + featuresMitTyp[0].get('OBJECTID')
      } else {
        popupText = featuresMitTyp[0].get('popupContent')
        popupTitle = featuresMitTyp[0].get('popupTitle')
      }
      // als Koordinaten die Koordinate des popups nehmen
      if (featuresMitTyp[0].get('xkoord') && featuresMitTyp[0].get('ykoord')) {
        koordinaten = [featuresMitTyp[0].get('xkoord'), featuresMitTyp[0].get('ykoord')]
      } else {
        koordinaten = coordinate
      }
    }

    // zuerst mit qtip2 einen popup erzeugen
    $('.olMapPopup').each(function () {
      $(this).qtip({
        content: {
          text: popupText,
          title: popupTitle,
          button: 'Close'
        },
        style: {
          // Use the jQuery UI widget classes
          widget: true,
          // Remove the default styling
          def: false,
          classes: 'olmap_popup_styling',
          tip: {
            width: 20,
            height: 20
          }
        },
        position: {
          my: 'top left',
          at: 'bottom right',
          target: $(this),
          viewport: $('#olMap')
        }
      })
      $(this).qtip('toggle', true)
    })

    // id des popups ermitteln
    $('.qtip').each(function () {
      popupIdArray.push($(this).attr('data-qtip-id'))
    })
    popupId = _.max(popupIdArray)

    // die mit qtip erzeugte div dem overlay übergeben
    overlay = new ol.Overlay({
      element: $('#qtip-' + popupId)
    })
    window.apf.olMap.map.addOverlay(overlay)
    overlay.setPosition(koordinaten)
    overlay.set('typ', 'popup')
  } else {
    // alle popups entfernen
    entfernePopupOverlays()
  }
}
