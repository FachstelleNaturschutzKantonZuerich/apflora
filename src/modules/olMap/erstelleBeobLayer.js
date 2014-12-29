// übernimmt drei Variablen: beobliste ist das Objekt mit den zugeordneten Beobachtungen
// beobidMarkiert der Array mit den ausgewählten Pop
// visible: Ob die Ebene sichtbar geschaltet wird (oder bloss im Layertree verfügbar ist)

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                                   = require('jquery'),
    _                                   = require('underscore'),
    ol                                  = require('ol'),
    styleBeob                           = require('./styleBeob'),
    beobContent                         = require('../../templates/olMap/popupBeob'),
    addSelectFeaturesInSelectableLayers = require('./addSelectFeaturesInSelectableLayers'),
    pruefeObPopTpopGewaehltWurden       = require('./pruefeObPopTpopGewaehltWurden'),
    erstelleBeobZuordnungsLayer         = require('./erstelleBeobZuordnungsLayer'),
    erstelleTPopLayer                   = require('./erstelleTPopLayer');

module.exports = function (beobArray, tpopArray, beobidMarkiert, visible) {
    var beobLayerErstellt = $.Deferred(),
        markers = [],
        marker,
        myLabel,
        myName,
        popupContent,
        beobLayer,
        selectedFeatures;

    if (window.apf.olMap.map && window.apf.olMap.map.olmapSelectInteraction && beobidMarkiert) {
        selectedFeatures = window.apf.olMap.map.olmapSelectInteraction.getFeatures().getArray();
    } else if (beobidMarkiert) {
        addSelectFeaturesInSelectableLayers();
        selectedFeatures = window.apf.olMap.map.olmapSelectInteraction.getFeatures().getArray();
    }

    visible = (visible === true);

    _.each(beobArray, function (beob) {
        if (beob.X && beob.Y) {
            myName = 'Beobachtung ' + (beob.DESC_LOCALITE || '(kein Ort)');
            if (beob.TPopId) {
                beob.statusZuordnung = 'zugeordnet';
            } else if (beob.beobNichtZuzuordnen) {
                beob.statusZuordnung = 'nicht_zuzuordnen';
            } else {
                beob.statusZuordnung = 'nicht_beurteilt';
            }
            popupContent = beobContent(beob);

            // tooltip bzw. label vorbereiten: nullwerte ausblenden
            beob.Datum = (beob.Datum ? beob.Datum.toString() : beob.A_NOTE.toString());

            // marker erstellen...
            marker = new ol.Feature({
                geometry: new ol.geom.Point([beob.X, beob.Y]),
                popName:      myName,
                popupContent: popupContent,
                popupTitle:   myName,
                // Koordinaten werden gebraucht, damit das popup richtig platziert werden kann
                xkoord:       beob.X,
                ykoord:       beob.Y,
                myTyp:        'beob',
                myId:         beob.NO_NOTE,
                TPopId:       beob.TPopId
            });

            // zählt, wieviele male .on('change') ausgelöst wurde
            window.apf.olMap.modifyBeobFeatureZaehler = 0;

            marker.on('change', function (event) {
                var zaehler,
                    coordinates = this.getGeometry().getCoordinates(),
                    pixel       = window.apf.olMap.map.getPixelFromCoordinate(coordinates),
                    beob        = this,
                    beobId      = this.get('myId'),
                    beobX       = this.get('xkoord'),
                    beobY       = this.get('ykoord'),
                    beobTPopId  = this.get('TPopId'),
                    beobGeometryBefore = new ol.geom.Point([beobX, beobY]);

                window.apf.olMap.modifyBeobFeatureZaehler++;
                // speichert, wieviele male .on('change') ausgelöst wurde, bis setTimout aufgerufen wurde
                zaehler = window.apf.olMap.modifyBeobFeatureZaehler;
                setTimeout(function () {
                    if (zaehler === window.apf.olMap.modifyBeobFeatureZaehler) {
                        // in den letzten 400 Millisekunden hat sich nichts geändert > reagieren
                        // suche nach Teilpopulation, auf welche die Beob gezogen wurde
                        var feature = window.apf.olMap.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                            if (layer.get('title') === 'Teilpopulationen') {
                                var tpopFeature = feature,
                                    tpopId      = tpopFeature.get('myId'),
                                    tpopX       = tpopFeature.get('xkoord'),
                                    tpopY       = tpopFeature.get('ykoord'),
                                    newBeobZuordGeometry = new ol.geom.LineString([[beobX, beobY], [tpopX, tpopY]]),
                                    beobZuordnungFeature;

                                // beob zuordnen
                                // TODO: Prüfen, ob die Beob noch keine Zuordnung hat
                                // wenn ja: insert
                                beobZuordnungFeature = _.find(window.apf.olMap.beobZuordnungsLayerFeatures, function(feature) {
                                    return feature.get('myId') == beobId;
                                });
                                if (beobTPopId) {
                                    $.ajax({
                                        type: 'post',
                                        url: 'api/v1/update/apflora/tabelle=beobzuordnung/tabelleIdFeld=NO_NOTE/tabelleId=' + beobId + '/feld=TPopId/wert=' + tpopId + '/user=' + encodeURIComponent(sessionStorage.user)
                                    });
                                    // bestehende beobZuordnung anpassen
                                    beobZuordnungFeature.setGeometry(newBeobZuordGeometry);
                                } else {
                                    $.ajax({
                                        type: 'post',
                                        url: 'api/v1/insert/apflora/tabelle=beobzuordnung/feld=NO_NOTE/wert=' + beobId + '/user=' + encodeURIComponent(sessionStorage.user)
                                    }).done(function () {
                                        // jetzt aktualisieren
                                        $.ajax({
                                            type: 'post',
                                            url: 'api/v1/update/apflora/tabelle=beobzuordnung/tabelleIdFeld=NO_NOTE/tabelleId=' + beobId + '/feld=TPopId/wert=' + tpopId + '/user=' + encodeURIComponent(sessionStorage.user)
                                        }).done(function () {
                                            // bestehende beobZuordnung anpassen
                                            beobZuordnungFeature.setGeometry(newBeobZuordGeometry);
                                        });
                                    });
                                }
                                    
                                // Lage der Beob zurücksetzen
                                beob.setGeometry(beobGeometryBefore);
                                // TODO: Formular öffnen

                            }
                            return feature;
                        });
                    }
                }, 400);
            });

            // marker in Array speichern
            markers.push(marker);
        }

        // markierte in window.apf.olMap.map.olmapSelectInteraction ergänzen
        if (beobidMarkiert && beobidMarkiert.indexOf(beob.PopId) !== -1) {
            selectedFeatures.push(marker);
        }
    });

    // layer für Marker erstellen
    beobLayer = new ol.layer.Vector({
        title:      'Beobachtungen',
        selectable: true,
        source: new ol.source.Vector({
            features: markers
        }),
        style: function (feature, resolution) {
            return styleBeob(feature, resolution);
        }
    });
    beobLayer.set('visible', visible);
    beobLayer.set('kategorie', 'AP Flora');
    window.apf.olMap.map.addLayer(beobLayer);

    var select = new ol.interaction.Select({
        style: styleBeob,
        layers: function (layer) {
            // selectable sind nur features aus dem gewählten layer
            return layer.get('title') === 'Beobachtungen';
        }
    });
    var modify = new ol.interaction.Modify({
        features: select.getFeatures()
    });

    window.apf.olMap.map.addInteraction(select);
    window.apf.olMap.map.addInteraction(modify);

    beobLayerErstellt.resolve();
    return beobLayerErstellt.promise();
};