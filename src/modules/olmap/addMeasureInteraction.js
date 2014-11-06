// erhält den Typ der Interaktion: 'Polygon' oder 'LineString'

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $  = require('jquery'),
    ol = require('ol');

var returnFunction = function (type) {
    var source,
        messen_layer,
        // Currently drawed feature
        // @type {ol.Feature}
        sketch = null,
        // Element for currently drawed feature
        // @type {Element}
        sketchElement,
        mouseMoveHandler;

    // allfällige Resten entfernen
    window.apf.olmap.removeMeasureInteraction();
    // neu aufbauen
    source = new ol.source.Vector();
    messen_layer = new ol.layer.Vector({
        title: 'messen',
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(255, 0, 0, 1)',
                width: 3,
                lineDash: [2, 2],
                lineCap: 'square'
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });

    window.apf.olmap.map.addLayer(messen_layer);

    // handle pointer move
    // @param {Event} evt
    mouseMoveHandler = function (evt) {
        if (sketch) {
            var output,
                geom = (sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                output = window.apf.olmap.formatArea(/** @type {ol.geom.Polygon} */ (geom));

            } else if (geom instanceof ol.geom.LineString) {
                output = window.apf.olmap.formatLength( /** @type {ol.geom.LineString} */ (geom));
            }
            sketchElement.innerHTML = output;
        }
    };

    $(window.apf.olmap.map.getViewport()).on('mousemove', mouseMoveHandler);

    window.apf.olmap.drawMeasure = new ol.interaction.Draw({
        source: source,
        type: /** @type {ol.geom.GeometryType} */ (type)
    });
    window.apf.olmap.map.addInteraction(window.apf.olmap.drawMeasure);

    window.apf.olmap.drawMeasure.on('drawstart',
        function (evt) {
            // set sketch
            sketch = evt.feature;
            sketchElement = document.createElement('li');
            var outputList = document.getElementById('ergebnisMessung');
            if (outputList.childNodes) {
                outputList.insertBefore(sketchElement, outputList.firstChild);
            } else {
                outputList.appendChild(sketchElement);
            }
        }, this);

    window.apf.olmap.drawMeasure.on('drawend',
        function (evt) {
            // unset sketch
            sketch = null;
            sketchElement = null;
        },
        this);
};

module.exports = returnFunction;