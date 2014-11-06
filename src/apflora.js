/*jslint node: true, browser: true, nomen: true*/

// benötigte globale Variablen initialisieren
window.apf = window.apf || {};
window.apf.gmap = window.apf.gmap || {};
window.apf.olmap = window.apf.olmap || {};

window.apf.initiiereApp = require('./modules/initiiereApp');

// setzt window.apf und localStorage.ap_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowAp = function (id) {
    'use strict';
    localStorage.ap_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/ap=' + localStorage.ap_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // ap bereitstellen
            window.apf.ap = data[0];
        }
    });
};

// setzt window.apf.pop und localStorage.pop_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowPop = function (id) {
    'use strict';
    localStorage.pop_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblPopulation/feld=PopId/wertNumber=' + localStorage.pop_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // pop bereitstellen
            window.apf.pop = data[0];
        }
    });
};

// setzt window.apf.apziel und localStorage.apziel_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowApziel = function (id) {
    'use strict';
    localStorage.apziel_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblZiel/feld=ZielId/wertNumber=' + localStorage.apziel_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // apziel bereitstellen
            window.apf.apziel = data[0];
        }
    });
};

// setzt window.apf.zielber und localStorage.zielber_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowZielber = function (id) {
    'use strict';
    localStorage.zielber_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblZielBericht/feld=ZielBerId/wertString=' + localStorage.zielber_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // zielber bereitstellen
            window.apf.zielber = data[0];
        }
    });
};

// setzt window.apf.erfkrit und localStorage.erfkrit_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowErfkrit = function (id) {
    'use strict';
    localStorage.erfkrit_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblErfKrit/feld=ErfkritId/wertString=' + localStorage.erfkrit_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // erfkrit bereitstellen
            window.apf.erfkrit = data[0];
        }
    });
};

// setzt window.apf.jber und localStorage.jber_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowJber = function (id) {
    'use strict';
    localStorage.jber_id = id;
    $.ajax({
        type: 'get',
        url: '/api/v1/apflora/tabelle=tblJBer/feld=JBerId/wertNumber=' + localStorage.jber_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // jber bereitstellen
            window.apf.jber = data[0];
        }
    });
};

// setzt window.apf.jber_übersicht und localStorage.jber_uebersicht_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowJberUebersicht = function (id) {
    'use strict';
    localStorage.jber_uebersicht_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblJBerUebersicht/feld=JbuJahr/wertNumber=' + localStorage.jber_uebersicht_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // jber_uebersicht bereitstellen
            window.apf.jber_übersicht = data[0];
        }
    });
};

// setzt window.apf.ber und localStorage.ber_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowBer = function (id) {
    'use strict';
    localStorage.ber_id = id;
    $.ajax({
        type: 'get',
        url: '/api/v1/apflora/tabelle=tblBer/feld=BerId/wertNumber=' + localStorage.ber_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            data = data[0];
            // ber bereitstellen
            window.apf.ber = data;
        }
    });
};

// setzt window.apf.idealbiotop und localStorage.idealbiotop_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowIdealbiotop = function (id) {
    'use strict';
    localStorage.idealbiotop_id = id;
    $.ajax({
        type: 'get',
        url: '/api/v1/apflora/tabelle=tblIdealbiotop/feld=IbApArtId/wertNumber=' + localStorage.idealbiotop_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // idealbiotop bereitstellen
            window.apf.idealbiotop = data[0];
        }
    });
};

// setzt window.apf.assozarten und localStorage.assozarten_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowAssozarten = function (id) {
    'use strict';
    localStorage.assozarten_id = id;
    $.ajax({
        type: 'get',
        url: '/api/v1/apflora/tabelle=tblAssozArten/feld=AaId/wertNumber=' + localStorage.assozarten_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data) {
            // assozarten bereitstellen
            window.apf.assozarten = data;
        }
    });
};

// setzt window.apf.popmassnber und localStorage.popmassnber_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowPopmassnber = function (id) {
    'use strict';
    localStorage.popmassnber_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblPopMassnBericht/feld=PopMassnBerId/wertNumber=' + id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // popmassnber bereitstellen
            window.apf.popmassnber = data[0];
        }
    });
};

// setzt window.apf.tpop und localStorage.tpop_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowTpop = function (id) {
    'use strict';
    localStorage.tpop_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblTeilpopulation/feld=TPopId/wertNumber=' + localStorage.tpop_id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // tpop bereitstellen
            window.apf.tpop = data[0];
        }
    });
};

window.apf.downloadFileFromView = function (view, filename, format) {
    // löst einen Download aus
    // als Formate steht momentan nur csv (und teilweise kml) zur Verfügung, weil xlsx leider nicht funktioniert hat
    var getTimestamp = require('./modules/getTimestamp'),
        url;

    format = format || 'csv';
    url = 'api/v1/exportView/' + format + '/view=' + view + '/filename=' + filename + '_' + getTimestamp();

    $.fileDownload(url, {
        preparingMessageHtml: "Der Download wird vorbereitet, bitte warten...",
        failMessageHtml: "Beim Aufbereiten des Downloads ist ein Problem aufgetreten, bitte nochmals versuchen."
    });
};

window.apf.downloadFileFromViewWehreIdIn = function (view, idName, idListe, filename, format) {
    // löst einen Download aus
    // als Formate steht momentan nur csv zur Verfügung, weil xlsx leider nicht funktioniert hat
    var getTimestamp = require('./modules/getTimestamp'),
        url;

    format = format || 'csv';
    url = 'api/v1/exportViewWhereIdIn/' + format + '/view=' + view + '/idName=' + idName + '/idListe=' + idListe + '/filename=' + filename + '_' + getTimestamp();

    $.fileDownload(url, {
        preparingMessageHtml: "Der Download wird vorbereitet, bitte warten...",
        failMessageHtml: "Beim Aufbereiten des Downloads ist ein Problem aufgetreten, bitte nochmals versuchen."
    });
};

// setzt window.apf.popber und localStorage.popber_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowPopber = function (id) {
    'use strict';
    localStorage.popber_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblPopBericht/feld=PopBerId/wertNumber=' + id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // popber bereitstellen
            window.apf.popber = data[0];
        }
    });
};

// setzt window.apf.tpopfeldkontr und localStorage.tpopfeldkontr_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowTpopfeldkontr = function (id) {
    'use strict';
    localStorage.tpopfeldkontr_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblTeilPopFeldkontrolle/feld=TPopKontrId/wertNumber=' + id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // tpopfeldkontr bereitstellen
            window.apf.tpopfeldkontr = data[0];
        }
    });
};

// setzt window.apf.tpopmassn und localStorage.tpopmassn_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowTpopmassn = function (id) {
    'use strict';
    localStorage.tpopmassn_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblTeilPopMassnahme/feld=TPopMassnId/wertNumber=' + id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // tpopmassn bereitstellen
            window.apf.tpopmassn = data[0];
        }
    });
};

// setzt window.apf.tpopmassnber und localStorage.tpopmassnber_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowTpopmassnber = function (id) {
    'use strict';
    localStorage.tpopmassnber_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblTeilPopMassnBericht/feld=TPopMassnBerId/wertNumber=' + id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // tpopmassnber bereitstellen
            window.apf.tpopmassnber = data[0];
        }
    });
};

// setzt window.apf.tpopber und localStorage.tpopber_id
// wird benötigt, wenn beim App-Start direkt ein deep link geöffnet wird
window.apf.setzeWindowTpopber = function (id) {
    'use strict';
    localStorage.tpopber_id = id;
    $.ajax({
        type: 'get',
        url: 'api/v1/apflora/tabelle=tblTeilPopBericht/feld=TPopBerId/wertNumber=' + id
    }).done(function (data) {
        // Rückgabewert null wird offenbar auch als success gewertet, gibt weiter unten Fehler, also Ausführung verhindern
        if (data && data[0]) {
            // tpopber bereitstellen
            window.apf.tpopber = data[0];
        }
    });
};

window.apf.initiiereExporte = function (anchor) {
    'use strict';
    var zeigeFormular = require('./modules/zeigeFormular');
    $("#testart_div").hide();
    $("#forms_titelzeile").hide();
    zeigeFormular("exporte");
    history.pushState(null, null, "index.html?exporte=true");
    if (anchor) {
        location.hash = "#" + anchor;
    }
};

// leert alle Felder und stellt ihre Breite ein
window.apf.leereFelderVonFormular = function (Formular) {
    'use strict';
    $('#' + Formular + ' input[type="text"]').each(function (){
        $(this).val("");
    });
    $('#' + Formular + ' input[type="radio"]:checked').each(function (){
        $(this).prop('checked', false);
    });
    $('#' + Formular + ' select').each(function (){
        $(this).val("");
    });
};

// begrenzt die maximale Höhe des Baums auf die Seitenhöhe, wenn nötig
window.apf.setzeTreehöhe = function () {
    'use strict';
    if ($(window).width() > 1000) {
        if (($(".jstree-no-icons").height() + 157) > $(window).height()) {
            $("#tree").css("max-height", $(window).height() - 139);
        }
    } else {
        // Spalten sind untereinander. Baum 75px weniger hoch, damit Formulare immer erreicht werden können
        if (($(".jstree-no-icons").height() + 157) > $(window).height()-75) {
            $("#tree").css("max-height", $(window).height() - 220);
        }
    }
};

window.apf.setzeKartenhöhe = function () {
    'use strict';
    var lyt_max_height = window.apf.berechneOlmapLayertreeMaxhöhe,
        forms_height,
        max_width;
    // Formulare sind unbegrenzt hoch aber Karten sollen das nicht sein
    if (window.apf.kartenhöhe_manuell) {
        forms_height = $(window).height() - 17;
        max_width = $("#forms").width();
        // resizable neu rechnen lassen, sonst bleibt ga_karten_div in falscher Grösse
        // leider funktioniert das nicht wie gewünscht:
        // wenn der Benutzer die Grösse verändert hat, passt sich ga_karten_div nicht mehr richtig an Veränderungen des Bildschirms an...
        //$('.apf-resizable').resizable('destroy');
        //$('.apf-resizable').resizable();
        /*$('.apf-resizable').resizable({
            maxWidth: max_width,
            maxHeight: forms_height
        });*/
        $("#forms").height(forms_height);
        $('#ga_karten_div')
            //.css('width', max_width)
            .css('max-width', max_width)
            //.css('height', forms_height)
            .css('max-height', forms_height);
        $('.apf-resizable').resizable();
        if (window.apf.olmap && window.apf.olmap.map) {
            window.apf.olmap.map.updateSize();
            // Maximalgrösse des Layertree begrenzen
            $('#olmap_layertree_layers').css('max-height', lyt_max_height);
        }
        if (typeof google !== "undefined" && google.maps && window.apf.gmap && window.apf.gmap.map !== undefined) {
            google.maps.event.trigger(window.apf.gmap.map, 'resize');
        }
    } else {
        $("#forms").height('auto');
    }
};

window.apf.olmap.blendeOlmapExportieren = function () {
    'use strict';
    var map_size,
        anz_kartenpixel,
        tooltip_title;
    map_size = window.apf.olmap.map.getSize();
    // resolution nicht berücksichtigen - das funktionierte nicht zuverlässig und gab Probleme
    anz_kartenpixel = /*window.apf.olmap.map.getView().getResolution() * */map_size[0] * map_size[1];
    $('#olmap_exportieren').button();
    if (anz_kartenpixel > 500000) {
        $('#olmap_exportieren').button("disable");
        tooltip_title = 'Karte als png herunterladen<br>Diese Funktion ist inaktiv<br>Um sie zu aktivieren, müssen Sie die Karte verkleinern<br>Packen Sie dazu die untere rechte Ecke und ziehen Sie sie nach oben links';
    } else {
        $('#olmap_exportieren').button("enable");
        tooltip_title = 'Karte als png herunterladen';
    }
    $("#olmap_exportieren_div").tooltip({
        tooltipClass: "tooltip-styling-hinterlegt",
        content: tooltip_title
    });
};

window.apf.berechneOlmapLayertreeMaxhöhe = function () {
    var lyt_max_height;
    if ($(window).width() > 1000) {
        lyt_max_height = $(window).height() - 115;
    } else {
        // Spalten sind untereinander
        lyt_max_height = 200;
    }
    return lyt_max_height;
};

(function ($) {
    $.fn.hasScrollBar = function () {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);

// setzt die Höhe von textareas so, dass der Text genau rein passt
window.apf.fitTextareaToContent = function (id, maxHeight) {
    'use strict';
   var text = id && id.style ? id : document.getElementById(id);
   if (!text)
      return;

   /* Accounts for rows being deleted, pixel value may need adjusting */
   if (text.clientHeight == text.scrollHeight) {
      text.style.height = "30px";
   }       

   var adjustedHeight = text.clientHeight;
   if (!maxHeight || maxHeight > adjustedHeight) {
      adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
      if (maxHeight)
         adjustedHeight = Math.min(maxHeight, adjustedHeight);
      if (adjustedHeight > text.clientHeight)
         text.style.height = adjustedHeight + "px";
   }
};

window.apf.erstelleApliste = function (programm, callback) {
    'use strict';
    window.apf.apliste = window.apf.apliste || {};

    // sicherstellen, dass ein Programm übergeben wurde
    if (!programm) {
        apliste_erstellt.resolve();
        return apliste_erstellt.promise();
    }

    // nur machen, wenn window.apf.apliste noch nicht existiert
    if (!window.apf.apliste[programm]) {
        $.ajax({
            type: 'get',
            url: 'api/v1/apliste/programm=' + programm
        }).done(function (data) {
            // die Daten werden später benötigt > globale Variable erstellen
            window.apf.apliste[programm] = data;
            window.apf.setzeAutocompleteFuerApliste(programm);
            if (callback) { callback(); }
        });
    } else {
        window.apf.setzeAutocompleteFuerApliste(programm);
        if (callback) { callback(); }
    }
};

window.apf.setzeAutocompleteFuerApliste = function (programm) {
    $("#ap_waehlen_text").autocomplete({
        minLength: 0,
        delay: 500,
        source: window.apf.apliste[programm],
        select: function (event, ui) {
            $(this).val(ui.item.label);
            $("#ap_waehlen")
                .val(ui.item.id)
                .trigger('change');
            return false;
        },
        change: function (event, ui) {
            // sicherstellen, dass nur Werte aus der Liste gewählt werden können
            var textPasstZuId = true,
                id = $("#ap_waehlen").val(),
                text;

            if (id) {
                text = _.find(window.apf.apliste.programm_alle, function (art) {
                    return art.id == id;
                });
                if (text && text.label) {
                    if (text.label !== $(this).val()) {
                        textPasstZuId = false;
                    }
                }
            }
            if (!textPasstZuId) {
                // kein zulässiger Eintrag > Feld wiederherstellen
                console.log('kein zulässiger Eintrag');
                $(this).val(text.label);
            }
        }
    });
};

// wird in index.html benutzt
window.apf.wähleApListe = function (programm) {
    require('./modules/waehleApliste') (programm);
};

// diese Funktion kann nicht modularisiert werden, weil jstree nicht für node entwickelt wurde!!!!
window.apf.erstelle_tree = function (ApArtId) {
    require('./modules/erstelleTree') ($, ApArtId);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_pop = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Populationen (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_apziel = function (node) {
    'use strict';
    var anz = 0,
        anzTxt;
    $($.jstree._reference(node)._get_children(node)).each(function (index) {
        $($(this).find("> ul > li")).each(function (index) {
            anz += 1;
        });
    });
    anzTxt = "AP-Ziele (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_apzieljahr = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt;
    anzTxt = $.jstree._reference(node).get_text(node).slice(0, 6);
    anzTxt += anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_zielber = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Ziel-Berichte (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_erfkrit = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "AP-Erfolgskriterien (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_jber = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "AP-Berichte (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_ber = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Berichte (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_assozarten = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "assoziierte Arten (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_tpop = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Teilpopulationen (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_popber = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Populations-Berichte (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_popmassnber = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Massnahmen-Berichte (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_tpopmassnber = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Massnahmen-Berichte (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_tpopmassn = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Massnahmen (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_tpopber = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Teilpopulations-Berichte (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_tpopfeldkontr = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Feldkontrollen (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_tpopfreiwkontr = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Freiwilligen-Kontrollen (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_beob_zugeordnet = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "Beobachtungen (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_beob_nicht_beurteilt = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "nicht beurteilte Beobachtungen (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

// übernimmt einen node
// zählt dessen children und passt die Beschriftung an
window.apf.beschrifte_ordner_beob_nicht_zuzuordnen = function (node) {
    'use strict';
    var anz = $(node).find("> ul > li").length,
        anzTxt = "nicht zuzuordnende Beobachtungen (" + anz + ")";
    $.jstree._reference(node).rename_node(node, anzTxt);
};

window.apf.tpopKopiertInPopOrdnerTpopEinfügen = function (aktiver_node) {
    'use strict';
    $.ajax({
        type: 'post',
        url: 'api/v1/tpopInsertKopie/popId=' + window.apf.erstelleIdAusDomAttributId($(aktiver_node).attr("id")) + '/tpopId=' + window.apf.erstelleIdAusDomAttributId($(window.apf.tpop_node_kopiert).attr("id")) + '/user=' + sessionStorage.User
    }).done(function (id) {
        var strukturtyp = "tpop",
            beschriftung = window.apf.tpop_objekt_kopiert.TPopFlurname;
        if (window.apf.tpop_objekt_kopiert.TPopNr) {
            beschriftung = window.apf.tpop_objekt_kopiert.TPopNr + ': ' + window.apf.tpop_objekt_kopiert.TPopFlurname
        }
        window.apf.insertNeuenNodeEineHierarchiestufeTiefer(aktiver_node, "", strukturtyp, id, beschriftung);
    }).fail(function () {
        window.apf.melde("Fehler: Die Teilpopulation wurde nicht erstellt");
    });
};

// wird offenbar momentan nicht verwendet
window.apf.tpopKopiertInTpopEinfügen = function (aktiver_node, parent_node) {
    'use strict';
    var data = {};
    // nur aktualisieren, wenn Schreibrechte bestehen
    if (!window.apf.prüfeSchreibvoraussetzungen()) {
        return;
    }
    // drop kennt den parent nicht
    if (!parent_node) {
        parent_node = $.jstree._reference(aktiver_node)._get_parent(aktiver_node);
    }
    // User und neue PopId mitgeben
    data.MutWer = sessionStorage.User;
    data.PopId = window.apf.erstelleIdAusDomAttributId($(parent_node).attr("id"));
    // die alten id's entfernen
    delete window.apf.tpop_objekt_kopiert.PopId;
    delete window.apf.tpop_objekt_kopiert.TPopId;
    // das wird gleich neu gesetzt, alte Werte verwerfen
    delete window.apf.tpop_objekt_kopiert.MutWann;
    delete window.apf.tpop_objekt_kopiert.MutWer;
    // alle verbliebenen Felder an die url hängen
    _.each(window.apf.tpop_objekt_kopiert, function (value, key) {
        // Nullwerte ausschliessen
        if (value !== null) {
            data[key] = value;
        }
    });
    // und an die DB schicken
    $.ajax({
        type: 'post',
        url: 'api/v1/tpopInsertKopie/popId=' + data.PopId + '/tpopId=' + window.apf.erstelleIdAusDomAttributId($(window.apf.tpop_node_kopiert).attr("id")) + '/user=' + data.MutWer
    }).done(function (tpop_id) {
        var strukturtyp = "tpop",
            beschriftung = window.apf.tpop_objekt_kopiert.TPopNr + " " + window.apf.tpop_objekt_kopiert.TPopFlurname;
        window.apf.insertNeuenNodeAufGleicherHierarchiestufe(aktiver_node, parent_node, strukturtyp, tpop_id, beschriftung);
    }).fail(function () {
        window.apf.melde("Fehler: Die Teilpopulation wurde nicht erstellt");
    });
};

window.apf.pruefeLesevoraussetzungen = function () {
    'use strict';
    // kontrollieren, ob der User offline ist
    if (!navigator.onLine) {
        console.log('offline');
        $("#offline_dialog")
            .show()
            .dialog({
                modal: true,
                width: 400,
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                }
            });
        return false;
    }
    return true;
};

window.apf.prüfeSchreibvoraussetzungen = function () {
    'use strict';
    // kontrollieren, ob der User online ist
    if (window.apf.pruefeLesevoraussetzungen()) {
        // kontrollieren, ob der User Schreibrechte hat
        if (sessionStorage.NurLesen) {
            window.apf.melde("Sie haben keine Schreibrechte", "Speichern abgebrochen");
            return false;
        }
        return true;
    }
};

// braucht $ wegen jstree
// vorläufig indirekt aufrufen, damit $ übergeben wird
// später durch jstree 3 ablösen
window.apf.speichern = function (that) {
    'use strict';
    require('./modules/speichern') ($, that);
};

(function ($) {
    // friendly helper //tinyurl.com/6aow6yn
    // Läuft durch alle Felder im Formular
    // Wenn ein Wert enthalten ist, wird Feldname und Wert ins Objekt geschrieben
    // nicht vergessen: Typ, _id und _rev dazu geben, um zu speichern
    $.fn.serializeObject = function () {
        var o, a;
        o = {};
        a = this.serializeArray();
        $.each(a, function () {
            if (this.value) {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value);
                } else {
                    o[this.name] = this.value;
                }
            }
        });
        return o;
    };
})(jQuery);

window.apf.olmap.getLayerNames = function () {
    var layer_objekt_array = window.apf.olmap.map.getLayers().getArray(),
        layers = _.map(layer_objekt_array, function (layer_objekt) {
            if (layer_objekt.values_ && layer_objekt.values_.title) {
                 return layer_objekt.values_.title;
            }
        });
    return layers;
};

window.apf.olmap.getLayersWithTitle = function () {
    var layers_array = window.apf.olmap.map.getLayers().getArray(),
        layers = _.map(layers_array, function (layer) {
            if (layer.get('title')) {
                 return layer;
            }
        });
    return layers || [];
};

window.apf.olmap.entferneLayerNachName = function (name) {
    var layers_array = window.apf.olmap.getLayersWithTitle(),
        layername,
        layer_kategorie;

    _.each(layers_array, function (layer) {
        layername = layer.get('title');
        layer_kategorie = layer.get('kategorie');
        if (layername === name) {
            window.apf.olmap.map.removeLayer(layer);
            if (layer_kategorie === 'Eigene Ebenen') {
                // ebene aus localStorage entfernen
                console.log('entferneLayerNachName meldet: lasse entfernen layer mit title ' + layername);
                window.apf.olmap.aktualisiereEbeneInLocalStorage(layer, true);
            }
        }
    });
};

window.apf.olmap.entferneAlleApfloraLayer = function () {
    'use strict';
    var initiiereLayertree = require('./modules/initiiereLayertree');
    if (window.apf.olmap && window.apf.olmap.map) {
        // getLayers retourniert ein Objekt!!!
        // um die eigentlichen Layers zu erhalten, muss man .getLayers().getArray() aufrufen!!!
        var layers_array = window.apf.olmap.map.getLayers().getArray(),
            kategorie,
            title,
            zu_löschende_layer = [];
        // zuerst nur einen Array mit den zu löschenden Layern erstellen
        // wenn man sofort löscht, wird nur der erste entfernt!
        _.each(layers_array, function (layer) {
            kategorie = layer.get('kategorie');
            title = layer.get('title');
            if (kategorie && kategorie === 'AP Flora' && title !== 'Detailpläne') {
                zu_löschende_layer.push(layer);
            }
        });
        _.each(zu_löschende_layer, function (layer) {
            window.apf.olmap.map.removeLayer(layer);
        });
        initiiereLayertree($);
    }
};

window.apf.aktualisiereKoordinatenVonTPop = function (tpop) {
    var koord_aktualisiert = $.Deferred();
    // Datensatz updaten
    $.ajax({
        type: 'post',
        url: 'api/v1/update/apflora/tabelle=tblTeilpopulation/tabelleIdFeld=TPopId/tabelleId=' + tpop.TPopId + '/feld=TPopXKoord/wert=' + tpop.TPopXKoord + '/user=' + sessionStorage.User
    }).done(function () {
        $.ajax({
            type: 'post',
            url: 'api/v1/update/apflora/tabelle=tblTeilpopulation/tabelleIdFeld=TPopId/tabelleId=' + tpop.TPopId + '/feld=TPopYKoord/wert=' + tpop.TPopYKoord + '/user=' + sessionStorage.User
        }).done(function () {
            koord_aktualisiert.resolve();
        });
    });
    return koord_aktualisiert.promise();
};

window.apf.olmap.stapleLayerZuoberst = function (layer_title) {
    var layers = window.apf.olmap.map.getLayers(),
        layers_array = window.apf.olmap.map.getLayers().getArray(),
        top_layer,
        initiiereLayertree = require('./modules/initiiereLayertree');

    _.each(layers_array, function (layer, index) {
        if (layer.get('title') === layer_title) {
            top_layer = layers.removeAt(index);
            layers.insertAt(layers_array.length, top_layer);
        }
    });
    initiiereLayertree($);
};

window.apf.olmap.entferneModifyInteractionFürTpop = function () {
    'use strict';
    if (window.apf.olmap.modify_interaction) {
        window.apf.olmap.map.removeInteraction(window.apf.olmap.modify_interaction);
        delete window.apf.olmap.modify_interaction;
    }
};

// wird in index.html benutzt
window.apf.olmap.entferneModifyInteractionFürVectorLayer = function (input_div) {
    require('./modules/entferneModifyInteractionFuerVectorLayer')(input_div);
};

// wird in index.html benutzt
window.apf.olmap.erstelleModifyInteractionFürVectorLayer = function (vectorlayer) {
    require('./modules/erstelleModifyInteractionFuerVectorLayer')(vectorlayer);
};

// wird in index.html benutzt
window.apf.olmap.exportiereLayer = function (layer, selected_value) {
    require('./modules/exportiereLayer')(layer, selected_value);
};

window.apf.download = function (filename, text) {
    'use strict';
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
};

window.apf.olmap.istLayerSichtbarNachName = function (layername) {
    'use strict';
    var layer_objekt_array,
        layer_ist_sichtbar;
    // prüfen, ob eine map existiert
    if (window.apf.olmap.map) {
        layer_objekt_array = window.apf.olmap.map.getLayers().getArray();
        layer_ist_sichtbar = _.find(layer_objekt_array, function (layer_objekt) {
            return layer_objekt.get('title') === layername && layer_objekt.get('visible');
        });
        if (layer_ist_sichtbar) {
            return true;
        }
    }
    return false;
};

// übernimmt eine Liste von (markierten) TPop
// retourniert den Ausschnitt = bounds der angezeigt werden soll
// und einen array mit den tpop_id's der liste
window.apf.olmap.wähleAusschnittFürÜbergebeneTPop = function (tpop_liste_markiert) {
    'use strict';
    var bounds,
        xkoord_array = [],
        ykoord_array = [],
        x_max,
        y_max,
        x_min,
        y_min;

    // bounds der anzuzeigenden bestimmen
    var tpopid_markiert = [];
    if (tpop_liste_markiert && tpop_liste_markiert.length > 0) {
        _.each(tpop_liste_markiert, function (tpop) {
            tpopid_markiert.push(tpop.TPopId);
            xkoord_array.push(tpop.TPopXKoord);
            ykoord_array.push(tpop.TPopYKoord);
        });
        // extent berechnen
        // puffern, damit immer alles sichtbar ist
        // underscore retourniert strings, also in Zahlen umwandeln
        x_max = parseInt(_.max(xkoord_array)) + 70;
        x_min = parseInt(_.min(xkoord_array)) - 70;
        y_max = parseInt(_.max(ykoord_array)) + 70;
        y_min = parseInt(_.min(ykoord_array)) - 70;
        bounds = [x_min, y_min, x_max, y_max];
    } else {
        // keine tpop übergeben, Kanton anzeigen
        bounds = [669000, 222000, 717000, 284000];
    }
    return {bounds: bounds, tpopid_markiert: tpopid_markiert};
};

// übernimmt eine Liste von (markierten) Pop
// retourniert den Ausschnitt = bounds der angezeigt werden soll
// und einen array mit den tpop_id's der liste
window.apf.olmap.wähleAusschnittFürÜbergebenePop = function (pop_liste_markiert) {
    'use strict';
    var bounds,
        xkoord_array = [],
        ykoord_array = [],
        x_max,
        y_max,
        x_min,
        y_min,
        // bounds der anzuzeigenden bestimmen
        popid_markiert = [];
    if (pop_liste_markiert && pop_liste_markiert.length > 0) {
        _.each(pop_liste_markiert, function (pop) {
            popid_markiert.push(pop.PopId);
            xkoord_array.push(pop.PopXKoord);
            ykoord_array.push(pop.PopYKoord);
        });
        // extent berechnen
        // puffern, damit immer alles sichtbar ist
        // underscore retourniert strings, also in Zahlen umwandeln
        x_max = parseInt(_.max(xkoord_array)) + 70;
        x_min = parseInt(_.min(xkoord_array)) - 70;
        y_max = parseInt(_.max(ykoord_array)) + 70;
        y_min = parseInt(_.min(ykoord_array)) - 70;
        bounds = [x_min, y_min, x_max, y_max];
    } else {
        // keine tpop übergeben, Kanton anzeigen
        bounds = [669000, 222000, 717000, 284000];
    }
    return {bounds: bounds, popid_markiert: popid_markiert};
};

window.apf.olmap.zeigePopInTPop = function (overlay_pop_visible, overlay_popnr_visible, popid_markiert) {
    'use strict';
    var pop_gezeigt = $.Deferred(),
        initiiereLayertree = require('./modules/initiiereLayertree');
    
    $.ajax({
        type: 'get',
        url: 'api/v1/popKarteAlle/apId=' + window.apf.ap.ApArtId
    }).done(function (PopListe) {
        // Layer für Symbole und Beschriftung erstellen
        $.when(window.apf.olmap.erstellePopLayer(PopListe, popid_markiert, overlay_pop_visible))
        .then(function () {
            // layertree neu aufbauen
            initiiereLayertree($);
            pop_gezeigt.resolve();
        });
    }).fail(function () {
        window.apf.melde("Fehler: Es konnten keine Populationen aus der Datenbank abgerufen werden");
        pop_gezeigt.resolve();
    });
    return pop_gezeigt.promise();
};

// dieser Funktion kann man einen Wert zum speichern übergeben
window.apf.speichereWert = function (tabelle, id, feld, wert) {
    'use strict';
    var updateTabelle = $.ajax({
        type: 'post',
        url: 'php/' + tabelle + '_update.php',
        data: {
            "id": id,
            "Feld": feld,
            "Wert": wert,
            "user": sessionStorage.User
        }
    });
    updateTabelle.fail(function () {
        window.apf.melde("Fehler: Die letzte Änderung wurde nicht gespeichert");
    });
};

window.apf.olmap.erstelleContentFürTPop = function (tpop) {
    'use strict';
    var my_flurname = tpop.TPopFlurname || '(kein Flurname)';
    return '<table>'+
        '<tr><td><p>Typ:</p></td><td><p>Teilpopulation</p></td></tr>'+
        '<tr><td><p>Population:</p></td><td><p>' + tpop.PopName + '</p></td></tr>'+
        '<tr><td><p>Teilpopulation:</p></td><td><p>' + my_flurname + '</p></td></tr>'+
        '<tr><td><p>Koordinaten:</p></td><td><p>' + tpop.TPopXKoord + ' / ' + tpop.TPopYKoord + '</p></td></tr>'+
        '</table>'+
        '<p><a href="#" onclick="window.apf.öffneTPop("' + tpop.TPopId + '")">Formular anstelle Karte öffnen<\/a></p>'+
        '<p><a href="#" onclick="window.apf.öffneFormularAlsPopup(\'tpop\', ' + tpop.TPopId + ')">Formular neben der Karte öffnen<\/a></p>'+
        '<p><a href="#" onclick="window.apf.öffneTPopInNeuemTab("' + tpop.TPopId + '")">Formular in neuem Fenster öffnen<\/a></p>';
};

// retourniert features
// übergibt man einen Typ, werden nur features dieses Typs retourniert
window.apf.olmap.listSelectedFeatures = function (typ) {
    'use strict';
    var selected_features = window.apf.olmap.map.olmap_select_interaction.getFeatures().getArray(),
        features_to_return;
    features_to_return = _.filter(selected_features, function (feature) {
        if (typ) {
            return feature.get('myTyp') === typ;
        } else {
            return feature.get('myTyp');
        }
    });
    return features_to_return;
};

// sucht features an einem Ort in der Karte
window.apf.olmap.sucheFeatures = function (pixel) {
    var features = [];
    window.apf.olmap.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        features.push(feature);
    });
    return features;
};

window.apf.olmap.entfernePopupOverlays = function () {
    var overlays = window.apf.olmap.map.getOverlays().getArray(),
        zu_löschender_overlay = [];
    _.each(overlays, function (overlay) {
        if (overlay.get('typ') === 'popup') {
            zu_löschender_overlay.push(overlay);
        }
    });
    _.each(zu_löschender_overlay, function (overlay) {
        window.apf.olmap.map.removeOverlay(overlay);
    });
    // alle qtips entfernen
    $('.qtip').each(function () {
        $(this).qtip('destroy', true);
    });
};

window.apf.olmap.zeigeFeatureInfo = function (pixel, coordinate) {
    var features = window.apf.olmap.sucheFeatures(pixel),
        overlay,
        popup_id,
        popup_id_array = [],
        koordinaten,
        popup_title,
        popup_text = '',
        features_mit_typ;
    // es scheint auch weitere Features zu geben (z.B. wenn man genau auf die Koordinate einer Pop klickt)
    // nur die gewollten behalten
    features_mit_typ = _.filter(features, function (feature) {
        return feature.get('myTyp') ||  feature.get('popup_title');
    });
    if (features_mit_typ && features_mit_typ.length > 0) {
        // wenn mehrere features_mit_typ vorkommen: die Infos aller sammeln und anzeigen
        if (features_mit_typ.length > 1) {
            _.each(features_mit_typ, function (feature, index) {
                if (feature.get('myTyp') === 'Detailplan') {
                    popup_text += '<h3>Objekt ID: ' + feature.get('OBJECTID') + '</h3>';
                    popup_text += '<table><tr><td><p>Typ:</p></td><td><p>Detailplan</p></td></tr>'+
                        '<tr><td><p>Fläche:</p></td><td><p>' + parseInt(feature.get('SHAPE_Area') / 10) + '</p></td></tr>'+
                        '<tr><td><p>Bemerkunge:</p></td><td><p>' + (feature.get('Bemerkunge') || "") + '</p></td></tr>'+
                        '<tr><td><p>Bemerkun_1:</p></td><td><p>' + (feature.get('Bemerkun_1') || "") + '</p></td></tr></table>';
                } else {
                    popup_text += '<h3>' + feature.get('popup_title') + '</h3>';
                    popup_text += feature.get('popup_content');
                }
                if (index + 1 < features_mit_typ.length) {
                    popup_text += '<hr>';
                }
            });
            popup_title = features_mit_typ.length + ' Treffer';
            // als Koordinaten den Ort des Klicks nehmen
            koordinaten = coordinate;
        } else {
            // es gibt nur einen feature
            if (features_mit_typ[0].get('myTyp') === 'Detailplan') {
                popup_text = '<table><tr><td><p>Typ:</p></td><td><p>Detailplan</p></td></tr>'+
                    '<tr><td><p>Fläche:</p></td><td><p>' + parseInt(features_mit_typ[0].get('SHAPE_Area') / 10) + '</p></td></tr>'+
                    '<tr><td><p>Bemerkunge:</p></td><td><p>' + (features_mit_typ[0].get('Bemerkunge') || "") + '</p></td></tr>'+
                    '<tr><td><p>Bemerkun_1:</p></td><td><p>' + (features_mit_typ[0].get('Bemerkun_1') || "") + '</p></td></tr></table>';
                popup_title = 'Objekt ID: ' + features_mit_typ[0].get('OBJECTID');
            } else {
                popup_text = features_mit_typ[0].get('popup_content');
                popup_title = features_mit_typ[0].get('popup_title');
            }
            // als Koordinaten die Koordinate des popups nehmen
            if (features_mit_typ[0].get('xkoord') && features_mit_typ[0].get('ykoord')) {
                koordinaten = [features_mit_typ[0].get('xkoord'), features_mit_typ[0].get('ykoord')];
            } else {
                koordinaten = coordinate;
            }
        }

        // zuerst mit gtip einen popup erzeugen
        $('.olmap_popup').each(function () {
            $(this).qtip({
                content: {
                    text: popup_text,
                    title: popup_title,
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
                    viewport: $('#GeoAdminKarte')
                }
            });
            $(this).qtip('toggle', true);
        });

        // id des popups ermitteln
        $('.qtip').each(function () {
            popup_id_array.push($(this).attr('data-qtip-id'));
        });
        popup_id = _.max(popup_id_array);

        // die mit qtip erzeugte div dem overlay übergeben
        overlay = new ol.Overlay({
            element: $('#qtip-' + popup_id)
        });
        window.apf.olmap.map.addOverlay(overlay);
        overlay.setPosition(koordinaten);
        overlay.set('typ', 'popup');
    } else {
        // alle popups entfernen
        window.apf.olmap.entfernePopupOverlays();
    }
};

window.apf.olmap.erstelleContentFürPop = function (pop) {
    'use strict';
    return '<table>'+
        '<tr><td><p>Typ:</p></td><td><p>Population</p></td></tr>'+
        '<tr><td><p>Koordinaten:</p></td><td><p>' + pop.PopXKoord + ' / ' + pop.PopYKoord + '</p></td></tr>'+
        '</table>'+
        '<p><a href="#" onclick="window.apf.öffnePop(\'' + pop.PopId + '\')">Formular anstelle Karte öffnen<\/a></p>'+
        '<p><a href="#" onclick="window.apf.öffneFormularAlsPopup(\'pop\', ' + pop.PopId + ')">Formular neben der Karte öffnen<\/a></p>'+
        '<p><a href="#" onclick="window.apf.öffnePopInNeuemTab(\'' + pop.PopId + '\')">Formular in neuem Fenster öffnen<\/a></p>';
};

// übernimmt drei Variablen: popliste ist das Objekt mit den Populationen
// popid_markiert der Array mit den ausgewählten Pop
// visible: Ob die Ebene sichtbar geschaltet wird (oder bloss im Layertree verfügbar ist)
window.apf.olmap.erstellePopLayer = function (popliste, popid_markiert, visible) {
    'use strict';
    var pop_layer_erstellt = $.Deferred(),
        markers = [],
        marker,
        my_label,
        my_name,
        popup_content,
        pop_mit_nr_layer,
        selected_features;

    if (window.apf.olmap.map && window.apf.olmap.map.olmap_select_interaction && popid_markiert) {
        selected_features = window.apf.olmap.map.olmap_select_interaction.getFeatures().getArray();
    } else if (popid_markiert) {
        window.apf.olmap.addSelectFeaturesInSelectableLayers();
        selected_features = window.apf.olmap.map.olmap_select_interaction.getFeatures().getArray();
    }

    if (visible === null) {
        visible = true;
    }

    _.each(popliste, function (pop) {
        my_name = pop.PopName || '(kein Name)';
        popup_content = window.apf.olmap.erstelleContentFürPop(pop);

        // tooltip bzw. label vorbereiten: nullwerte ausblenden
        if (pop.PopNr) {
            my_label = pop.PopNr.toString();
        } else {
            my_label = '?';
        }

        // marker erstellen...
        marker = new ol.Feature({
            geometry: new ol.geom.Point([pop.PopXKoord, pop.PopYKoord]),
            pop_nr: my_label,
            pop_name: my_name,
            name: my_label, // noch benötigt? TODO: entfernen
            popup_content: popup_content,
            popup_title: my_name,
            // Koordinaten werden gebraucht, damit das popup richtig platziert werden kann
            xkoord: pop.PopXKoord,
            ykoord: pop.PopYKoord,
            myTyp: 'pop',
            myId: pop.PopId
        });

        // marker in Array speichern
        markers.push(marker);

        // markierte in window.apf.olmap.map.olmap_select_interaction ergänzen
        if (popid_markiert && popid_markiert.indexOf(pop.PopId) !== -1) {
            selected_features.push(marker);
        }
    });

    // layer für Marker erstellen
    pop_mit_nr_layer = new ol.layer.Vector({
        title: 'Populationen',
        selectable: true,
        source: new ol.source.Vector({
            features: markers
        }),
        style: function (feature, resolution) {
            return window.apf.olmap.popStyle(feature, resolution);
        }
    });
    pop_mit_nr_layer.set('visible', visible);
    pop_mit_nr_layer.set('kategorie', 'AP Flora');
    window.apf.olmap.map.addLayer(pop_mit_nr_layer);

    if (selected_features && selected_features.length > 0) {
        setTimeout(function () {
            window.apf.olmap.prüfeObPopTpopGewähltWurden();
        }, 100);
        // Schaltfläche olmap_auswaehlen aktivieren
        $('#olmap_auswaehlen')
            .prop('checked', true)
            .button()
            .button("refresh");
    }

    pop_layer_erstellt.resolve();
    return pop_layer_erstellt.promise();
};


// ermöglicht es, nach dem toolip zu sortieren
window.apf.vergleicheTPopZumSortierenNachTooltip = function (a,b) {
    'use strict';
    if (a.tooltip < b.tooltip)
         return -1;
    if (a.tooltip > b.tooltip)
        return 1;
    return 0;
};

window.apf.deaktiviereGeoAdminAuswahl = function () {
    'use strict';
    if (window.apf.olmap.auswahlPolygonLayer) {
        window.apf.olmap.auswahlPolygonLayer.removeAllFeatures();
    }
    if (window.drawControl) {
        window.drawControl.deactivate();
    }
    $("#ergebnisAuswahl").css("display", "none");
    delete window.apf.tpop_id_array;
    delete window.tpop_id_liste;
    delete window.apf.pop_id_array;
    delete window.pop_id_liste;
};

window.apf.erstelleTPopNrLabel = function (popnr, tpopnr) {
    'use strict';
    // tooltip bzw. label vorbereiten: nullwerte ausblenden
    if (popnr && tpopnr) {
        return popnr + '/' + tpopnr;
    } else if (popnr) {
        return popnr + '/?';
    } else if (tpopnr) {
        return '?/' + tpopnr;
    } else {
        return '?/?';
    }
};

window.apf.olmap.erstelleMarkerFürTPopLayer = function (tpop) {
    return new ol.Feature({
        geometry: new ol.geom.Point([tpop.TPopXKoord, tpop.TPopYKoord]),
        tpop_nr: tpop.TPopNr,
        pop_nr: tpop.PopNr,
        tpop_nr_label: window.apf.erstelleTPopNrLabel(tpop.PopNr, tpop.TPopNr),
        tpop_name: tpop.TPopFlurname || '(kein Name)',
        name: window.apf.erstelleTPopNrLabel(tpop.PopNr, tpop.TPopNr),  // brauchts das noch? TODO: entfernen
        popup_content: window.apf.olmap.erstelleContentFürTPop(tpop),
        popup_title: tpop.Artname,
        // koordinaten werden benötigt damit das popup am richtigen Ort verankert wird
        xkoord: tpop.TPopXKoord,
        ykoord: tpop.TPopYKoord,
        myTyp: 'tpop',
        myId: tpop.TPopId
    });
};

// nimmt drei Variablen entgegen:
// tpop_liste: Die Liste der darzustellenden Teilpopulationen
// tpopid_markiert: die ID der zu markierenden TPop
// visible: Ob das Layer sichtbar sein soll
window.apf.olmap.erstelleTPopLayer = function (tpop_liste, tpopid_markiert, visible) {
    'use strict';

    var tpop_layer_erstellt = $.Deferred(),
        tpop_layer,
        markers = [],
        marker,
        selected_features;

    if (window.apf.olmap.map.olmap_select_interaction && tpopid_markiert) {
        selected_features = window.apf.olmap.map.olmap_select_interaction.getFeatures().getArray();
    } else if (tpopid_markiert) {
        window.apf.olmap.addSelectFeaturesInSelectableLayers();
        selected_features = window.apf.olmap.map.olmap_select_interaction.getFeatures().getArray();
    }

    if (visible === null) {
        visible = true;
    }

    _.each(tpop_liste, function (tpop) {
        // marker erstellen...
        marker = window.apf.olmap.erstelleMarkerFürTPopLayer(tpop);

        // ...und in Array speichern
        markers.push(marker);

        // markierte in window.apf.olmap.map.olmap_select_interaction ergänzen
        if (tpopid_markiert && tpopid_markiert.indexOf(tpop.TPopId) !== -1) {
            selected_features.push(marker);
        }
    });

    // layer für Marker erstellen
    tpop_layer = new ol.layer.Vector({
        title: 'Teilpopulationen',
        source: new ol.source.Vector({
                features: markers
            }),
        style: function (feature, resolution) {
            return window.apf.olmap.tpopStyle(feature, resolution);
        }
    });
    tpop_layer.set('visible', visible);
    tpop_layer.set('kategorie', 'AP Flora');
    
    // ...und der Karte hinzufügen
    window.apf.olmap.map.addLayer(tpop_layer);

    if (selected_features && selected_features.length > 0) {
        setTimeout(function () {
            window.apf.olmap.prüfeObPopTpopGewähltWurden();
        }, 100);
        // Schaltfläche olmap_auswaehlen aktivieren
        $('#olmap_auswaehlen')
            .prop('checked', true)
            .button()
            .button("refresh");
    }

    tpop_layer_erstellt.resolve();
    return tpop_layer_erstellt.promise();
};

window.apf.olmap.onFeatureSelect = function (feature) {
    'use strict';
    var popup = new OpenLayers.Popup.FramedCloud("popup",
            feature.geometry.getBounds().getCenterLonLat(),
            null,
            feature.attributes.message,
            null,
            false    // true zeigt Schliess-Schalftläche an. Schliessen zerstört aber event-listener > popup kann nur ein mal angezeigt werden!
        );
    popup.autoSize = true;
    popup.maxSize = new OpenLayers.Size(600,600);
    popup.fixedRelativePosition = true;
    feature.popup = popup;
    window.apf.gmap.addPopup(popup);
};

window.apf.olmap.onFeatureUnselect = function (feature) {
    'use strict';
    feature.popup.hide();
};

window.apf.gmap.zeigeBeobUndTPop = function (beob_liste, tpop_liste) {
    /*global Google*/
    'use strict';
    var anz_beob,
        anz_tpop,
        infowindow_beob,
        infowindow_tpop,
        tpop,
        lat,
        lng,
        latlng,
        options,
        map,
        bounds,
        markers_tpop,
        tpop_id,
        latlng2,
        marker_beob,
        marker_tpop,
        contentstring_beob,
        contentstring_tpop,
        marker_options_beob,
        marker_options_tpop,
        marker_cluster_beob,
        marker_cluster_tpop,
        datum,
        titel_beob,
        tpop_beschriftung,
        a_note,
        my_flurname,
        chToWgsLat = require('./lib/chToWgsLat'),
        chToWgsLng = require('./lib/chToWgsLng'),
        zeigeFormular = require('./modules/zeigeFormular');

    // vor Erneuerung zeigen - sonst klappt Wiederaufruf nicht, wenn die Karte schon angezeigt ist
    zeigeFormular("google_karte");
    window.apf.gmap.markers_array = [];
    window.apf.gmap.info_window_array = [];
    infowindow_beob = new google.maps.InfoWindow();
    infowindow_tpop = new google.maps.InfoWindow();
    // Lat und Lng in BeobListe ergänzen
    _.each(beob_liste, function (beob) {
        beob.Lat = chToWgsLat(parseInt(beob.X), parseInt(beob.Y));
        beob.Lng = chToWgsLng(parseInt(beob.X), parseInt(beob.Y));
    });
    // dito in TPopListe
    _.each(tpop_liste, function (tpop, index) {
        if (!tpop.TPopXKoord || !tpop.TPopYKoord) {
            // tpop gibt in Chrome Fehler
            delete tpop_liste[index];
        } else {
            tpop.Lat = chToWgsLat(parseInt(tpop.TPopXKoord), parseInt(tpop.TPopYKoord));
            tpop.Lng = chToWgsLng(parseInt(tpop.TPopXKoord), parseInt(tpop.TPopYKoord));
        }
    });
    // Beob zählen
    anz_beob = beob_liste.length;
    // TPop zählen
    anz_tpop = tpop_liste.length;
    // Karte mal auf Zürich zentrieren, falls in den BeobListe.rows keine Koordinaten kommen
    // auf die die Karte ausgerichtet werden kann
    lat = 47.383333;
    lng = 8.533333;
    latlng = new google.maps.LatLng(lat, lng);
    options = {
        zoom: 15,
        center: latlng,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    map = new google.maps.Map(document.getElementById("google_karten_div"), options);
    window.apf.gmap.map = map;
    bounds = new google.maps.LatLngBounds();

    // für alle TPop Marker erstellen
    markers_tpop = [];
    _.each(tpop_liste, function (tpop) {
        tpop_id = tpop.TPopId;
        latlng2 = new google.maps.LatLng(tpop.Lat, tpop.Lng);
        // Kartenausschnitt um diese Koordinate erweitern
        bounds.extend(latlng2);
        tpop_beschriftung = window.apf.beschrifteTPopMitNrFürKarte(tpop.PopNr, tpop.TPopNr);
        marker_tpop = new MarkerWithLabel({
            map: map,
            position: latlng2,
            title: tpop_beschriftung,
            labelContent: tpop_beschriftung,
            labelAnchor: new google.maps.Point(75, 0),
            labelClass: "MapLabel",
            icon: "img/flora_icon.png"
        });
        markers_tpop.push(marker_tpop);
        my_flurname = tpop.TPopFlurname || '(kein Flurname)';
        contentstring_tpop = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent" class="GmInfowindow">'+
            '<h3>' + tpop.Artname + '</h3>'+
            '<p>Population: ' + tpop.PopName + '</p>'+
            '<p>TPop: ' + my_flurname + '</p>'+
            '<p>Koordinaten: ' + tpop.TPopXKoord + ' / ' + tpop.TPopYKoord + '</p>'+
            '<p><a href="#" onclick="window.apf.öffneTPop("' + tpop.TPopId + '")">Formular anstelle Karte öffnen<\/a></p>'+
            '<p><a href="#" onclick="window.apf.öffneFormularAlsPopup(\'tpop\', ' + tpop.TPopId + ')">Formular neben der Karte öffnen<\/a></p>'+
            '<p><a href="#" onclick="window.apf.öffneTPopInNeuemTab("' + tpop.TPopId + '")">Formular in neuem Fenster öffnen<\/a></p>'+
            '</div>'+
            '</div>';
        makeListener(map, marker_tpop, contentstring_tpop);
    });
    marker_options_tpop = {
        maxZoom: 17, 
        styles: [{
                height: 53,
                url: "img/m8.png",
                width: 53
            }]
    };
    marker_cluster_tpop = new MarkerClusterer(map, markers_tpop, marker_options_tpop);
    
    // diese Funktion muss hier sein, damit infowindow bekannt ist
    function makeListener(map, markerTPop, contentStringTPop) {
        google.maps.event.addListener(markerTPop, 'click', function () {
            infowindow_tpop.setContent(contentStringTPop);
            infowindow_tpop.open(map, markerTPop);
        });
    }

    // für alle Beob Marker erstellen
    window.markersBeob = [];
    _.each(beob_liste, function (beob) {
        datum = beob.Datum;
        latlng2 = new google.maps.LatLng(beob.Lat, beob.Lng);
        if (anz_beob === 1) {
            // map.fitbounds setzt zu hohen zoom, wenn nur eine Beob Koordinaten hat > verhindern
            latlng = latlng2;
        } else {
            // Kartenausschnitt um diese Koordinate erweitern
            bounds.extend(latlng2);
        }
        // title muss String sein
        if (datum) {
            titel_beob = datum.toString();
        } else {
            titel_beob = "";
        }
        // A_NOTE muss String sein
        if (beob.A_NOTE) {
            a_note = beob.A_NOTE.toString();
        } else {
            a_note = "";
        }
        marker_beob = new MarkerWithLabel({
            map: map,
            position: latlng2,
            title: titel_beob,
            labelContent: a_note,
            labelAnchor: new google.maps.Point(75, 0),
            labelClass: "MapLabel",
            icon: "img/flora_icon_violett.png",
            draggable: true
        });
        window.markersBeob.push(marker_beob);
        makeListenerMarkerBeobDragend(marker_beob, beob);
        var Autor = beob.Autor || "(keiner)";
        var Projekt = beob.PROJET || "(keines)";
        var Ort = beob.DESC_LOCALITE || "(keiner)";
        contentstring_beob = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent" class="GmInfowindow">'+
            '<h3>' + datum + '</h3>'+
            '<p>Autor: ' + Autor + '</p>'+
            '<p>Projekt: ' + Projekt + '</p>'+
            '<p>Ort: ' + Ort + '</p>'+
            '<p>Koordinaten: ' + beob.X + ' / ' + beob.Y + '</p>'+
            '<p><a href="#" onclick="window.apf.öffneBeob("' + beob.NO_NOTE + '")">Formular anstelle Karte öffnen<\/a></p>'+
            //'<p><a href="#" onclick="window.apf.öffneFormularAlsPopup(\'beob\', ' + beob.NO_NOTE + ')">Formular neben der Karte öffnen<\/a></p>'+
            '<p><a href="#" onclick="window.apf.öffneBeobInNeuemTab("' + beob.NO_NOTE + '")">Formular in neuem Fenster öffnen<\/a></p>'+
            '</div>'+
            '</div>';
        makeListenerBeob(map, marker_beob, contentstring_beob);
    });
    // KEIN MARKERCLUSTERER: er verhindert das Entfernen einzelner Marker!
    // ausserdem macht er es schwierig, eng liegende Marker zuzuordnen
    
    // diese Funktion muss hier sein, damit infowindow bekannt ist
    function makeListenerBeob(map, markerBeob, contentStringBeob) {
        google.maps.event.addListener(markerBeob, 'click', function () {
            infowindow_beob.setContent(contentStringBeob);
            infowindow_beob.open(map, markerBeob);
        });
    }

    function makeListenerMarkerBeobDragend(markerBeob, Beob) {
        /*global Google*/
        var ddInChY = require('./lib/ddInChY'),
            ddInChX = require('./lib/ddInChX');
        google.maps.event.addListener(markerBeob, "dragend", function (event) {
            var lat, lng, X, Y, that;
            that = this;
            // Koordinaten berechnen
            lat = event.latLng.lat();
            lng = event.latLng.lng();
            X = ddInChY(lat, lng);
            Y = ddInChX(lat, lng);
            // nächstgelegene TPop aus DB holen
            var BeobNächsteTPop = $.ajax({
                type: 'get',
                url: 'api/v1/beobNaechsteTpop/apId=' + Beob.NO_ISFS + '/X=' + X + '/Y=' + Y
            });
            BeobNächsteTPop.done(function (data) {
                var beobtxt,
                    chToWgsLng = require('./lib/chToWgsLng'),
                    chToWgsLat = require('./lib/chToWgsLat');
                if (Beob.Autor) {
                    beobtxt = "Beobachtung von " + Beob.Autor + " aus dem Jahr " + Beob.A_NOTE;
                } else {
                    beobtxt = "Beobachtung ohne Autor aus dem Jahr " + Beob.A_NOTE;
                }
                // rückfragen
                $("#Meldung")
                    .html("Soll die " + beobtxt + "<br>der Teilpopulation '" + data[0].TPopFlurname + "' zugeordnet werden?")
                    .dialog({
                    modal: true,
                    title: "Zuordnung bestätigen",
                    width: 600,
                    buttons: {
                        Ja: function () {
                            $(this).dialog("close");
                            // dem bind.move_node mitteilen, dass das Formular nicht initiiert werden soll
                            localStorage.karte_fokussieren = true;
                            // Beob der TPop zuweisen
                            // TODO: Was ist, wenn diese Beobachtung im Baum nicht dargestellt wird????
                            $("#tree").jstree("move_node", "#beob" + Beob.NO_NOTE, "#tpop_ordner_beob_zugeordnet" + data[0].TPopId, "first");
                            //$("#tree").jstree("move_node", "#beob" + Beob.NO_NOTE, "#tpop_ordner_beob_zugeordnet" + data[0].TPopId, "first");
                            // Den Marker der zugewiesenen Beobachtung entfernen
                            that.setMap(null);
                        },
                        Nein: function () {
                            $(this).dialog("close");
                            // drag rückgängig machen
                            lng = chToWgsLng(Beob.X, Beob.Y);
                            lat = chToWgsLat(Beob.X, Beob.Y);
                            var latlng3 = new google.maps.LatLng(lat, lng);
                            that.setPosition(latlng3);
                        }
                    }
                });
            });
            BeobNächsteTPop.fail(function () {
                window.apf.melde("Fehler: Die Beobachtung wurde nicht zugeordnet");
            });
        });
    }

    if (anz_tpop + anz_beob === 1) {
        // map.fitbounds setzt zu hohen zoom, wenn nur ein Punkt dargestellt wird > verhindern
        map.setCenter(latlng);
        map.setZoom(18);
    } else {
        // Karte auf Ausschnitt anpassen
        map.fitBounds(bounds);
    }
};

window.apf.gmap.zeigeBeob = function (beob_liste) {
    /*global Google*/
    'use strict';
    var anz_beob,
        infowindow,
        lat,
        lng,
        latlng,
        options,
        map,
        bounds,
        markers,
        latlng2,
        marker,
        contentString,
        marker_options,
        marker_cluster,
        datum,
        titel,
        a_note,
        chToWgsLng = require('./lib/chToWgsLng'),
        chToWgsLat = require('./lib/chToWgsLat'),
        zeigeFormular = require('./modules/zeigeFormular');
    // vor Erneuerung zeigen - sonst klappt Wiederaufruf nicht, wenn die Karte schon angezeigt ist
    zeigeFormular("google_karte");
    window.apf.gmap.markers_array = [];
    window.apf.gmap.info_window_array = [];
    infowindow = new google.maps.InfoWindow();
    // Lat und Lng in BeobListe ergänzen
    _.each(beob_liste, function (beob) {
        beob.Lat = chToWgsLat(parseInt(beob.X), parseInt(beob.Y));
        beob.Lng = chToWgsLng(parseInt(beob.X), parseInt(beob.Y));
    });
    // TPop zählen
    anz_beob = beob_liste.length;
    // Karte mal auf Zürich zentrieren, falls in den BeobListe.rows keine Koordinaten kommen
    // auf die die Karte ausgerichtet werden kann
    lat = 47.383333;
    lng = 8.533333;
    latlng = new google.maps.LatLng(lat, lng);
    options = {
        zoom: 15,
        center: latlng,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControlOptions: {
            mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.TERRAIN,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.HYBRID
            ]
        }
    };
    map = new google.maps.Map(document.getElementById("google_karten_div"), options);
    window.apf.gmap.map = map;
    bounds = new google.maps.LatLngBounds();
    // für alle Orte Marker erstellen
    markers = [];
    _.each(beob_liste, function (beob) {
        datum = beob.Datum;
        latlng2 = new google.maps.LatLng(beob.Lat, beob.Lng);
        if (anz_beob === 1) {
            // map.fitbounds setzt zu hohen zoom, wenn nur eine Beob Koordinaten hat > verhindern
            latlng = latlng2;
        } else {
            // Kartenausschnitt um diese Koordinate erweitern
            bounds.extend(latlng2);
        }
        // title muss String sein
        if (datum) {
            titel = datum.toString();
        } else {
            titel = "";
        }
        // A_NOTE muss String sein
        if (beob.A_NOTE) {
            a_note = beob.A_NOTE.toString();
        } else {
            a_note = "";
        }
        marker = new MarkerWithLabel({
            map: map,
            position: latlng2,
            title: titel,
            labelContent: a_note,
            labelAnchor: new google.maps.Point(75, 0),
            labelClass: "MapLabel",
            icon: "img/flora_icon_violett.png"
        });
        // dem Marker einen Typ und eine id geben
        // damit drag and drop möglich werden soll
        // marker.set("typ", "beob");
        // marker.set("id", Beob.BeobId);
        marker.metadata = {typ: "beob_nicht_beurteilt", id: beob.NO_NOTE};
        markers.push(marker);
        var Autor = beob.Autor || "(keiner)";
        var Projekt = beob.PROJET || "(keines)";
        var Ort = beob.DESC_LOCALITE || "(keiner)";
        contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent" class="GmInfowindow">'+
            '<h3>' + datum + '</h3>'+
            '<p>Autor: ' + Autor + '</p>'+
            '<p>Projekt: ' + Projekt + '</p>'+
            '<p>Ort: ' + Ort + '</p>'+
            '<p>Koordinaten: ' + beob.X + ' / ' + beob.Y + '</p>'+
            '<p><a href="#" onclick="window.apf.öffneBeob("' + beob.NO_NOTE + '")">Formular anstelle Karte öffnen<\/a></p>'+
            '<p><a href="#" onclick="window.apf.öffneBeobInNeuemTab("' + beob.NO_NOTE + '")">Formular in neuem Fenster öffnen<\/a></p>'+
            '</div>'+
            '</div>';
        makeListener(map, marker, contentString);
    });
    marker_options = {
        maxZoom: 17, 
        styles: [{
                height: 53,
                url: "img/m5.png",
                width: 53
            }]
    };
    marker_cluster = new MarkerClusterer(map, markers, marker_options);
    if (anz_beob === 1) {
        // map.fitbounds setzt zu hohen zoom, wenn nur eine Beobachtung erfasst wurde > verhindern
        map.setCenter(latlng);
        map.setZoom(18);
    } else {
        // Karte auf Ausschnitt anpassen
        map.fitBounds(bounds);
    }
    // diese Funktion muss hier sein, damit infowindow bekannt ist
    function makeListener(map, marker, contentString) {
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        });
    }
};

window.apf.gmap.zeigeTPopBeob = function (tpop_beob_liste) {
    /*global Google*/
    'use strict';
    var anz_tpop_beob,
        infowindow,
        lat,
        lng,
        latlng,
        options,
        map,
        bounds,
        markers,
        latlng2,
        marker,
        contentString,
        marker_options,
        marker_cluster,
        datum,
        titel,
        chToWgsLng = require('./lib/chToWgsLng'),
        chToWgsLat = require('./lib/chToWgsLat'),
        zeigeFormular = require('./modules/zeigeFormular');

    // vor Erneuerung zeigen - sonst klappt Wiederaufruf nicht, wenn die Karte schon angezeigt ist
    zeigeFormular("google_karte");
    window.apf.gmap.markers_array = [];
    window.apf.gmap.info_window_array = [];
    infowindow = new google.maps.InfoWindow();
    // TPopListe bearbeiten:
    // Objekte löschen, die keine Koordinaten haben
    // Lat und Lng ergänzen
    _.each(tpop_beob_liste, function (tpop_beob) {
        tpop_beob.Lat = chToWgsLat(parseInt(tpop_beob.X), parseInt(tpop_beob.Y));
        tpop_beob.Lng = chToWgsLng(parseInt(tpop_beob.X), parseInt(tpop_beob.Y));
    });
    // TPop zählen
    anz_tpop_beob = tpop_beob_liste.length;
    // Karte mal auf Zürich zentrieren, falls in den TPopBeobListe.rows keine Koordinaten kommen
    // auf die die Karte ausgerichtet werden kann
    lat = 47.383333;
    lng = 8.533333;
    latlng = new google.maps.LatLng(lat, lng);
    options = {
        zoom: 15,
        center: latlng,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapTypeControlOptions: {
            mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.TERRAIN,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.HYBRID
            ]
        }
    };
    map = new google.maps.Map(document.getElementById("google_karten_div"), options);
    window.apf.gmap.map = map;
    // Versuch: SVO einblenden
    //loadWMS(map, "//wms.zh.ch/FnsSVOZHWMS?");
    //loadWMS(map, "//www.gis.zh.ch/scripts/wmsfnssvo2.asp?");
    // Versuch: AV einblenden
    //loadWMS(map, "//wms.zh.ch/avwms?");
    bounds = new google.maps.LatLngBounds();
    // für alle Orte Marker erstellen
    markers = [];
    _.each(tpop_beob_liste, function (tpop_beob) {
        datum = tpop_beob.Datum;
        latlng2 = new google.maps.LatLng(tpop_beob.Lat, tpop_beob.Lng);
        if (anz_tpop_beob === 1) {
            // map.fitbounds setzt zu hohen zoom, wenn nur eine TPopBeob Koordinaten hat > verhindern
            latlng = latlng2;
        } else {
            // Kartenausschnitt um diese Koordinate erweitern
            bounds.extend(latlng2);
        }
        // title muss String sein
        if (datum) {
            titel = datum.toString();
        } else {
            titel = "";
        }
        marker = new MarkerWithLabel({
            map: map,
            position: latlng2,
            // title muss String sein
            title: titel,
            labelContent: titel,
            labelAnchor: new google.maps.Point(75, 0),
            labelClass: "MapLabel",
            icon: "img/flora_icon_violett.png"
        });
        markers.push(marker);
        var Autor = tpop_beob.Autor || "(keiner)";
        var Projekt = tpop_beob.PROJET || "(keines)";
        var Ort = tpop_beob.DESC_LOCALITE || "(keiner)";
        contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent" class="GmInfowindow">'+
            '<h3>' + datum + '</h3>'+
            '<p>Autor: ' + Autor + '</p>'+
            '<p>Projekt: ' + Projekt + '</p>'+
            '<p>Ort: ' + Ort + '</p>'+
            '<p>Koordinaten: ' + tpop_beob.X + ' / ' + tpop_beob.Y + '</p>'+
            '<p><a href="#" onclick="window.apf.öffneTPopBeob("' + tpop_beob.NO_NOTE + '")">Formular anstelle Karte öffnen<\/a></p>'+
            '<p><a href="#" onclick="window.apf.öffneTPopBeobInNeuemTab("' + tpop_beob.NO_NOTE + '")">Formular in neuem Fenster öffnen<\/a></p>'+
            '</div>'+
            '</div>';
        makeListener(map, marker, contentString);
    });
    marker_options = {
        maxZoom: 17, 
        styles: [{
                height: 53,
                url: "img/m5.png",
                width: 53
            }]
    };
    marker_cluster = new MarkerClusterer(map, markers, marker_options);
    if (anz_tpop_beob === 1) {
        // map.fitbounds setzt zu hohen zoom, wenn nur eine Beobachtung erfasst wurde > verhindern
        map.setCenter(latlng);
        map.setZoom(18);
    } else {
        // Karte auf Ausschnitt anpassen
        map.fitBounds(bounds);
    }
    // diese Funktion muss hier sein, damit infowindow bekannt ist
    function makeListener(map, marker, contentString) {
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        });
    }
};

window.apf.gmap.verorteTPop = function (tpop) {
    /*global Google*/
    'use strict';
    var infowindow = new google.maps.InfoWindow(),
        lat,
        lng,
        latlng,
        zoom_level,
        options,
        map,
        map_canvas = $('#google_karten_div'),
        verorted,
        marker,
        content_string,
        tpop_beschriftung,
        my_flurname,
        chToWgsLng = require('./lib/chToWgsLng'),
        chToWgsLat = require('./lib/chToWgsLat'),
        zeigeFormular = require('./modules/zeigeFormular');

    window.apf.gmap.markers_array = [];

    // vor Erneuerung zeigen - sonst klappt Wiederaufruf nicht, wenn die Karte schon angezeigt ist
    zeigeFormular("google_karte");

    // Optionen für die Anzeige
    if (tpop && tpop.TPopXKoord && tpop.TPopYKoord) {
        // Wenn Koordinaten vorhanden, Lat und Lng ergänzen
        lat = chToWgsLat(parseInt(tpop.TPopXKoord), parseInt(tpop.TPopYKoord));
        lng = chToWgsLng(parseInt(tpop.TPopXKoord), parseInt(tpop.TPopYKoord));
        zoom_level = 15;
        verorted = true;
    } else {
        // sonst auf Zürich zentrieren
        lat = 47.360566;
        lng = 8.542829;
        zoom_level = 12;
        verorted = false;
    }
    latlng = new google.maps.LatLng(lat, lng);
    options = {
        zoom: zoom_level,
        center: latlng,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    // Karte gründen
    map = new google.maps.Map(map_canvas[0], options);
    window.apf.gmap.map = map;

    if (verorted) {
        // marker erstellen
        tpop_beschriftung = window.apf.beschrifteTPopMitNrFürKarte(tpop.PopNr, tpop.TPopNr);
        marker = new google.maps.Marker({
            position: latlng, 
            map: map,
            title: tpop_beschriftung,
            icon: "img/flora_icon_rot.png",
            draggable: true
        });
        // Marker in Array speichern, damit er gelöscht werden kann
        window.apf.gmap.markers_array.push(marker);

        // infowindow erstellen
        my_flurname = tpop.TPopFlurname || '(kein Flurname)';
        content_string = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent" class="GmInfowindow">'+
            '<h3>' + my_flurname + '</h3>'+
            '<p>Koordinaten: ' + tpop.TPopXKoord + ' / ' + tpop.TPopYKoord + '</p>'+
            '<p><a href="#" onclick="window.apf.öffneTPop("' + tpop.TPopId + '")">Formular anstelle Karte öffnen<\/a></p>'+
            '<p><a href="#" onclick="window.apf.öffneFormularAlsPopup(\'tpop\', ' + tpop.TPopId + ')">Formular neben der Karte öffnen<\/a></p>'+
            '<p><a href="#" onclick="window.apf.öffneTPopInNeuemTab("' + tpop.TPopId + '")">Formular in neuem Fenster öffnen<\/a></p>'+
            '</div>'+
            '</div>';
        infowindow = new google.maps.InfoWindow({
            content: content_string
        });
        if (!window.apf.gmap.info_window_array) {
            window.apf.gmap.info_window_array = [];
        }
        window.apf.gmap.info_window_array.push(infowindow);

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        google.maps.event.addListener(marker, "dragend", function (event) {
            window.apf.gmap.SetLocationTPop(event.latLng, map, marker, tpop);
        });
    }

    // listener bei klick in Karte
    // entfernt bestehenden marker, erstellt neuen und aktualisiert Koordinaten
    google.maps.event.addListener(map, 'click', function (event) {
        window.apf.gmap.erstelleMarker(event.latLng, map, marker, tpop);
    });
};

window.apf.gmap.erstelleMarker = function (location, map, marker, tpop) {
    /*global Google*/
    'use strict';
    var title;

    // title muss String sein
    if (tpop && tpop.TPopFlurname) {
        title = tpop.TPopFlurname;
    } else {
        title = "neue Teilpopulation";
    }
    // zuerst bisherigen Marker löschen
    window.apf.gmap.clearMarkers();
    var marker = new google.maps.Marker({
        position: location, 
        map: map,
        title: title,
        icon: "img/flora_icon_rot.png",
        draggable: true
    });
    // Marker in Array speichern, damit er gelöscht werden kann
    window.apf.gmap.markers_array.push(marker);
    google.maps.event.addListener(marker, "dragend", function (event) {
        window.apf.gmap.SetLocationTPop(event.latLng, map, marker, tpop);
    });
    window.apf.gmap.SetLocationTPop(location, map, marker);
};

window.apf.gmap.SetLocationTPop = function (LatLng, map, marker, TPop) {
    /*global Google*/
    'use strict';
    var lat,
        lng,
        contentString,
        infowindow,
        Objekt,
        title,
        X,
        Y,
        ddInChY = require('./lib/ddInChY'),
        ddInChX = require('./lib/ddInChX');
    // nur aktualisieren, wenn Schreibrechte bestehen
    if (!window.apf.prüfeSchreibvoraussetzungen()) {
        return;
    }
    if (TPop && TPop.TPopFlurname) {
        title = TPop.TPopFlurname;
    } else {
        title = "neue Teilpopulation";
    }
    lat = LatLng.lat();
    lng = LatLng.lng();
    X = ddInChY(lat, lng);
    Y = ddInChX(lat, lng);
    var updateTPop_3 = $.ajax({
        type: 'post',
        url: 'api/v1/update/apflora/tabelle=tblTeilpopulation/tabelleIdFeld=TPopId/tabelleId=' + localStorage.tpop_id + '/feld=TPopXKoord/wert=' + X + '/user=' + sessionStorage.User
    });
    updateTPop_3.done(function () {
        var updateTPop_4 = $.ajax({
            type: 'post',
            url: 'api/v1/update/apflora/tabelle=tblTeilpopulation/tabelleIdFeld=TPopId/tabelleId=' + localStorage.tpop_id + '/feld=TPopYKoord/wert=' + Y + '/user=' + sessionStorage.User
        });
        updateTPop_4.done(function () {
            window.apf.gmap.clearInfoWindows();
            contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<div id="bodyContent" class="GmInfowindow">'+
                '<h3>' + title + '</h3>'+
                '<p>Koordinaten: ' + X + ' / ' + Y + '</p>'+
                '<p><a href="#" onclick="window.apf.öffneTPop("' + localStorage.tpop_id + '")">Formular anstelle Karte öffnen<\/a></p>'+
                '<p><a href="#" onclick="window.apf.öffneFormularAlsPopup(\'tpop\', ' + localStorage.tpop_id + ')">Formular neben der Karte öffnen<\/a></p>'+
                '<p><a href="#" onclick="window.apf.öffneTPopInNeuemTab("' + localStorage.tpop_id + '")">Formular in neuem Fenster öffnen<\/a></p>'+
                '</div>'+
                '</div>';
            infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            if (!window.apf.gmap.info_window_array) {
                window.apf.gmap.info_window_array = [];
            }
            window.apf.gmap.info_window_array.push(infowindow);
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
        });
        updateTPop_4.fail(function () {
            window.apf.melde("Fehler: Die Y-Koordinate wurde nicht übernommen (die X-Koordinate offenbar schon)");
        });
    });
    updateTPop_3.fail(function () {
        window.apf.melde("Fehler: Die Koordinaten wurden nicht übernommen");
    });
};

// GoogleMap: alle Marker löschen
// benutzt wo in GoogleMaps Marker gesetzt und verschoben werden
window.apf.gmap.clearMarkers = function () {
    'use strict';
    _.each(window.apf.gmap.markers_array, function (marker) {
        marker.setMap(null);
    });
};

// GoogleMap: alle InfoWindows löschen
// benutzt wo in GoogleMaps Infowindows neu gesetzt werden müssen, weil die Daten verändert wurden
window.apf.gmap.clearInfoWindows = function () {
    'use strict';
    _.each(window.apf.gmap.info_window_array, function (info_window) {
        info_window.setMap(null);
    });
};

window.apf.öffneTPop = function (tpop_id) {
    'use strict';
    localStorage.tpop_id = tpop_id;
    $.jstree._reference("[typ='tpop']#" + tpop_id).deselect_all();
    $("#tree").jstree("select_node", "[typ='tpop']#" + tpop_id);
};

window.apf.öffneTPopInNeuemTab = function (tpop_id) {
    'use strict';
    window.open("index.html?ap="+localStorage.ap_id+"&pop=" + localStorage.pop_id+"&tpop="+tpop_id, "_blank");
};

window.apf.öffnePop = function (pop_id) {
    'use strict';
    console.log('pop_id = ', pop_id);
    localStorage.pop_id = pop_id;
    $.jstree._reference("[typ='pop']#" + pop_id).deselect_all();
    $("#tree").jstree("select_node", "[typ='pop']#" + pop_id);
};

window.apf.öffnePopInNeuemTab = function (pop_id) {
    'use strict';
    window.open("index.html?ap="+localStorage.ap_id+"&pop=" + pop_id, "_blank");
};

window.apf.öffneBeob = function (beob_id) {
    'use strict';
    localStorage.beob_id = beob_id;
    $.jstree._reference("[typ='beob_nicht_beurteilt']#beob" + beob_id).deselect_all();
    $("#tree").jstree("select_node", "[typ='beob_nicht_beurteilt']#beob" + beob_id);
};

window.apf.öffneBeobInNeuemTab = function (beob_id) {
    'use strict';
    window.open("index.html?ap="+localStorage.ap_id+"&beob_nicht_beurteilt=" + beob_id, "_blank");
};

window.apf.öffneTPopBeob = function (beob_id) {
    'use strict';
    localStorage.beob_id = beob_id;
    $.jstree._reference("[typ='beob_zugeordnet']#beob" + beob_id).deselect_all();
    $("#tree").jstree("select_node", "[typ='beob_zugeordnet']#beob" + beob_id);
};

window.apf.öffneTPopBeobInNeuemTab = function (beob_id) {
    'use strict';
    window.open("index.html?ap="+localStorage.ap_id+"&beob_nicht_beurteilt=" + beob_id, "_blank");
};





/* 
    Document   : wms.js
    Created on : Feb 16, 2011, 3:25:27 PM
    Author     : "Gavin Jackson <Gavin.Jackson@csiro.au>"

    Refactored code from //lyceum.massgis.state.ma.us/wiki/doku.php?id=googlemapsv3:home

    example: loadWMS(map, "//spatial.ala.org.au/geoserver/wms?", customParams);

    You can easily add a WMS overlay by calling the loadWMS(map, baseURL, customParams) function, where:

    map - is an instance of Google.maps.Map
    baseURL - is the base URL of your WMS server (eg geoserver)
    customParams - Additional WMS parameters
*/

function bound(value, opt_min, opt_max) {
    if (opt_min != null) value = Math.max(value, opt_min);
    if (opt_max != null) value = Math.min(value, opt_max);
    return value;
}

function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
    return rad / (Math.PI / 180);
}

function MercatorProjection() {
    /*global Google*/
    var MERCATOR_RANGE = 256;
    this.pixelOrigin_ = new google.maps.Point(
        MERCATOR_RANGE / 2, MERCATOR_RANGE / 2);
    this.pixelsPerLonDegree_ = MERCATOR_RANGE / 360;
    this.pixelsPerLonRadian_ = MERCATOR_RANGE / (2 * Math.PI);
}

MercatorProjection.prototype.fromLatLngToPoint = function (latLng, opt_point) {
    /*global Google*/
    var me = this,
        point = opt_point || new google.maps.Point(0, 0),
        origin = me.pixelOrigin_;
    point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;
    // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
    // 89.189.  This is about a third of a tile past the edge of the world tile.
    var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999, 0.9999);
    point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -me.pixelsPerLonRadian_;
    return point;
};

MercatorProjection.prototype.fromDivPixelToLatLng = function (pixel, zoom) {
    /*global Google*/
    var me = this,
        origin = me.pixelOrigin_,
        scale = Math.pow(2, zoom),
        lng = (pixel.x / scale - origin.x) / me.pixelsPerLonDegree_,
        latRadians = (pixel.y / scale - origin.y) / -me.pixelsPerLonRadian_,
        lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
    return new google.maps.LatLng(lat, lng);
};

MercatorProjection.prototype.fromDivPixelToSphericalMercator = function (pixel, zoom) {
    /*global Google*/
    var me = this,
        coord = me.fromDivPixelToLatLng(pixel, zoom),
        r = 6378137.0,
        x = r * degreesToRadians(coord.lng()),
        latRad = degreesToRadians(coord.lat()),
        y = (r / 2) * Math.log((1 + Math.sin(latRad)) / (1 - Math.sin(latRad)));
    return new google.maps.Point(x,y);
};

function loadWMS(map, baseURL, customParams) {
    /*global Google*/
    var tileHeight = 256,
        tileWidth = 256,
        opacityLevel = 0.75,
        isPng = true,
        minZoomLevel = 2,
        maxZoomLevel = 28;

    //var baseURL = "";
    // für SVO
    var wmsParams = [
    "REQUEST=GetMap",
    "SERVICE=WMS",
    "VERSION=1.1.1",
    //"WIDTH=512",
    //"HEIGHT=512",
    //"SRS=EPSG:4326",
    //"LAYERS=zonen-schutzverordnungen",
    "STYLES=default",
    "TRANSPARENT=TRUE",
    "FORMAT=image/gif"
    ];
    // für av
    /*var wmsParams = [
    //"REQUEST=GetCapabilities",
    //"SERVICE=WMS",
    //"VERSION=1.3.0",
    "WIDTH="+ tileWidth,
    "HEIGHT="+ tileHeight
    ];*/

    // add additional parameters
    wmsParams = wmsParams.concat(customParams);

    var overlayOptions = {
        getTileUrl: function (coord, zoom) {
            var lULP = new google.maps.Point(coord.x*256,(coord.y+1)*256);
            var lLRP = new google.maps.Point((coord.x+1)*256,coord.y*256);

            var projectionMap = new MercatorProjection();

            var lULg = projectionMap.fromDivPixelToSphericalMercator(lULP, zoom);
            var lLRg  = projectionMap.fromDivPixelToSphericalMercator(lLRP, zoom);

            var lUL_Latitude = lULg.y;
            var lUL_Longitude = lULg.x;
            var lLR_Latitude = lLRg.y;
            var lLR_Longitude = lLRg.x;
            // GJ: there is a bug when crossing the -180 longitude border (tile does not render) - this check seems to fix it
            if (lLR_Longitude < lUL_Longitude){
              lLR_Longitude = Math.abs(lLR_Longitude);
            }
            var urlResult = baseURL + wmsParams.join("&") + "&bbox=" + lUL_Longitude + "," + lUL_Latitude + "," + lLR_Longitude + "," + lLR_Latitude;

            return urlResult;
        },

        tileSize: new google.maps.Size(tileHeight, tileWidth),

        minZoom: minZoomLevel,
        maxZoom: maxZoomLevel,

        opacity: opacityLevel,

        isPng: isPng
    };

    var overlayWMS = new google.maps.ImageMapType(overlayOptions);

    map.overlayMapTypes.insertAt(0, overlayWMS);

    map.setOptions({
        mapTypeControlOptions: {
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN,
                google.maps.MapTypeId.SATELLITE,
                google.maps.MapTypeId.HYBRID
            ],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    });
}

/*! Copyright (c) 2011 Brandon Aaron (//brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: //adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(//www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 *
 * Benutzt, um Mouswheel-Scrollen abzufangen und den event zu verhindern (unbeabsichtigte Änderung von Zahlen in number-Feldern verhindern)
 *
 */

(function ($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function () {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function () {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function (fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function (fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);

window.apf.öffneUri = function () {
    'use strict';
    var uri                     = new Uri($(location).attr('href')),
        anchor                  = uri.anchor() || null,
        apId                    = uri.getQueryParamValue('ap'),
        popId                   = uri.getQueryParamValue('pop'),
        tpopId                  = uri.getQueryParamValue('tpop'),
        tpopfeldkontrId         = uri.getQueryParamValue('tpopfeldkontr'),
        tpopfreiwkontrId        = uri.getQueryParamValue('tpopfreiwkontr'),
        tpopmassnId             = uri.getQueryParamValue('tpopmassn'),
        tpopberId               = uri.getQueryParamValue('tpopber'),
        tpopmassnberId          = uri.getQueryParamValue('tpopmassnber'),
        popberId                = uri.getQueryParamValue('popber'),
        popmassnberId           = uri.getQueryParamValue('popmassnber'),
        apzielId                = uri.getQueryParamValue('apziel'),
        zielberId               = uri.getQueryParamValue('zielber'),
        erfkritId               = uri.getQueryParamValue('erfkrit'),
        jberId                  = uri.getQueryParamValue('jber'),
        jber_uebersichtId       = uri.getQueryParamValue('jber_uebersicht'),
        berId                   = uri.getQueryParamValue('ber'),
        idealbiotopId           = uri.getQueryParamValue('idealbiotop'),
        assozartenId            = uri.getQueryParamValue('assozarten'),
        exporte                 = uri.getQueryParamValue('exporte'),
        ap_waehlen_text,
        initiiereIdealbiotop    = require('./modules/initiiereIdealbiotop'),
        initiiereAp             = require('./modules/initiiereAp'),
        initiierePop            = require('./modules/initiiereBeob'),
        initiiereApziel         = require('./modules/initiiereApziel'),
        initiiereErfkrit        = require('./modules/initiiereErfkrit'),
        initiiereZielber        = require('./modules/initiiereZielber'),
        initiiereJber           = require('./modules/initiiereJber'),
        initiiereJberUebersicht = require('./modules/initiiereJberUebersicht'),
        initiiereBer            = require('./modules/initiiereBer'),
        initiierePopMassnBer    = require('./modules/initiierePopMassnBer'),
        initiiereTPop           = require('./modules/initiiereTPop'),
        initiierePopBer         = require('./modules/initiierePopBer'),
        initiiereTPopFeldkontr  = require('./modules/initiiereTPopFeldkontr'),
        initiiereTPopMassnBer   = require('./modules/initiiereTPopMassnBer'),
        initiiereTPopBer        = require('./modules/initiiereTPopBer');

    // zuerst die globalen Variabeln setzen
    if (apId)              window.apf.setzeWindowAp(apId);
    if (popId)             window.apf.setzeWindowPop(popId);
    if (tpopId)            window.apf.setzeWindowTpop(tpopId);
    if (tpopfeldkontrId)   window.apf.setzeWindowTpopfeldkontr(tpopfeldkontrId);
    if (tpopfreiwkontrId)  window.apf.setzeWindowTpopfeldkontr(tpopfreiwkontrId);
    if (tpopmassnId)       window.apf.setzeWindowTpopmassn(tpopmassnId);
    if (tpopberId)         window.apf.setzeWindowTpopber(tpopberId);
    if (tpopmassnberId)    window.apf.setzeWindowTpopmassnber(tpopmassnberId);
    if (popberId)          window.apf.setzeWindowPopber(popberId);
    if (popmassnberId)     window.apf.setzeWindowPopmassnber(popmassnberId);
    if (apzielId)          window.apf.setzeWindowApziel(apzielId);
    if (zielberId)         window.apf.setzeWindowZielber(zielberId);
    if (erfkritId)         window.apf.setzeWindowErfkrit(erfkritId);
    if (jberId)            window.apf.setzeWindowJber(jberId);
    if (jber_uebersichtId) window.apf.setzeWindowJberUebersicht(jber_uebersichtId);
    if (berId)             window.apf.setzeWindowBer(berId);
    if (idealbiotopId)     window.apf.setzeWindowIdealbiotop(idealbiotopId);
    if (assozartenId)      window.apf.setzeWindowAssozarten(assozartenId);

    if (apId) {
        // Dem Feld im Formular den Wert zuweisen
        $("#ap_waehlen").val(apId);
        // gewählte Art in Auswahlliste anzeigen
        ap_waehlen_text = _.find(window.apf.apliste.programm_alle, function (art) {
            return art.id == apId;
        });
        if (ap_waehlen_text) {
            $("#ap_waehlen_text").val(ap_waehlen_text.label);
        }
        if (tpopId) {
            if (tpopfeldkontrId) {
                // markieren, dass nach dem loaded-event im Tree die TPopkontr angezeigt werden soll
                // Die Markierung wird im load-Event wieder entfernt
                window.apf.tpopfeldkontr_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiiereTPopFeldkontr(apId, popId, tpopId, tpopfeldkontrId, 'feldKontr');
            } else if (tpopfreiwkontrId) {
                // markieren, dass nach dem loaded-event im Tree die TPopkontr angezeigt werden soll
                window.apf.tpopfreiwkontr_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                localStorage.tpopfreiwkontr = true;
                initiiereTPopFeldkontr(apId, popId, tpopId, tpopfeldkontrId, 'freiwKontr');
            } else if (tpopmassnId) {
                var initiiereTPopMassn = require('./modules/initiiereTPopMassn');
                // markieren, dass nach dem loaded-event im Tree die TPopkontr angezeigt werden soll
                window.apf.tpopmassn_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiiereTPopMassn(apId, popId, tpopId, tpopmassnId);
            } else if (tpopberId) {
                // markieren, dass nach dem loaded-event im Tree die tpopber angezeigt werden soll
                window.apf.tpopber_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiiereTPopBer(apId, popId, tpopId, tpopberId);
            } else if (uri.getQueryParamValue('beob_zugeordnet')) {
                // markieren, dass nach dem loaded-event im Tree die beob_zugeordnet angezeigt werden soll
                window.apf.beob_zugeordnet_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                /*ausgeschaltet - funktioniert nicht! vermutlich, weil tree.php und beob_distzutpop sich in quere kommen
                // herausfinden, ob beobtyp infospezies oder evab ist
                localStorage.beob_id = uri.getQueryParamValue('beob_zugeordnet');
                if (isNaN(uri.getQueryParamValue('beob_zugeordnet'))) {
                    // evab
                    localStorage.beobtyp = "evab";
                    window.apf.initiiere_beob("evab", localStorage.beob_id, "zugeordnet");
                } else {
                    localStorage.beobtyp = "infospezies";
                    window.apf.initiiere_beob("infospezies", localStorage.beob_id, "zugeordnet");
                }*/
            } else if (tpopmassnberId) {
                // markieren, dass nach dem loaded-event im Tree die tpopmassnber angezeigt werden soll
                window.apf.tpopmassnber_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiiereTPopMassnBer(apId, popId, tpopmassnberId);
            } else {
                // muss tpop sein
                // markieren, dass nach dem loaded-event im Tree die TPop angezeigt werden soll
                window.apf.tpop_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiiereTPop(apId, popId, tpopId);
            }
        } else if (popId) {
            if (popberId) {
                // markieren, dass nach dem loaded-event im Tree die Pop angezeigt werden soll
                window.apf.popber_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiierePopBer(apId, popId, popberId);
            } else if (popmassnberId) {
                // markieren, dass nach dem loaded-event im Tree die popmassnber angezeigt werden soll
                window.apf.popmassnber_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiierePopMassnBer(apId, popId, popmassnberId);
            } else {
                // muss pop sein
                // markieren, dass nach dem loaded-event im Tree die Pop angezeigt werden soll
                window.apf.pop_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiierePop(apId, popId);
            }
        } else if (apzielId) {
            if (zielberId) {
                // markieren, dass nach dem loaded-event im Tree die zielber angezeigt werden soll
                window.apf.zielber_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiiereZielber(apId, apzielId, zielberId);
            } else {
                // muss ein apziel sein
                // markieren, dass nach dem loaded-event im Tree die apziel angezeigt werden soll
                window.apf.apziel_zeigen = true;
                // direkt initiieren, bevor der baum fertig aufgebaut ist
                initiiereApziel(apId, apzielId);
            }
        } else if (erfkritId) {
            // markieren, dass nach dem loaded-event im Tree die erfkrit angezeigt werden soll 
            window.apf.erfkrit_zeigen = true;
            // direkt laden
            initiiereErfkrit(apId, erfkritId);
        } else if (jberId) {
            // markieren, dass nach dem loaded-event im Tree die jber angezeigt werden soll 
            window.apf.jber_zeigen = true;
            // direkt initiieren, bevor der baum fertig aufgebaut ist
            initiiereJber(apId, jberId);
        } else if (jber_uebersichtId) {
            // markieren, dass nach dem loaded-event im Tree die jber_uebersicht angezeigt werden soll 
            window.apf.jber_übersicht_zeigen = true;
            // direkt initiieren, bevor der baum fertig aufgebaut ist
            initiiereJberUebersicht(apId, jber_uebersichtId);
        } else if (berId) {
            // markieren, dass nach dem loaded-event im Tree die ber angezeigt werden soll 
            window.apf.ber_zeigen = true;
            // direkt initiieren, bevor der baum fertig aufgebaut ist
            initiiereBer(apId, berId);
        } else if (idealbiotopId) {
            // markieren, dass nach dem loaded-event im Tree die idealbiotop angezeigt werden soll 
            window.apf.idealbiotop_zeigen = true;
            // direkt initiieren, bevor der baum fertig aufgebaut ist
            initiiereIdealbiotop(apId);
        } else if (assozartenId) {
            // markieren, dass nach dem loaded-event im Tree die assozarten angezeigt werden soll 
            window.apf.assozarten_zeigen = true;
            // NICHT direkt initiieren, weil sonst die Artliste noch nicht existiert
        } else if (uri.getQueryParamValue('beob_nicht_beurteilt')) {
            // markieren, dass nach dem loaded-event im Tree die beob angezeigt werden soll 
            window.apf.beob_nicht_beurteilt_zeigen = true;
        } else if (uri.getQueryParamValue('beob_nicht_zuzuordnen')) {
            // markieren, dass nach dem loaded-event im Tree die beob angezeigt werden soll 
            window.apf.beob_nicht_zuzuordnen_zeigen = true;
        } else {
            // muss ap sein
            // markieren, dass nach dem loaded-event im Tree die Pop angezeigt werden soll 
            window.apf.ap_zeigen = true;
            // direkt initiieren, bevor der baum fertig aufgebaut ist
            initiiereAp(apId);
        }
        window.apf.erstelle_tree(apId);
    } else {
        if (exporte) {
            window.apf.initiiereExporte(anchor);
        }
    }
};

window.apf.getInternetExplorerVersion = function () {
    'use strict';
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent,
        re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat(RegExp.$1);
  }
  return rv;
};

window.apf.olmap.createLayersForOlmap = function () {
    'use strict';
    // bing-maps wäre schön
    // ol3 can't reproject raster tiles yet though
    // daher werden die Layer noch nicht angezeigt
    var bing_styles_object = {
            'Aerial': 'Bing Luftbild',
            'AerialWithLabels': 'Bing Luftbild beschriftet',
            'Road': 'Bing Strassenkarte'
        },
        bing_styles = _.keys(bing_styles_object),
        bing_layers = [];
    _.each(bing_styles, function (bing_style) {
        bing_layers.push(new ol.layer.Tile({
            title: bing_styles_object[bing_style],
            kategorie: 'Welt Hintergrund',
            visible: false,
            preload: Infinity,
            source: new ol.source.BingMaps({
                //projection: new ol.proj.EPSG21781(),
                //projection: projection,
                projection: 'EPSG:21781',
                key: 'AjGOtB_ygBplpxXtKiiHtm-GERjSg9TFEoCmuBI_Yz4VWy0unRGUDo9GOZHA46Pf',
                imagerySet: bing_style
            })
        }));
    });

    var ch_ortholuftbild_layer = ga.layer.create('ch.swisstopo.swissimage');
    ch_ortholuftbild_layer.set('title', 'Luftbild CH');
    ch_ortholuftbild_layer.set('visible', false);
    ch_ortholuftbild_layer.set('kategorie', 'Hintergrund');

    var ch_lk_grau_layer = ga.layer.create('ch.swisstopo.pixelkarte-grau');
    ch_lk_grau_layer.set('title', 'Landeskarten CH grau');
    ch_lk_grau_layer.set('visible', false);
    ch_lk_grau_layer.set('kategorie', 'Hintergrund');

    var ch_lk_farbe_layer = ga.layer.create('ch.swisstopo.pixelkarte-farbe');
    ch_lk_farbe_layer.set('title', 'Landeskarten CH farbig');
    ch_lk_farbe_layer.set('visible', true);
    ch_lk_farbe_layer.set('kategorie', 'Hintergrund');

    var ch_siegriedkarte_layer = ga.layer.create('ch.swisstopo.hiks-siegfried');
    ch_siegriedkarte_layer.set('title', 'Siegfriedkarte 1881');
    ch_siegriedkarte_layer.set('visible', false);
    ch_siegriedkarte_layer.set('kategorie', 'Hintergrund');

    var ch_gemeinden_layer = ga.layer.create('ch.swisstopo-vd.geometa-gemeinde');
    ch_gemeinden_layer.set('title', 'Gemeinden');
    ch_gemeinden_layer.set('visible', false);
    ch_gemeinden_layer.set('kategorie', 'CH Sachinformationen');

    var ch_kantone_layer = ga.layer.create('ch.swisstopo.swissboundaries3d-kanton-flaeche.fill');
    ch_kantone_layer.set('title', 'Kantone');
    ch_kantone_layer.set('visible', false);
    ch_kantone_layer.set('crossOrigin', null);
    ch_kantone_layer.set('kategorie', 'CH Sachinformationen');

    var ch_parzellen_layer = ga.layer.create('ch.kantone.cadastralwebmap-farbe');
    ch_parzellen_layer.set('title', 'Parzellen');
    ch_parzellen_layer.set('visible', false);
    ch_kantone_layer.set('crossOrigin', null);
    ch_parzellen_layer.set('kategorie', 'CH Sachinformationen');

    var ch_am_layer = ga.layer.create('ch.bafu.bundesinventare-amphibien');
    ch_am_layer.set('title', 'Amphibien');
    ch_am_layer.set('visible', false);
    ch_am_layer.set('kategorie', 'CH Biotopinventare');

    var ch_am_wander_layer = ga.layer.create('ch.bafu.bundesinventare-amphibien_wanderobjekte');
    ch_am_wander_layer.set('title', 'Amphibien Wanderobjekte');
    ch_am_wander_layer.set('visible', false);
    ch_am_wander_layer.set('kategorie', 'CH Biotopinventare');

    var ch_auen_layer = ga.layer.create('ch.bafu.bundesinventare-auen');
    ch_auen_layer.set('title', 'Auen');
    ch_auen_layer.set('visible', false);
    ch_auen_layer.set('kategorie', 'CH Biotopinventare');

    var ch_fm_layer = ga.layer.create('ch.bafu.bundesinventare-flachmoore');
    ch_fm_layer.set('title', 'Flachmoore');
    ch_fm_layer.set('visible', false);
    ch_fm_layer.set('kategorie', 'CH Biotopinventare');

    var ch_hm_layer = ga.layer.create('ch.bafu.bundesinventare-hochmoore');
    ch_hm_layer.set('title', 'Hochchmoore');
    ch_hm_layer.set('visible', false);
    ch_hm_layer.set('kategorie', 'CH Biotopinventare');

    var ch_tww_layer = ga.layer.create('ch.bafu.bundesinventare-trockenwiesen_trockenweiden');
    ch_tww_layer.set('title', 'Trockenwiesen und -weiden');
    ch_tww_layer.set('visible', false);
    ch_tww_layer.set('kategorie', 'CH Biotopinventare');

    var ch_vogelreservate_layer = ga.layer.create('ch.bafu.bundesinventare-vogelreservate');
    ch_vogelreservate_layer.set('title', 'Vogelreservate');
    ch_vogelreservate_layer.set('visible', false);
    ch_vogelreservate_layer.set('kategorie', 'CH Biotopinventare');

    var detailpläne_layer_source = new ol.source.GeoJSON({
        url: 'geojson/detailplaene.geojson'/*,
         myTyp: 'Detailplan'*/    // funktioniert nicht
    });
    /* funktioniert nicht:
     detailpläne_layer_source.forEachFeature(function (feature) {
     feature.setValues('myTyp', 'Detailplan');
     });*/

    var detailpläne_layer = new ol.layer.Vector({
        title: 'Detailpläne',
        opacity: 1,
        visible: false,
        kategorie: 'AP Flora',
        selectable: true,
        source: detailpläne_layer_source,
        style: window.apf.olmap.detailplanStyle()
    });

    // ausgeschaltet, da es nicht funktioniert (authorization required)
    var zh_av_layer = new ol.layer.Tile({
        title: 'Amtliche Vermessung',
        visible: false,
        kategorie: 'ZH Sachinformationen',
        source: new ol.source.TileWMS({
            url: '//agabriel:4zC6MgjM@wms.zh.ch/avwms',
            //url: '//wms.zh.ch/avwms',
            crossOrigin: null,
            params: {
                'layers': 'liegenschaften'
            }
        })
    });

    // OL3 hat noch Probleme und bereinigt die Methoden für WFS - zuwarten
    var zh_kartierungen_layer_source = new ol.source.ServerVector({
        //format: new ol.format.GeoJSON(),    // holt nicht mal die Daten
        format: new ol.format.WFS({    // holt die Daten - sollte aber bald die Attrribute nicht mehr benötigen
            featureNS: '//maps.zh.ch',
            featureType: 'polygon'
        }),
        //format: new ol.format.GML(),
        loader: function (extent, resolution, projection) {
            $.ajax({
                type: GET,
                url: '//maps.zh.ch/wfs/FnsNSWFS',
                data: {
                    SERVICE: 'WFS',
                    VERSION: '1.0.0',
                    REQUEST: 'GetFeature',
                    TYPENAME: 'lrm_veg',
                    SRSNAME: 'EPSG:21781',
                    bbox: extent.join(',') + ',EPSG:21781'
                },
                dataType: 'jsonp',
                jsonpCallback: 'load_zh_kartierungen_layer_source'
            });
        },
        strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
            maxZoom: 19
        })),
        projection: 'EPSG:21781'
    });

    var load_zh_kartierungen_layer_source = function (response) {
          zh_kartierungen_layer_source.addFeatures(zh_kartierungen_layer_source.readFeatures(response));    // funktioniert nicht!
    };

    var zh_kartierungen_layer = new ol.layer.Vector({
        title: 'Lebensraum-Kartierungen',
        opacity: 0.7,
        visible: false,
        kategorie: 'ZH Sachinformationen',
        source: zh_kartierungen_layer_source,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 255, 1.0)',
                width: 2
            })
        })
    });

    var zh_svo_farbig_layer = new ol.layer.Tile({
        title: 'SVO farbig',
        opacity: 0.7,
        visible: false,
        kategorie: 'ZH Sachinformationen',
        legende: true,
        legende_url: 'http://wms.zh.ch/FnsSVOZHWMS?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=zonen-schutzverordnungen&format=image/png&STYLE=default',
        source: new ol.source.TileWMS({
            url: '//wms.zh.ch/FnsSVOZHWMS',
            crossOrigin: null,
            params: {
                'layers': 'zonen-schutzverordnungen,ueberlagernde-schutzzonen,schutzverordnungsobjekte,svo-zonen-labels,schutzverordnungsobjekt-nr'
            }
        })
    });

    var zh_svo_grau_layer = new ol.layer.Tile({
        title: 'SVO schwarz/weiss',
        visible: false,
        kategorie: 'ZH Sachinformationen',
        legende: true,
        legende_url: 'http://wms.zh.ch/FnsSVOZHWMS?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=zonen-schutzverordnungen-raster&format=image/png&STYLE=default',
        source: new ol.source.TileWMS({
            url: '//wms.zh.ch/FnsSVOZHWMS',
            crossOrigin: null,
            params: {
                'layers': 'zonen-schutzverordnungen-raster,ueberlagernde-schutzzonen,schutzverordnungsobjekte,svo-zonen-labels,schutzverordnungsobjekt-nr',
                'singleTile': true
            }
        })
    });

    var zh_lichte_wälder_layer = new ol.layer.Tile({
        title: 'Wälder: lichte',
        visible: false,
        kategorie: 'ZH Sachinformationen',
        legende: true,
        legende_url: 'http://wms.zh.ch/FnsLWZHWMS?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=objekte-lichte-waelder-kanton-zuerich&format=image/png&STYLE=default',
        source: new ol.source.TileWMS({
            url: '//maps.zh.ch/wms/FnsLWZH',
            crossOrigin: null,
            params: {
                'layers': 'objekte-lichte-waelder-kanton-zuerich',
                'singleTile': true
            }
        })
    });

    // nicht eingeschaltet, da ohne Legende wenig brauchbar
    var zh_waldkartierung_layer = new ol.layer.Tile({
        title: 'Wälder: Vegetation',
        visible: false,
        kategorie: 'ZH Sachinformationen',
        legende: true,
        legende_url: 'http://wms.zh.ch/WaldVKWMS?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=waldgesellschaften&format=image/png&STYLE=default',
        source: new ol.source.TileWMS({
            url: '//maps.zh.ch/wms/WaldVKWMS',
            crossOrigin: null,
            params: {
                'layers': 'waldgesellschaften',
                'singleTile': true
            }
        })
    });

    // nicht im Gebrauch
    var zh_gemeinden_layer = new ol.layer.Tile({
        title: 'Kanton',
        visible: false,
        kategorie: 'ZH Sachinformationen',
        source: new ol.source.TileWMS({
            url: '//maps.zh.ch/wms/BASISKARTEZH',
            crossOrigin: null,
            params: {
                'layers': 'grenzen,gemeindegrenzen',
                'singleTile': true
            }
        })
    });

    // error 401 (Authorization required)
    var zh_ortholuftbild_layer_1 = new ol.layer.Tile({
        title: 'Luftbild',
        visible: false,
        kategorie: 'Hintergrund',
        source: new ol.source.TileWMS({
            url: '//agabriel:4zC6MgjM@wms.zh.ch/OrthoZHWMS',
            crossOrigin: null,
            params: {
                'layers': 'orthophotos',
                'singleTile': true
            }
        })
    });

    // error 401 (Authorization required)
    var zh_ortholuftbild_layer = new ol.layer.Tile({
        title: 'Luftbild ZH',
        visible: false,
        kategorie: 'Hintergrund',
        source: new ol.source.TileWMS({
            url: '//maps.zh.ch/wms/OrthoBackgroundZH',
            crossOrigin: null,
            params: {
                'layers': 'orthoaktuell',
                'singleTile': true
            }
        })
    });

    var zh_üp_layer = new ol.layer.Tile({
        title: 'Übersichtsplan ZH',
        visible: false,
        kategorie: 'Hintergrund',
        source: new ol.source.TileWMS({
            url: 'http://wms.zh.ch/upwms',
            crossOrigin: null,
            params: {
                'layers': 'upwms',
                'singleTile': true
            }
        })
    });

    var zh_basiskarten_layer = new ol.layer.Tile({
        title: 'Landeskarten ZH',
        visible: false,
        kategorie: 'Hintergrund',
        source: new ol.source.TileWMS({
            url: '//maps.zh.ch/wms/BASISKARTEZH',
            crossOrigin: null,
            params: {
                'layers': 'wald,seen,lk500,lk200,lk100,lk50,lk25,up8,up24',
                'singleTile': true
            }
        })
    });

    var zh_höhenmodell_layer = new ol.layer.Tile({
        title: 'Höhenmodell ZH',
        visible: false,
        kategorie: 'Hintergrund',
        source: new ol.source.TileWMS({
            url: '//maps.zh.ch/wms/DTMBackgroundZH',
            crossOrigin: null,
            params: {
                'layers': 'dtm',
                'singleTile': true
            }
        })
    });

    // Zunächst alle Layer definieren
    var layers_prov = [
        zh_höhenmodell_layer,
        zh_ortholuftbild_layer,
        ch_ortholuftbild_layer,
        zh_basiskarten_layer,
        ch_lk_grau_layer,
        ch_lk_farbe_layer,
        ch_siegriedkarte_layer,
        ch_parzellen_layer,
        ch_gemeinden_layer,
        ch_am_layer,
        ch_am_wander_layer,
        ch_auen_layer,
        ch_fm_layer,
        ch_hm_layer,
        ch_tww_layer,
        ch_vogelreservate_layer,
        ch_kantone_layer,
        zh_üp_layer,
        zh_svo_farbig_layer,
        zh_svo_grau_layer,
        //zh_kartierungen_layer,    // warten, das OL3 mit WFS noch nicht funktioniert
        zh_lichte_wälder_layer,
        zh_waldkartierung_layer,
        detailpläne_layer
    ];

    // bing-layers vorne setzen
    // bing-maps wäre schön
    // ol3 can't reproject raster tiles yet though
    // daher werden die Layer noch nicht angezeigt
    //var layers = layers_prov.concat(bing_layers);
    var layers = layers_prov;

    // prüfen, ob in localStorage eigene Layer existieren
    // ausgeschaltet, weil die LayerObjekte von OL3 rekursiv sind und nicht für die localStorage stringified werden können
    if (localStorage.olmap_eigene_ebenen) {
        // drag and drop geo-files
        var defaultStyle = {
            'Point': [new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: 'rgba(255,255,0,0.5)'
                    }),
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: '#ff0',
                        width: 1
                    })
                })
            })],
            'LineString': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#f00',
                    width: 3
                })
            })],
            'Polygon': [new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0,255,255,0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#0ff',
                    width: 1
                })
            })],
            'MultiPoint': [new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: 'rgba(255,0,255,0.5)'
                    }),
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: '#f0f',
                        width: 1
                    })
                })
            })],
            'MultiLineString': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#0f0',
                    width: 3
                })
            })],
            'MultiPolygon': [new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0,0,255,0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#00f',
                    width: 1
                })
            })]
        };
        var styleFunction = function (feature, resolution) {
            var featureStyleFunction = feature.getStyleFunction();
            if (featureStyleFunction) {
                return featureStyleFunction.call(feature, resolution);
            } else {
                return defaultStyle[feature.getGeometry().getType()];
            }
        };
        // diese hinzufügen
        var eigene_ebenen = JSON.parse(localStorage.olmap_eigene_ebenen),
            eigene_ebenen_layers = [];
        _.each(eigene_ebenen, function (ebene) {
            var format = new ol.format.GeoJSON(),
                features = format.readFeatures(ebene);
            //window.eigene_ebenen.push(features);
            var vectorSource = new ol.source.Vector({
                features: features
            });
            var layer = new ol.layer.Vector({
                guid: ebene.guid,
                source: vectorSource,
                style: styleFunction,
                title: ebene.title,
                kategorie: ebene.kategorie
            });
            eigene_ebenen_layers.push(layer);
        });
        layers = layers.concat(eigene_ebenen_layers);
    }

    return layers;
};

// aktualisiert eine Kopie eigener Ebenen in localStorage
// remove: wenn vorhanden, wird die Ebene entfernt
// sonst wird die enthaltene Version durch die aktuelle ersetzt
// geschrieben wird GeoJSON. Grund: Die Layerobjekte sind rekursiv und können daher nicht stringified werden
window.apf.olmap.aktualisiereEbeneInLocalStorage = function (layer, remove) {
    'use strict';
    // mit der guid kontrollieren, ob die Ebene schon existiert
    var guid = layer.get('guid'),
        index_to_remove,
        eigene_ebenen = [];

    if (localStorage.olmap_eigene_ebenen) {
        eigene_ebenen = JSON.parse(localStorage.olmap_eigene_ebenen);
    }

    if (guid) {
        // den layer entfernen
        // wenn er nicht entfernt werden soll, wird er im nächsten Schritt mit den aktuellen Daten ersetzt
        eigene_ebenen = _.reject(eigene_ebenen, function (ebene) {
            return ebene.guid && ebene.guid === guid;
        });
        // wenn die Ebene nicht entfernt werden sollte, mit den aktuellen Daten ergänzen
        if (!remove) {
            var format = new ol.format.GeoJSON(),
                data_parsed = format.writeFeatures(layer.getSource().getFeatures());
            // alle zugefügten Eigenschaften anfügen
            data_parsed.title = layer.get('title');
            data_parsed.guid = guid;
            data_parsed.kategorie = layer.get('kategorie');
            eigene_ebenen.push(data_parsed);
        }
        try {
            // TODO: wenn rueteren.kml importiert wurde erscheint Fehler 'Converting circular structure to JSON'
            localStorage.olmap_eigene_ebenen = JSON.stringify(eigene_ebenen);
        }
        catch (e) {
            console.log('Ebene konnte nicht in localStorage gespeichert werden. Fehlermeldung: ' + e);
            $('#eigene_layer_meldung_' + layer.get('title').replace(" ", "_"))
                .html('Ebene kann nicht im Cache des Browsers gespeichert werden')
                .show();
        }
    }
};

window.apf.initiiereOlmap = function () {
    'use strict';
    var initiiereLayertree = require('./modules/initiiereLayertree');
    // Proxy Host for Ajax Requests to overcome Cross-Domain HTTTP Requests
    //OpenLayers.ProxyHost = "../cgi-bin/proxy.cgi?url=";
    //var zh_bbox_1903 = new ol.Extent(669000, 222000, 717000, 284000);

    // allfällige Apflora-Ebenen entfernen
    window.apf.olmap.entferneAlleApfloraLayer();
    // allfällige Modify-Interaktion entfernen
    window.apf.olmap.entferneModifyInteractionFürTpop();

    // Karte nur aufbauen, wenn dies nicht schon passiert ist
    if (!window.apf.olmap.map) {

        window.apf.olmap.map = new ga.Map({
            target: 'ga_karten_div',
            layers: window.apf.olmap.createLayersForOlmap(),
            view: new ol.View2D({
                resolution: 4,
                center: [693000, 253000]
            })
        });

        // diverse features und Fähigkeiten ergänzen
        window.apf.olmap.addDragAndDropGeofiles();
        window.apf.olmap.addShowFeatureInfoOnClick();
        window.apf.olmap.changeCursorOverFeature();
        initiiereLayertree($);
        window.apf.olmap.addMousePositionControl();
        window.apf.olmap.addFullScreenControl();

        window.apf.olmap.map.on('change:size', function () {
            // steuern, ob das Export-Tool sichtbar ist
            // wenn es bei hoher Pixelzahl sichtbar ist, gibt es Probleme
            window.apf.olmap.blendeOlmapExportieren();
        });
    }
};

// deaktiviert Messen und Auswählen
window.apf.olmap.deactivateMenuItems = function () {
    // messen deaktivieren
    window.apf.olmap.removeMeasureInteraction();
    // Auswählen deaktivieren
    window.apf.olmap.removeSelectFeaturesInSelectableLayers();
    // allfällige popups schliessen
    window.apf.olmap.entfernePopupOverlays();
    // allfällige tooltips von ga-karten verstecken
    $('div.ga-tooltip').hide();
    // allfällige modify-interaction entfernen
    window.apf.olmap.entferneModifyInteractionFürTpop();
};

window.apf.olmap.removeSelectFeaturesInSelectableLayers = function () {
    'use strict';
    if (window.apf.olmap.map.olmap_select_interaction) {
        window.apf.olmap.map.removeInteraction(window.apf.olmap.map.olmap_select_interaction);
        delete window.apf.olmap.map.olmap_select_interaction;
        window.apf.olmap.removeDragBox();
        $("#ergebnisAuswahl").hide();
    }
};

window.apf.olmap.addSelectFeaturesInSelectableLayers = function () {
    'use strict';
    var addDragBoxForPopTpop = require('./modules/addDragBoxForPopTpop');
    window.apf.olmap.map.olmap_select_interaction = new ol.interaction.Select({
        // TODO: 'layerFilter' will soon be deprecated > change to 'layers' when deprecated
        layerFilter: function (layer) {
            return layer.get('selectable') === true;
        },
        style: function (feature, resolution) {
            switch(feature.get('myTyp')) {
            case 'pop':
                return window.apf.olmap.popStyle(feature, resolution, true);
            case 'tpop':
                return window.apf.olmap.tpopStyle(feature, resolution, true);
            case 'Detailplan':
                return window.apf.olmap.detailplanStyleSelected(feature, resolution);
            }
        }
        /*,
         // wenn man das feature zum zweiten mal klickt, soll es nicht mehr selected sein
         toggleCondition: function (event) {
         return event === 'click';
         }*/
    });
    window.apf.olmap.map.addInteraction(window.apf.olmap.map.olmap_select_interaction);
    // man soll auch mit dragbox selecten können
    addDragBoxForPopTpop();
};

window.apf.olmap.getSelectedFeatures = function () {
    if (window.apf.olmap.map.olmap_select_interaction) {
        return window.apf.olmap.map.olmap_select_interaction.getFeatures().getArray();
    } else {
        return [];
    }
};

window.apf.olmap.getSelectedFeaturesOfType = function (type) {
    var features_array = window.apf.olmap.getSelectedFeatures(),
        return_array = [],
        feature_type;
    if (features_array.length === 0) {
        return [];
    }
    _.each(features_array, function (feature) {
        feature_type = feature.get('myTyp');
        if (feature_type === type) {
            return_array.push(feature);
        }
    });
    return return_array;
};

window.apf.olmap.removeDragBox = function () {
    'use strict';
    if (window.apf.olmap.drag_box_interaction) {
        window.apf.olmap.map.removeInteraction(window.apf.olmap.drag_box_interaction);
        //window.apf.olmap.drag_box_interaction.off('boxend');
        delete window.apf.olmap.drag_box_interaction;
    }
};

window.apf.olmap.addDragBoxForPopTpop = function () {
    'use strict';
    
};

window.apf.olmap.addShowFeatureInfoOnClick = function () {
    'use strict';
    window.apf.olmap.map.on('singleclick', function (event) {
        var pixel = event.pixel,
            coordinate = event.coordinate;
        // nur machen, wenn nicht selektiert wird
        if (!window.apf.olmap.map.olmap_select_interaction) {
            window.apf.olmap.zeigeFeatureInfo(pixel, coordinate);
        }
        // prüfen, ob pop / tpop gewählt wurden
        // verzögern, weil die neuste selection sonst nicht erfasst wird
        setTimeout(function () {
            window.apf.olmap.prüfeObPopTpopGewähltWurden();
        }, 100);
    });
};

window.apf.olmap.prüfeObPopTpopGewähltWurden = function () {
    var pop_selected = [],
        tpop_selected = [],
        erstelleListeDerAusgewaehltenPopTPop = require('./modules/erstelleListeDerAusgewaehltenPopTPop');

    // prüfen, ob pop / tpop gewählt wurden
    pop_selected = window.apf.olmap.getSelectedFeaturesOfType('pop');
    tpop_selected = window.apf.olmap.getSelectedFeaturesOfType('tpop');

    // wenn ja: anzeigen
    if (pop_selected.length > 0 || tpop_selected.length > 0) {
        erstelleListeDerAusgewaehltenPopTPop(pop_selected, tpop_selected);
    } else {
        $("#ergebnisAuswahl").hide();
    }
};

window.apf.olmap.changeCursorOverFeature = function () {
    'use strict';
    $(window.apf.olmap.map.getViewport()).on('mousemove', function (e) {
        var pixel = window.apf.olmap.map.getEventPixel(e.originalEvent),
            hit = window.apf.olmap.map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                return true;
            });
        if (hit) {
            $('#ga_karten_div').css('cursor', 'pointer');
        } else {
            $('#ga_karten_div').css('cursor', '');
        }
    });
};

window.apf.olmap.addMousePositionControl = function () {
    'use strict';
    var mousePositionControl = new ol.control.MousePosition({
        //This is the format we want the coordinate in
        //The number argument in createStringXY is the number of decimal places
        coordinateFormat: ol.coordinate.createStringXY(0),
        projection: "EPSG:21781",
        undefinedHTML: '&nbsp;' //what openlayers will use if the map returns undefined for a map coordinate
    });
    window.apf.olmap.map.addControl(mousePositionControl);
};

window.apf.olmap.addFullScreenControl = function () {
    'use strict';
    var myFullScreenControl = new ol.control.FullScreen();
    window.apf.olmap.map.addControl(myFullScreenControl);
    // auf Deutsch beschriften
    $('#ga_karten_div').find('.ol-full-screen').find('span[role="tooltip"]').html('Vollbild wechseln');
};

window.apf.olmap.addDragAndDropGeofiles = function () {
    'use strict';
    // drag and drop geo-files
    var drag_and_drop_defaultStyle = {
        'Point': [new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: 'rgba(255,255,0,0.5)'
                }),
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: '#ff0',
                    width: 1
                })
            })
        })],
        'LineString': [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#f00',
                width: 3
            })
        })],
        'Polygon': [new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(0,255,255,0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#0ff',
                width: 1
            })
        })],
        'MultiPoint': [new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: 'rgba(255,0,255,0.5)'
                }),
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: '#f0f',
                    width: 1
                })
            })
        })],
        'MultiLineString': [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0f0',
                width: 3
            })
        })],
        'MultiPolygon': [new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(0,0,255,0.5)'
            }),
            stroke: new ol.style.Stroke({
                color: '#00f',
                width: 1
            })
        })]
    };
    var drag_and_drop_styleFunction = function (feature, resolution) {
        var featureStyleFunction = feature.getStyleFunction();
        if (featureStyleFunction) {
            return featureStyleFunction.call(feature, resolution);
        } else {
            return drag_and_drop_defaultStyle[feature.getGeometry().getType()];
        }
    };
    var drag_and_drop_interaction = new ol.interaction.DragAndDrop({
        formatConstructors: [
            ol.format.GPX,
            ol.format.GeoJSON,
            ol.format.IGC,
            ol.format.KML,
            ol.format.TopoJSON
        ]
    });

    window.apf.olmap.map.addInteraction(drag_and_drop_interaction);

    drag_and_drop_interaction.on('addfeatures', function (event) {
        var initiiereLayertree = require('./modules/initiiereLayertree');
        var vectorSource = new ol.source.Vector({
            features: event.features
        });
        var drag_and_drop_layer = new ol.layer.Vector({
            guid: window.apf.erstelleGuid(),
            source: vectorSource,
            style: drag_and_drop_styleFunction,
            title: 'eigene Ebene',
            kategorie: 'Eigene Ebenen'
        });
        window.apf.olmap.map.addLayer(drag_and_drop_layer);
        var view = window.apf.olmap.map.getView();
        view.fitExtent(vectorSource.getExtent(), /** @type {ol.Size} */ (window.apf.olmap.map.getSize()));
        // layertree aktualisieren
        initiiereLayertree($, 'Eigene Ebenen');
        window.apf.olmap.frageNameFürEbene(drag_and_drop_layer);
    });
};

window.apf.olmap.frageNameFürEbene = function (eigene_ebene) {
    'use strict';
    var name_erfragt = $.Deferred(),
        $eigene_ebene_name = $('#eigene_ebene_name'),
        $eigene_ebene_name_container = $('#eigene_ebene_name_container');
    // eigene Ebene global speichern, damit der eventhandler darauf zugreifen kann
    window.apf.olmap.eigene_ebene = eigene_ebene;
    $eigene_ebene_name_container
        .dialog({
            title: 'Ebene taufen',
            modal: true,
            position: {
                my: 'center',
                at: 'center',
                of: $('#ga_karten_div')
            },
            buttons: [
                {
                    text: "speichern",
                    click: function () {
                        // umbenennen
                        window.apf.olmap.nenneEbeneUm(eigene_ebene, $eigene_ebene_name.val());
                        // Namen zurücksetzen
                        $eigene_ebene_name.val('');
                        $(this).dialog( "close" );
                        name_erfragt.resolve();
                    }
                },
                {
                    text: "abbrechen",
                    click: function () {
                        $(this).dialog( "close" );
                    }
                }
            ]
        })
        .dialog('open');
    $eigene_ebene_name.on('keyup', function (event) {
        if (event.which == 13 && window.apf.olmap.eigene_ebene) {
            // enter pressed
            // umbenennen
            window.apf.olmap.nenneEbeneUm(window.apf.olmap.eigene_ebene, event.target.value);
            // Namen zurücksetzen
            $eigene_ebene_name.val('');
            $('#eigene_ebene_name_container').dialog( "close" );
            $('#GeoAdminKarte').off('keyup', '#eigene_ebene_name');
            delete window.apf.olmap.eigene_ebene;
            name_erfragt.resolve();
        }
    });
    return name_erfragt.promise();
};

window.apf.olmap.nenneEbeneUm = function (layer, title) {
    'use strict';
    var initiiereLayertree = require('./modules/initiiereLayertree');
    layer.set('title', title);
    initiiereLayertree($, 'Eigene Ebenen');
    // layer in localStorage speichern
    window.apf.olmap.aktualisiereEbeneInLocalStorage(layer);
};


window.apf.olmap.initiiereLayertree = function (active_kategorie) {
    require('./modules/initiiereLayertree')($, active_kategorie);
};

// Formulare als dialog öffnen
// braucht die id des Formulars
// und die id des Datensatzes, der anzuzeigen ist
window.apf.öffneFormularAlsPopup = function (formularname, id) {
    var $formularname = $('#' + formularname),
        title;

    // id setzen
    localStorage[formularname + '_id'] = id;

    // titel bestimmen
    switch (formularname) {
    case 'pop':
        title = 'Population';
        // formular initiieren, ohne anzuzeigen
        require('./modules/initiierePop')(null, id, true);
        break;
    case 'tpop':
        title = 'Teilpopulation';
        // formular initiieren, ohne anzuzeigen
        require('./modules/initiiereTpop')(null, null, id, true);
        break;
    case 'beob':
        title = 'Beobachtung';
        // formular initiieren, ohne anzuzeigen
        require('./modules/initiiereBeob')('beob_nicht_beurteilt', id, 'nicht_beurteilt', true);
        break;
    default:
        title = '';
    }

    // dialog öffnen
    $formularname.dialog({
        close: function () {
            $formularname.dialog("destroy");
        },
          //height: 600,
        width: 600,
        maxHeight: $('#menu').height(),
        resizable: true,
        position: {
            my: 'left top',
            at: 'left top',
            of: $('#menu')
        },
        title: title
    });
    $formularname.dialog("open");
};

window.apf.olmap.detailplanStyle = function (feature, resolution) {
    'use strict';
    return new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(250, 58, 15, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: '#fa3a0f',
            width: 1
        })
    });
};

window.apf.olmap.detailplanStyleSelected = function (feature, resolution) {
    'use strict';
    return new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(15, 85, 250, 0.1)'
        }),
        stroke: new ol.style.Stroke({
            color: '#0F55FA',
            width: 1
        })
    });
};

// steuert den style von pop
// selected: mit der Maus oder drag_box markierte
window.apf.olmap.popStyle = function (feature, resolution, selected) {
    'use strict';
    
    var icon = 'img/flora_icon_braun.png',
        popid = feature.get('myId'),
        style,
        image_style,
        text_inhalt,
        text_style,
        stroke_color = 'white',
        style_with_text,
        style_without_text,
        $layertree_pop_nr = $('#layertree_pop_nr');

    // markierte: icon ist orange und Text hat roten Hintergrund
    if (selected) {
        icon = 'img/flora_icon_orange.png';
        stroke_color = 'red';
    }

    image_style = new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        src: icon
    }));

    // text bestimmen, abhängig von der Einstellung im Layertree
    if ($layertree_pop_nr.is(':checked')) {
        text_inhalt = feature.get('pop_nr');
    } else if ($('#layertree_pop_name').is(':checked')) {
        text_inhalt = feature.get('pop_name');
    }

    text_style = new ol.style.Text({
        font: 'bold 11px Arial, Verdana, Helvetica, sans-serif',
        text: text_inhalt,
        fill: new ol.style.Fill({
            color: 'black'
        }),
        stroke: new ol.style.Stroke({
            color: stroke_color,
            width: 7
        })
    });

    style_with_text = new ol.style.Style({
        image: image_style,
        text: text_style
    });
    style_without_text = new ol.style.Style({
        image: image_style
    });

    // style bestimmen
    if ($layertree_pop_nr.is(':checked')) {
        style = style_with_text;
    } else if ($('#layertree_pop_name').is(':checked')) {
        style = style_with_text;
    } else {
        style = style_without_text;
    }
    
    return [style];
};

// steuert den style von tpop
// tpopid_markiert: beim Aufbau des Layers werden markierte mitgegeben
// selected: mit der Maus oder drag_box markierte
// verorten: beim Verorten soll das Symbol rot sein
window.apf.olmap.tpopStyle = function (feature, resolution, selected, verorten) {
    'use strict';

    var icon = 'img/flora_icon.png',
        tpopid = feature.get('myId'),
        style,
        image_style,
        text_inhalt,
        text_style,
        stroke_color = 'white',
        style_with_text,
        style_without_text,
        $layertree_tpop_nr = $('#layertree_tpop_nr');

    // markierte: icon ist gelb
    if (selected) {
        icon = 'img/flora_icon_gelb.png';
        stroke_color = 'red';
    }

    if (verorten) {
        icon = 'img/flora_icon_rot.png';
    }

    image_style = new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 1,
        src: icon
    }));

    // text bestimmen, abhängig von der Einstellung im Layertree
    if ($layertree_tpop_nr.is(':checked')) {
        text_inhalt = feature.get('tpop_nr_label');
    } else if ($('#layertree_tpop_name').is(':checked')) {
        text_inhalt = feature.get('tpop_name');
    }

    text_style = new ol.style.Text({
        font: 'bold 11px Arial, Verdana, Helvetica, sans-serif',
        text: text_inhalt,
        fill: new ol.style.Fill({
            color: 'black'
        }),
        stroke: new ol.style.Stroke({
            color: stroke_color,
            width: 7
        })
    });

    style_with_text = new ol.style.Style({
        image: image_style,
        text: text_style
    });
    style_without_text = new ol.style.Style({
        image: image_style
    });

    // style bestimmen
    if ($layertree_tpop_nr.is(':checked')) {
        style = style_with_text;
    } else if ($('#layertree_tpop_name').is(':checked')) {
        style = style_with_text;
    } else {
        style = style_without_text;
    }

    return [style];
};

window.apf.olmap.messe = function (element) {
    'use strict';
    window.apf.olmap.deactivateMenuItems();
    if (element.value === 'line' && element.checked) {
        window.apf.olmap.addMeasureInteraction('LineString');
    } else if (element.value === 'polygon' && element.checked) {
        window.apf.olmap.addMeasureInteraction('Polygon');
    } else {
        window.apf.olmap.removeMeasureInteraction();
    }
};

window.apf.olmap.removeMeasureInteraction = function () {
    window.apf.olmap.entferneLayerNachName('messen');
    window.apf.olmap.map.removeInteraction(window.apf.olmap.drawMeasure);
    delete window.apf.olmap.drawMeasure;
    $("#ergebnisMessung").text("");
    $(window.apf.olmap.map.getViewport()).off('mousemove');
};

// erhält den Typ der Interaktion: 'Polygon' oder 'LineString'
window.apf.olmap.addMeasureInteraction = function (type) {
    // allfällige Resten entfernen
    window.apf.olmap.removeMeasureInteraction();
    // neu aufbauen
    var source = new ol.source.Vector();
    var messen_layer = new ol.layer.Vector({
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

    // Currently drawed feature
    // @type {ol.Feature}
    var sketch = null;

    // Element for currently drawed feature
    // @type {Element}
    var sketchElement;

    // handle pointer move
    // @param {Event} evt
    var mouseMoveHandler = function (evt) {
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
        }, this);
};

/**
 * format length output
 * @param {ol.geom.LineString} line
 * @return {string}
*/
window.apf.olmap.formatLength = function (line) {
    var length = Math.round(line.getLength() * 100) / 100,
        output;
    if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) + ' km';
    } else {
        output = (Math.round(length * 100) / 100) + ' m';
    }
    return output;
};

/**
 * format length output
 * @param {ol.geom.Polygon} polygon
 * @return {string}
*/
window.apf.olmap.formatArea = function (polygon) {
    var area = polygon.getArea(),
        output;
    if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) + ' km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) + ' m<sup>2</sup>';
    }
    return output;
};

window.apf.olmap.wähleAus = function () {
    window.apf.olmap.deactivateMenuItems();
    window.apf.olmap.addSelectFeaturesInSelectableLayers();
};

window.apf.olmap.schliesseLayeroptionen = function () {
    'use strict';
    $("#olmap_layertree").accordion("option", "active", false);
};

window.apf.erstelleGemeindeliste = function () {
    'use strict';
    if (!window.apf.gemeinden) {
        $.ajax({
            type: 'get',
            url: 'api/v1/gemeinden'
        }).done(function (data) {
            if (data) {
                // Gemeinden bereitstellen
                // Feld mit Daten beliefern
                var gemeinden = _.map(data, function (gemeinde) {
                    if (gemeinde.GmdName) {
                        return gemeinde.GmdName;
                    }
                });
                window.apf.gemeinden = gemeinden;
                // autocomplete-widget für Gemeinden initiieren
                $("#TPopGemeinde").autocomplete({
                    source: gemeinden,
                    delay: 0,
                    // Change-Event wird nicht ausgelöst > hier aufrufen
                    change: function (event, ui) {
                        window.apf.speichern(event.target);
                    }
                });
            }
        }).fail(function () {
            window.apf.melde("Fehler: Die Liste der Gemeinden konnte nicht bereitgestellt werden");
        });
    }
};

// wird aufgerufen, wenn der ap geändert wird
window.apf.wähleAp = function (ap_id) {
    'use strict';

    var initiiereAp = require('./modules/initiiereAp'),
        programm = $("[name='programm_wahl']:checked").attr("id"),
        ap_waehlen_text,
        placeholderText = 'Artförderprogramm wählen',
        zeigeFormular   = require('./modules/zeigeFormular'),
        waehleApliste   = require('./modules/waehleApliste');

    if (ap_id) {
        // einen AP gewählt
        localStorage.ap_id = ap_id;

        if (programm === "programm_neu") {
            // zuerst einen neuen Datensatz anlegen
            $.ajax({
                type: 'post',
                url: 'api/v1/apInsert/apId=' + ap_id + '/user=' + sessionStorage.User
            }).done(function () {
                // nachdem ein neues Programm erstellt wurde, soll nicht mehr "neu" zur Wahl stehen, sondern "alle"
                $("#programm_neu").attr("checked", false);
                $("#programm_alle").attr("checked", true);
                $("#programm_wahl").buttonset();
                // alle zwischengespeicherten aplisten löschen
                delete window.apf.apliste;
                // Auswahlliste für Programme updaten
                $.when(waehleApliste("programm_alle"))
                .then(function () {
                    // Strukturbaum updaten
                    $.when(window.apf.erstelle_tree(ap_id))
                    .then(function () {
                        // gewählte Art in Auswahlliste anzeigen
                        var ap_waehlen_text = _.find(window.apf.apliste.programm_alle, function (art) {
                            return art.id == ap_id;
                        });
                        if (ap_waehlen_text) {
                            $('#ap_waehlen').val(ap_id);
                            $('#ap_waehlen_text').val(ap_waehlen_text.label);
                        }
                        $("#ApArtId").val(ap_id);
                        // gewählte Art in Formular anzeigen
                        initiiereAp(ap_id);
                    });
                });
            }).fail(function () {
                window.apf.melde("Fehler: Keine Daten für Programme erhalten");
            });
        } else {
            window.apf.erstelle_tree(ap_id);
            $("#ap").show();
            initiiereAp(ap_id);
        }
    } else {
        // leeren Wert gewählt
        $('#ap_waehlen_text').val('');
        if (programm === 'programm_neu') placeholderText = 'Art für neues Förderprogramm wählen';
        if (programm === 'programm_ap')  placeholderText = 'Aktionsplan wählen';
        $("#ap_waehlen_text").attr('placeholder', placeholderText);
        $("#tree").hide();
        $("#suchen").hide();
        $("#exportieren_2").hide();
        $("#hilfe").hide();
        $("#ap_loeschen").hide();
        $("#exportieren_1").show();
        $("#ap").hide();
        zeigeFormular();
        history.pushState(null, null, "index.html");
    }
};

window.apf.kopiereKoordinatenInPop = function (x_koord, y_koord) {
    'use strict';
    // prüfen, ob X- und Y-Koordinaten vergeben sind
    if (x_koord > 100000 && y_koord > 100000) {
        // Koordinaten der Pop nachführen
        var update_pop = $.ajax({
            type: 'post',
            url: 'api/v1/update/apflora/tabelle=tblPopulation/tabelleIdFeld=PopId/tabelleId=' + localStorage.pop_id + '/feld=PopXKoord/wert=' + x_koord + '/user=' + sessionStorage.User
        });
        update_pop.done(function () {
            var updatePop_4 = $.ajax({
                type: 'post',
                url: 'api/v1/update/apflora/tabelle=tblPopulation/tabelleIdFeld=PopId/tabelleId=' + localStorage.pop_id + '/feld=PopYKoord/wert=' + y_koord + '/user=' + sessionStorage.User
            });
            updatePop_4.done(function () {
                $("#kopiereKoordinatenInPopRueckmeldung").fadeIn('slow');
                setTimeout(function () {
                    $("#kopiereKoordinatenInPopRueckmeldung").fadeOut('slow');
                }, 3000);
            });
            updatePop_4.fail(function () {
                window.apf.melde("Fehler: Y-Koordinate wurde nicht kopiert (die X-Koordinate offenbar schon)");
            });
        });
        update_pop.fail(function () {
            window.apf.melde("Fehler: Koordinaten wurden nicht kopiert");
        });
    } else {
        // auffordern, die Koordinaten zu vergeben und Speichern abbrechen
        window.apf.melde("Sie müssen zuerst Koordinaten erfassen", "Koordinaten nicht kopiert");
    }
};

window.apf.prüfeAnmeldung = function () {
    'use strict';
    var $anmeldung_name = $("#anmeldung_name").val(),
        $anmeldung_passwort = $("#anmeldung_passwort").val();
    // Leserechte zurücksetzen
    delete sessionStorage.NurLesen;
    if ($anmeldung_name && $anmeldung_passwort) {
        $.ajax({
            type: 'get',
            url: 'api/v1/anmeldung/name=' + $anmeldung_name + '/pwd=' + $anmeldung_passwort
        }).done(function (data) {
            if (data && data.length > 0) {
                sessionStorage.User = $anmeldung_name;
                // wenn NurLesen, globale Variable setzen
                if (data[0].NurLesen === -1) {
                    sessionStorage.NurLesen = true;
                }
                $("#anmeldung_rueckmeldung")
                    .html("Willkommen " + $anmeldung_name)
                    .addClass("ui-state-highlight");
                setTimeout(function () {
                    $("#anmelde_dialog").dialog("close", 2000);
                    if (!$('#forms').is(':visible')) {
                        $('#ap_waehlen_text').focus();
                    }
                }, 1000);
            } else {
                $("#anmeldung_rueckmeldung")
                    .html("Anmeldung gescheitert")
                    .addClass("ui-state-highlight");
                setTimeout(function () {
                    $("#anmeldung_rueckmeldung").removeClass("ui-state-highlight", 1500);
                }, 500);
            }
        }).fail(function () {
            window.apf.melde("Anmeldung gescheitert", "Oops!");
        });
    } else {
        $("#anmeldung_rueckmeldung")
            .html("Bitte Name und Passwort ausfüllen")
            .addClass( "ui-state-highlight" );
        setTimeout(function () {
            $("#anmeldung_rueckmeldung").removeClass("ui-state-highlight", 1500);
        }, 500);
    }
};

// erwartet aktuelle Werte für jahr und typ
// erstellt den label für den Baum
window.apf.erstelleLabelFürFeldkontrolle = function (jahr, typ) {
    'use strict';
    if (typeof jahr === "undefined") {
        jahr = "(kein Jahr)";
    }
    if (typeof typ === "undefined") {
        typ = "(kein Typ)";
    }
    return jahr + ": " + typ;
};

// erwartet aktuelle Werte für jahr und beurteilung
// erstellt den label für den Baum
window.apf.erstelleLabelFürMassnahme = function (jahr, beurteilung) {
    'use strict';
    if (typeof jahr === "undefined") {
        jahr = "(kein Jahr)";
    }
    if (typeof beurteilung === "undefined") {
        beurteilung = "(keine Beurteilung)";
    }
    return jahr + ": " + beurteilung;
};

// gibt HTML zurück, mit dem die Informationen über eine Beobachtung dargestellt werden
// erwartet die Daten der Beobachtung
window.apf.erstelleFelderFürBeob = function (data, beobtyp) {
    'use strict';
    // Titel für Beob im Formular erstellen
    var beobtitel = "<h1>Informationen aus ";
    if (beobtyp === "infospezies") {
        beobtitel += "Info Spezies";
    } else {
        beobtitel += "EvAB";
    }
    beobtitel += " (nicht veränderbar)</h1>";
    // Beob-Felder dynamisch aufbauen
    var html_beobfelder = "<table>",
        html_beobfeld,
        nichtAnzuzeigendeFelder = ["NO_ISFS", "ESPECE", "CUSTOM_TEXT_5_", "OBJECTID", "FNS_GISLAYER", "FNS_ISFS", "ID", "FNS_JAHR", "NOM_COMPLET", "FAMILLE"];
    $.each(data, function (index, value) {
        if ((value || value === 0) && nichtAnzuzeigendeFelder.indexOf(index) === -1) {
            // TODO: Zahlen, text und Memofelder unterscheiden
            // TODO: Felder durch externe Funktion erstellen lassen
            // ID: beobfelder_ voranstellen, um Namens-Kollisionen zu vermeiden
            html_beobfeld = '<tr class="fieldcontain"><td class="label" style="padding-bottom:3px;"><label for="beobfelder_';
            html_beobfeld += index;
            html_beobfeld += '">';
            html_beobfeld += index;
            html_beobfeld += ':</label></td><td class="Datenfelder" style="padding-bottom:3px;"><input id="beobfelder_';
            html_beobfeld += index;
            html_beobfeld += '" class="Datenfelder" type="text" readonly="readonly" value="';
            html_beobfeld += value;
            html_beobfeld += '""></td></tr>';
            html_beobfelder += html_beobfeld;
        }
    });
    html_beobfelder += "</table>";
    return beobtitel + html_beobfelder;
};

// in DOM-Objekten sind viele ID's der Name des DOM-Elements vorangestellt, damit die ID eindeutig ist
// ACHTUNG auf die Reihenfolge der Ersatzbefehle. Sonst wird z.B. in 'tpopber' 'popber' ersetzt und es bleibt 't'
window.apf.erstelleIdAusDomAttributId = function (domAttributId) {
    'use strict';
    if (!domAttributId) return null;
    var returnWert = domAttributId.replace('ap_ordner_pop', '').replace('ap_ordner_apziel', '').replace('ap_ordner_erfkrit', '').replace('ap_ordner_jber', '').replace('ap_ordner_ber', '').replace('ap_ordner_beob_nicht_beurteilt', '').replace('ap_ordner_beob_nicht_zuzuordnen', '').replace('idealbiotop', '').replace('ap_ordner_assozarten', '').replace('tpop_ordner_massnber', '').replace('tpop_ordner_massn', '').replace('tpopmassnber', '').replace('pop_ordner_massnber', '').replace('popmassnber', '').replace('tpop_ordner_feldkontr', '').replace('tpop_ordner_freiwkontr', '').replace('tpopfreiwkontr', '').replace('tpop_ordner_tpopber', '').replace('tpopber', '').replace('pop_ordner_popber', '').replace('popber', '').replace('tpop_ordner_beob_zugeordnet', '').replace('beob', '').replace('ber', '');

    if (domAttributId == returnWert && parseInt(returnWert) && parseInt(returnWert) != returnWert) {
        console.log('window.apf.erstelleIdAusDomAttributId meldet: erhalten ' + domAttributId + ', zurückgegeben: ' + returnWert + '. Die Regel in der function muss wohl angepasst werden');
    }

    return returnWert;
};

window.apf.zeigeBeobKoordinatenImGisBrowser = function () {
    'use strict';
    var URL,
        target,
        $beobfelder_FNS_XGIS = $("#beobfelder_FNS_XGIS"),
        $beobfelder_FNS_YGIS = $("#beobfelder_FNS_YGIS"),
        $beobfelder_COORDONNEE_FED_E = $("#beobfelder_COORDONNEE_FED_E"),
        $beobfelder_COORDONNEE_FED_N = $("#beobfelder_COORDONNEE_FED_N"),
        $TPopXKoord = $("#TPopXKoord"),
        $TPopYKoord = $("#TPopYKoord"),
        $PopXKoord = $("#PopXKoord"),
        $PopYKoord = $("#PopYKoord");
    if ($beobfelder_FNS_XGIS.val() && $beobfelder_FNS_YGIS.val()) {
        URL = "//www.maps.zh.ch/?x=" + $beobfelder_FNS_XGIS.val() + "&y=" + $beobfelder_FNS_YGIS.val() + "&scale=3000&markers=ring";
        window.open(URL, target="_blank");
    } else if ($beobfelder_COORDONNEE_FED_E.val() && $beobfelder_COORDONNEE_FED_N.val()) {
        URL = "//www.maps.zh.ch/?x=" + $beobfelder_COORDONNEE_FED_E.val() + "&y=" + $beobfelder_COORDONNEE_FED_N.val() + "&scale=3000&markers=ring";
        window.open(URL, target="_blank");
    } else if ($TPopXKoord.val() && $TPopYKoord.val()) {
        URL = "//www.maps.zh.ch/?x=" + $TPopXKoord.val() + "&y=" + $TPopYKoord.val() + "&scale=3000&markers=ring";
        window.open(URL, target="_blank");
    } else if ($PopXKoord.val() && $PopYKoord.val()) {
        URL = "//www.maps.zh.ch/?x=" + $PopXKoord.val() + "&y=" + $PopYKoord.val() + "&scale=3000&markers=ring";
        window.open(URL, target="_blank");
    } else {
        window.apf.melde("Fehler: Keine Koordinaten zum Anzeigen", "Aktion abgebrochen");
    }
};

// retourniert die Beschriftung für TPop auf Karten
// Wenn TPop mit ihrer Nummer beschriftet sein sollen
// tpop_nr und pop_nr wird übernommen
window.apf.beschrifteTPopMitNrFürKarte = function (pop_nr, tpop_nr) {
    'use strict';
    var tpop_beschriftung;
    pop_nr = pop_nr || "?";
    if (tpop_nr) {
        tpop_beschriftung = pop_nr + "/" + tpop_nr;
    } else {
        tpop_beschriftung = pop_nr + "/?";
    }
    return tpop_beschriftung;
};

//öffnet ein modal und teilt etwas mit
window.apf.melde = function (meldung, title) {
    'use strict';
    var title = title || ' ';
    $("#Meldung")
        .html(meldung)
        .attr('title', title)
        .dialog({
            modal: true,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }
        });
};

// zeigt während 25 Sekunden einen Hinweis an und einen Link, mit dem eine Aktion rückgängig gemacht werden kann
// erwartet die Mitteilung, was passiert ist
window.apf.frageObAktionRückgängigGemachtWerdenSoll = function (wasIstPassiert) {
    'use strict';
    // Hinweis zum rückgängig machen anzeigen
    $("#undelete_div").html(wasIstPassiert + " <a href='#' id='undelete'>Rückgängig machen?</a>");
    $(".undelete").show();
    if ($( window ).width() > 1000) {
        $("#forms").css("top", "37px");
    }
    setTimeout(function () {
        $("#undelete_div").html("");
        $(".undelete").hide();
        $("#forms").css("top", "");
    }, 30000);
};


// Baut einen neuen Knoten auf derselben Hierarchiestufe, von welcher der Befehl aufgerufen wurde
window.apf.insertNeuenNodeAufGleicherHierarchiestufe = function (aktiver_node, parent_node, strukturtyp, ds_id, beschriftung) {
    'use strict';
    var NeuerNode,
        initiiereFormularMitStrukturtyp = require('./modules/initiiereFormularMitStrukturtyp');
    // id global verfügbar machen
    localStorage[strukturtyp + "_id"] = ds_id;
    // letzte globale Variable entfernen
    delete window.apf[strukturtyp];
    // neuen Node bauen
    NeuerNode = $.jstree._reference(parent_node).create_node(parent_node, "last", {
        "data": beschriftung,
        "attr": {
            "id": ds_id,
            "typ": strukturtyp
        }
    });
    // allfällige Unterordner anlegen
    if (strukturtyp === "pop") {
        window.apf.insertOrdnerVonPop(NeuerNode, ds_id);
    }
    if (strukturtyp === "tpop") {
        window.apf.insertOrdnerVonTPop(NeuerNode, ds_id);
    }
    if (strukturtyp === "apziel") {
        $.jstree._reference(NeuerNode).create_node(NeuerNode, "last", {
            "data": "0 Ziel-Berichte",
            "attr": {
                "id": ds_id,
                "typ": "zielber_ordner"
            }
        });
    }

    // Parent Node-Beschriftung: Anzahl anpassen
    if (strukturtyp === "apziel") {
        var grandparent_node = $.jstree._reference(parent_node)._get_parent(parent_node);
        // grandparent Node-Beschriftung: Anzahl anpassen
        window.apf.beschrifte_ordner_apziel(grandparent_node);
        // parent Node-Beschriftung: Anzahl anpassen
        // nur, wenn es nicht der Ordner ist, der "neue AP-Ziele" heisst
        if ($.jstree._reference(parent_node).get_text(parent_node) !== "neue AP-Ziele") {
            window.apf.beschrifte_ordner_apzieljahr(parent_node);
        }
    } else {
        // Normalfall
        window.apf["beschrifte_ordner_"+strukturtyp](parent_node);
    }
    
    // node selecten
    $.jstree._reference(aktiver_node).deselect_all();
    $.jstree._reference(NeuerNode).select_node(NeuerNode);
    // Formular initiieren
    initiiereFormularMitStrukturtyp(strukturtyp);
};

// Baut einen neuen Knoten auf der näcshttieferen Hierarchiestufe, als der Befehl aufgerufen wurde
// parent_node wird nur von Strukturtyp apziel benutzt
window.apf.insertNeuenNodeEineHierarchiestufeTiefer = function (aktiver_node, parent_node, strukturtyp, ds_id, beschriftung) {
    'use strict';
    var NeuerNode,
        initiiereFormularMitStrukturtyp = require('./modules/initiiereFormularMitStrukturtyp');
    // id global verfügbar machen
    localStorage[strukturtyp + "_id"] = ds_id;
    // letzte globale Variable entfernen
    delete window.apf[strukturtyp];
    if (strukturtyp === "apziel" && localStorage.apziel_von_ordner_apziel) {
        // localStorage.apziel_von_ordner_apziel sagt: apziel wird vom ordner_apziel aus angelegt > temporären Unterordner anlegen
        var neue_apziele_node = $.jstree._reference(aktiver_node).create_node(aktiver_node, "last", {
            "data": "neue AP-Ziele",
            "attr": {
                "id": window.apf.erstelleIdAusDomAttributId($(aktiver_node).attr("id")),
                "typ": "apzieljahr"
            }
        });
        // darunter neuen Node bauen
        NeuerNode = $.jstree._reference(neue_apziele_node).create_node(neue_apziele_node, "last", {
            "data": beschriftung,
            "attr": {
                "id": ds_id,
                "typ": strukturtyp
            }
        });
        delete localStorage.apziel_von_ordner_apziel;
    } else {
        // Normalfall
        // neuen Node bauen
        NeuerNode = $.jstree._reference(aktiver_node).create_node(aktiver_node, "last", {
            "data": beschriftung,
            "attr": {
                "id": ds_id,
                "typ": strukturtyp
            }
        });
    }
    // allfällige Unterordner anlegen
    if (strukturtyp === "pop") {
        window.apf.insertOrdnerVonPop(NeuerNode, ds_id);
    }
    if (strukturtyp === "tpop") {
        window.apf.insertOrdnerVonTPop(NeuerNode, ds_id);
    }
    if (strukturtyp === "apziel") {
        $.jstree._reference(NeuerNode).create_node(NeuerNode, "last", {
            "data": "0 Ziel-Berichte",
            "attr": {
                "id": ds_id,
                "typ": "zielber_ordner"
            }
        });
        // im create_node-Event von jstree wird Jahr eingefügt und gespeichert
    }
    // Node-Beschriftung: Anzahl anpassen
    if (strukturtyp === "apziel" && localStorage.apziel_von_apzieljahr) {
        // hier ist ein Ordner zwischengeschaltet
        // Parent Node-Beschriftung: Anzahl anpassen, wenns nicht der neue Ordner ist
        if ($.jstree._reference(parent_node).get_text(parent_node) !== "neue AP-Ziele") {
            window.apf.beschrifte_ordner_apziel(parent_node);
        }
        // aktiver Node-Beschriftung: Anzahl anpassen
        window.apf.beschrifte_ordner_apzieljahr(aktiver_node);
        delete localStorage.apziel_von_apzieljahr;
    } else if (strukturtyp !== "jber_uebersicht") {
        window.apf["beschrifte_ordner_"+strukturtyp](aktiver_node);
    }
    // node selecten
    $.jstree._reference(aktiver_node).deselect_all();
    $.jstree._reference(NeuerNode).select_node(NeuerNode);
    // Formular initiieren
    initiiereFormularMitStrukturtyp(strukturtyp);
};

// erstellt alle Unterordner des Ordners vom Typ pop
// erwartet den node des pop-ordners
window.apf.insertOrdnerVonPop = function (pop_node, pop_id) {
    'use strict';
    $.jstree._reference(pop_node).create_node(pop_node, "last", {
        "data": "Teilpopulationen",
        "attr": {
            "id": pop_id,
            "typ": "pop_ordner_tpop"
        }
    });
    $.jstree._reference(pop_node).create_node(pop_node, "last", {
        "data": "Populations-Berichte",
        "attr": {
            "id": pop_id,
            "typ": "pop_ordner_popber"
        }
    });
    $.jstree._reference(pop_node).create_node(pop_node, "last", {
        "data": "Massnahmen-Berichte",
        "attr": {
            "id": pop_id,
            "typ": "pop_ordner_massnber"
        }
    });
};

// erstellt alle Unterordner des Ordners vom Typ tpop
// erwartet den node des tpop-ordners
window.apf.insertOrdnerVonTPop = function (TPopNode, tpop_id) {
    'use strict';
    $.jstree._reference(TPopNode).create_node(TPopNode, "last", {
        "data": "Massnahmen",
        "attr": {
            "id": tpop_id,
            "typ": "tpop_ordner_massn"
        }
    });
    $.jstree._reference(TPopNode).create_node(TPopNode, "last", {
        "data": "Massnahmen-Berichte",
        "attr": {
            "id": tpop_id,
            "typ": "tpop_ordner_massnber"
        }
    });
    $.jstree._reference(TPopNode).create_node(TPopNode, "last", {
        "data": "Feldkontrollen",
        "attr": {
            "id": tpop_id,
            "typ": "tpop_ordner_feldkontr"
        }
    });
    $.jstree._reference(TPopNode).create_node(TPopNode, "last", {
        "data": "Freiwilligen-Kontrollen",
        "attr": {
            "id": tpop_id,
            "typ": "tpop_ordner_freiwkontr"
        }
    });
    $.jstree._reference(TPopNode).create_node(TPopNode, "last", {
        "data": "Teilpopulations-Berichte",
        "attr": {
            "id": tpop_id,
            "typ": "tpop_ordner_tpopber"
        }
    });
    $.jstree._reference(TPopNode).create_node(TPopNode, "last", {
        "data": "Beobachtungen",
        "attr": {
            "id": tpop_id,
            "typ": "tpop_ordner_beob_zugeordnet"
        }
    });
};

window.apf.löscheAp = function (ap_id) {
    'use strict';
    var $ap_waehlen_text = $("#ap_waehlen_text"),
        zeigeFormular = require('./modules/zeigeFormular');

    //Variable zum rückgängig machen erstellen
    window.apf.deleted = window.apf;
    window.apf.deleted.typ = "ap";
    //Artname in Textform merken
    window.apf.deleted.Artname = $ap_waehlen_text.val();
    $.ajax({
        type: 'delete',
        url: 'api/v1/apflora/tabelle=tblAktionsplan/tabelleIdFeld=ApArtId/tabelleId=' + ap_id
    }).done(function () {
        var $exportieren_2 = $("#exportieren_2");
        delete localStorage.ap_id;
        delete window.apf.ap;
        delete localStorage.ap;
        // alle zwischengespeicherten aplisten löschen
        delete window.apf.apliste;
        $("#programm_neu")
            .attr("checked", false)
            .trigger('change');
        $("#programm_alle")
            .attr("checked", true)
            .trigger('change');
        $("#programm_wahl")
            .buttonset();
        //$("#programm_wahl").buttonset('refresh');
        window.apf.erstelleApliste("programm_alle");
        $('#ap_waehlen').val('');
        $ap_waehlen_text.val('');
        $ap_waehlen_text.attr('placeholder', 'Artförderprogramm wählen');
        $("#tree").hide();
        $("#suchen").hide();
        $exportieren_2.hide();
        $("#hilfe").hide();
        $("#ap_loeschen").hide();
        $exportieren_2.show();
        $("#ap").hide();
        $("#forms").hide();
        //Hinweis zum rückgängig machen anzeigen
        window.apf.frageObAktionRückgängigGemachtWerdenSoll("Das Programm der Art '" + window.apf.deleted.Artname + "' wurde gelöscht.");
        //Artname wird nicht mehr gebraucht und soll später nicht in Datensatz eingefügt werden
        delete window.apf.deleted.Artname;
        //forms muss eingeblendet sein, weil undelete_div darin ist
        zeigeFormular("keines");
    }).fail(function () {
        window.apf.melde("Fehler: Das Programm wurde nicht gelöscht");
    });
};

window.apf.undeleteDatensatz = function () {
    require('./modules/undeleteDatensatz')();
};

window.apf.olmap.exportiereKarte = function (event) {
    'use strict';
    var exportPNGElement = document.getElementById('olmap_exportieren');
    if ('download' in exportPNGElement) {
          exportPNGElement.addEventListener('click', function (e) {
            window.apf.olmap.map.once('postcompose', function (event) {
                var canvas = event.context.canvas;
                exportPNGElement.href = canvas.toDataURL('image/png');
            });
            window.apf.olmap.map.renderSync();
          }, false);
        if (!window.apf.olmap.recentlyClicked) {
            // beim ersten mal soll der Event gleich wiederholt werden
            window.apf.olmap.recentlyClicked = true;
            // warten, sonst kommen zwei Downloads
            setTimeout(function () {
                exportPNGElement.click();
            }, 200);
        }
    } else {
        var info = 'Der Download ist nur möglich, wenn Ihr Browser das moderne Download-Attribut unterstützt <a href="http://caniuse.com/#feat=download">(hier eine aktuelle Liste der unterstützenden Browser)</a>';
        window.apf.melde(info, "Export abgebrochen");
    }
};

// hier behalten, damit $ eingefügt werden kann
window.apf.treeKontextmenu = function (node) {
    return require('./modules/treeKontextmenu') ($, node);
};

// damit kann man die verbleibende Anzahl Zeichen, die in einem Feld erfasst werden, anzeigen
// Quelle: https://www.scriptiny.com/2012/09/jquery-input-textarea-limiter/
(function ($) {
    $.fn.extend( {
        limiter: function (limit, elem) {
            $(this).on("keyup focus", function () {
                setCount(this, elem);
            });
            function setCount(src, elem) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
                elem.html(limit - chars);
            }
            setCount($(this)[0], elem);
        }
    });
})(jQuery);

// erstellt einen guid
// Quelle: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
window.apf.erstelleGuid = function () {
    'use strict';
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};