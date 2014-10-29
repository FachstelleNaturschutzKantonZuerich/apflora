/**
 * Konvertiert Projektionen
 * @return {number}
 */

/*jslint node: true, browser: true */
'use strict';


module.exports = function (Breite) {
    var BreiteGrad = Math.floor(Breite),
        BreiteMin  = Math.floor((Breite - BreiteGrad) * 60);

    return Math.round((((Breite - BreiteGrad) - (BreiteMin / 60)) * 60 * 60) * 100) / 100;
};