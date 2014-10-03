'use strict';

var $              = require('jquery'),
    initiiereIndex = require('./initiiereIndex'),
    initiiereAp    = require('./initiiereAp'),
    initiierePop   = require('./initiierePop'),
    initiiereTPop  = require('./initiiereTPop');

var returnFunction = function (apId, popId, tpopId, massnBerId) {
    // prüfen, ob voraussetzungen gegeben sind
    if (!apId && !localStorage.ap_id) {
        // Anwendung neu initiieren
        initiiereIndex();
        return;
    }
    if (!popId && !localStorage.pop_id) {
        // es fehlen benötigte Daten > zwei Ebenen höher
        initiiereAp(apId);
        return;
    }
    if (!tpopId && !localStorage.tpop_id) {
        // es fehlen benötigte Daten > eine Ebene höher
        initiierePop(apId, popId);
        return;
    }
    if (!massnBerId && !localStorage.tpopmassnber_id) {
        // es fehlen benötigte Daten > eine Ebene höher
        initiiereTPop(apId, popId, tpopId);
        return;
    }

    // apId setzen
    if (!localStorage.ap_id) localStorage.ap_id = apId;
    if (!apId) apId = localStorage.ap_id;
    // popId setzen
    if (!localStorage.pop_id) localStorage.pop_id = popId;
    if (!popId) popId = localStorage.pop_id;
    // tpopId setzen
    if (!localStorage.tpop_id) localStorage.tpop_id = tpopId;
    if (!tpopId) tpopId = localStorage.tpop_id;
    // massnBerId setzen
    if (!localStorage.tpopmassnber_id) localStorage.tpopmassnber_id = massnBerId;
    if (!massnBerId) massnBerId = localStorage.tpopmassnber_id;

    // Felder zurücksetzen
    window.apf.leereFelderVonFormular("tpopmassnber");

    // Daten für die pop aus der DB holen
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblTeilPopMassnBericht/feld=TPopMassnBerId/wertNumber=' + massnBerId,
        dataType: 'json'
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            data = data[0];

            // tpopmassnber bereitstellen
            window.apf.tpopmassnber = data;

            // Felder mit Daten beliefern
            $("#TPopMassnBerJahr").val(data.TPopMassnBerJahr);
            $("#TPopMassnBerErfolgsbeurteilung" + data.TPopMassnBerErfolgsbeurteilung).prop("checked", true);
            $("#TPopMassnBerTxt").val(data.TPopMassnBerTxt);

            // Formulare blenden
            window.apf.zeigeFormular("tpopmassnber");
            history.pushState(null, null, "index.html?ap=" + apId + "&pop=" + popId + "&tpop=" + tpopId + "&tpopmassnber=" + massnBerId);

            // bei neuen Datensätzen Fokus steuern
            $('#TPopMassnBerJahr').focus();
        }
    }).fail(function () {
        window.apf.melde('Fehler: keine Daten für den Massnahmen-Bericht erhalten');
    });
};

module.exports = returnFunction;