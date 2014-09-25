'use strict';

var $ = require('jquery'),
    _ = require('underscore'),
    initiiereAp = require('./initiiereAp');
//require('jquery-ui');

var initiiereJber = function() {
    if (!localStorage.jber_id) {
        // es fehlen benötigte Daten > eine Ebene höher
        initiiereAp();
        return;
    }
    // Felder zurücksetzen
    window.apf.leereFelderVonFormular("jber");
    // Daten für die jber aus der DB holen
    var getJber = $.ajax({
            type: 'get',
            url: 'php/jber.php',
            dataType: 'json',
            data: {
                "id": localStorage.jber_id
            }
        }),
        $JBerJahr = $("#JBerJahr");
    getJber.always(function(data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data) {
            // jber bereitstellen
            window.apf.jber = data;
            // Felder mit Daten beliefern
            $JBerJahr.val(data.JBerJahr);
            $("#JBerSituation").val(data.JBerSituation);
            $("#JBerVergleichVorjahrGesamtziel").val(data.JBerVergleichVorjahrGesamtziel);
            $("#JBerBeurteilung" + data.JBerBeurteilung).prop("checked", true);
            // escapen, + und - werden sonst verändert
            $("#JBerVeraenGegenVorjahr\\" + data.JBerVeraenGegenVorjahr).prop("checked", true);
            $("#JBerAnalyse")
                .val(data.JBerAnalyse)
                .limiter(255, $("#JBerAnalyse_limit"));
            $("#JBerUmsetzung").val(data.JBerUmsetzung);
            $("#JBerErfko").val(data.JBerErfko);
            $("#JBerATxt").val(data.JBerATxt);
            $("#JBerBTxt").val(data.JBerBTxt);
            $("#JBerCTxt").val(data.JBerCTxt);
            $("#JBerDTxt").val(data.JBerDTxt);
            if (data.JBerDatum !== "01.01.1970") {
                // php macht aus einem Nullwert im Datum den 1.1.1970!!!
                $("#JBerDatum").val(data.JBerDatum);
            } else {
                $("#JBerDatum").val("");
            }
            // JBerBearb: Daten holen - oder vorhandene nutzen
            if (!window.apf.adressen_html) {
                var getAdressen = $.ajax({
                    type: 'get',
                    url: 'api/adressen',
                    dataType: 'json'
                });
                getAdressen.always(function(data2) {
                    if (data2) {
                        // adressen bereitstellen
                        // Feld mit Daten beliefern
                        var html;
                        html = "<option></option>";
                        _.each(data2, function(adresse) {
                            html += "<option value=\"" + adresse.id + "\">" + adresse.AdrName + "</option>";
                        });
                        window.apf.adressen_html = html;
                        $("#JBerBearb")
                            .html(html)
                            .val(window.apf.jber.JBerBearb);
                    }
                });
            } else {
                $("#JBerBearb")
                    .html(window.apf.adressen_html)
                    .val(window.apf.jber.JBerBearb);
            }
            // Formulare blenden
            window.apf.zeigeFormular("jber");
            history.replaceState({jber: "jber"}, "jber", "index.html?ap=" + localStorage.ap_id + "&jber=" + localStorage.jber_id);
            // bei neuen Datensätzen Fokus steuern
            if (!$JBerJahr.val()) {
                $JBerJahr.focus();
            }
        }
    });
};

module.exports = initiiereJber;