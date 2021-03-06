/**
 * format length output
 * @param {ol.geom.Polygon} polygon
 * @return {string}
*/

'use strict'

module.exports = function (polygon) {
  var area = polygon.getArea()
  var output

  if (area > 1000000) {
    output = (Math.round(area / 1000000 * 100) / 100) + ' km<sup>2</sup>'
  } else if (area > 10000) {
    output = (Math.round(area / 10000 * 100) / 100) + ' ha'
  } else {
    output = (Math.round(area * 100) / 100) + ' m<sup>2</sup>'
  }
  return output
}
