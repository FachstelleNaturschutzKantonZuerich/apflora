'use strict'

var pruefeSchreibvoraussetzungen = require('../pruefeSchreibvoraussetzungen')

module.exports = function (aktiverNode) {
  // nur aktualisieren, wenn Schreibrechte bestehen
  if (!pruefeSchreibvoraussetzungen()) return
  window.apf.tpopNodeAusgeschnitten = aktiverNode
  // es macht keinen Sinn mehr, den kopierten node zu behalten
  // und stellt sicher, dass nun der ausgeschnittene mit "einfügen" angeboten wird
  delete window.apf.tpopNodeKopiert
  delete window.apf.tpopObjektKopiert
}
