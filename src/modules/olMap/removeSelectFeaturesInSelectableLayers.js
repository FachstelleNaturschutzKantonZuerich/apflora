'use strict'

var $ = require('jquery')
var removeDragBox = require('./removeDragBox')

module.exports = function () {
  if (window.apf.olMap.map.olmapSelectInteraction) {
    window.apf.olMap.map.removeInteraction(window.apf.olMap.map.olmapSelectInteraction)
    delete window.apf.olMap.map.olmapSelectInteraction
    removeDragBox()
    $('#olMapErgebnisAuswahl').hide()
  }
}
