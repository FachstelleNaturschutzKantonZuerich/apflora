'use strict'

module.exports = () => {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name=viewport content="width=device-width, initial-scale=1">
    <link rel="SHORTCUT ICON" href="img/favicon.ico">
    <link rel="stylesheet" href="style/jquery-ui.css">
    <link rel="stylesheet" href="app.css">
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="src/jquery.js" type="text/javascript"><\/script>')</script>
    <script src="https://maps.googleapis.com/maps/api/js"></script>
    <script src="http://api3.geo.admin.ch/loader.js?lang=de"></script>
    <!--script src="http://api3.geo.admin.ch/loader.js?lang=de&mode=debug"></script-->
    <script src="src/apflora.js"></script>
    <script src="src/jquery.jstree.js"></script>
    <script src="src/list.js"></script>
    <title>AP Flora Kt ZH</title>
  </head>
  <body>
    <div id="wrapper">
      <fieldset id="menu">
        <div class='fieldcontain' style="margin-right:5px; margin-bottom:5px; position:relative;">
          <input type="text" id="apWaehlenText" style="width:100%; font-size:17px; box-sizing:border-box; padding-right:20px;" placeholder="Artförderprogramm wählen">
          <div id="apWaehlenTextLoeschen" class="ui-icon ui-icon-closethick" style="position:absolute;top:5px;right:4px;cursor:pointer;"></div>
          <input type="number" id="apWaehlen" style="display:none">
        </div>
        <div class='fieldcontain' style="margin-top:3px; margin-bottom:3px;">
          <label for="programmWahl" style="color:#6F6F66; margin-right:5px; overflow:hidden;">Programme:</label>
          <span id="programmWahl" style="display:none;">
            <input type="radio" id="programmAlle" name="programmWahl" checked="checked">
            <label for="programmAlle">alle</label>
            <input type="radio" id="programmAp" name="programmWahl">
            <label for="programmAp">Aktionspläne</label>
            <input type="radio" id="programmNeu" name="programmWahl">
            <label for="programmNeu">neu</label>
          </span>
          <button id="apLoeschen" style="margin-left:6px; display:none;">löschen</button>
          <button id="exportieren1" class="exportieren" style="margin-left:6px;">exportieren</button>
        </div>
        <input type="search" id="suchen" placeholder="suchen">
        <button id="exportieren2" class="exportieren" style="margin-left:6px; display:none;">exportieren</button>
        <div id="tree" style="margin-bottom:5px;"></div>
        <div id="hilfe" style="font-size:80%; color:#6F6F66; display:none;">Für Menüs: mit rechter Maustaste im Strukturbaum klicken<a href="https://github.com/FNSKtZH/apflora/wiki" class="ui-icon ui-icon-info" style="float:right;" target="_blank" title="Infos über apflora.ch"></a></div>
      </fieldset>

      <fieldset id="undeleteDiv" class="undelete"></fieldset>

      <fieldset id="forms" style="display:none;">
        <div id="formsTitelzeile" class="undelete" style="margin:0 0 0 0; line-height:27px; padding: 0 7px 0 9px; height:auto; display:none;">
          <div id="testartDiv" style="font-weight:bold; color:#196319; float:left; padding-right:7px;"></div>
        </div>

        <form id="qualitaetskontrollen" class="form" action="#" method="get" autocomplete="off">
          <div style="display:inline-block;">
            <div class='fieldcontain' style="margin-right:5px; margin-bottom:5px; position:relative;">
              <input class="search" placeholder="suchen" >
              <div id="qkSearchEmpty" class="ui-icon ui-icon-closethick" style="position:absolute;top:5px;left:185px;cursor:pointer;"></div>
            </div>
          </div>
          <button class="sort" data-sort="hw" role="button">nach Problem sortieren</button>
          <button class="qkRefresh" role="button">nach Strukturtyp sortieren</button>
          <button id="qkRefresh" class="qkRefresh" role="button">erneut prüfen</button><br>
          <label for='qkBerichtjahr'>Berichtjahr:</label>
          <input id="qkBerichtjahr" type="number" style="width:65px;">
          <ul class="list"></ul>
        </form>

        <form id="ap" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class="fieldcontain">
              <td class="label">
                <label for='ApArtwert'>Art:</label>
              </td>
              <td class="Datenfelder">
                <input id="Artname" name="Artname" formular="ap" type="text" readonly="readonly" style="font-weight: bold">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='ApStatus' class='apf-with-tooltip erforderlich'>
                  <span>Aktionsplan:</span>
                </label>
                <div class="tooltiptext">
                  <table>
                    <tr class='apf-tr-with-border-bottom'>
                      <td>keiner:</td>
                      <td>kein Aktionsplan vorgesehen</td>
                    </tr>
                    <tr>
                      <td>erstellt:</td>
                      <td>Aktionsplan fertig, auf der Website der FNS</td>
                    </tr>
                  </table>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="ApStatus" id="ApStatus0" class="speichern" formular="ap" value="0">
                <label for="ApStatus0">(kein Eintrag)</label><br>
                <input type="radio" name="ApStatus" id="ApStatus4" class="speichern" formular="ap" value="4">
                <label for="ApStatus4">keiner</label><br>
                <input type="radio" name="ApStatus" id="ApStatus1" class="speichern" formular="ap" value="1">
                <label for="ApStatus1">vorgesehen</label><br>
                <input type="radio" name="ApStatus" id="ApStatus2" class="speichern" formular="ap" value="2">
                <label for="ApStatus2">in Bearbeitung</label><br>
                <input type="radio" name="ApStatus" id="ApStatus3" class="speichern" formular="ap" value="3">
                <label for="ApStatus3">erstellt</label>
              <td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='ApJahr'>Start im Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="ApJahr" name="ApJahr" class="speichern" formular="ap" type="number">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='ApUmsetzung' class='apf-with-tooltip'>
                  <span>Stand Umsetzung:</span>
                </label>
                <div class="tooltiptext">
                  <table>
                    <tr class='apf-tr-with-border-bottom'>
                      <td>noch keine Umsetzung:</td>
                      <td>noch keine Massnahmen ausgeführt</td>
                    </tr>
                    <tr>
                      <td>in Umsetzung:</td>
                      <td>bereits Massnahmen ausgeführt (auch wenn AP noch nicht erstellt)</td>
                    </tr>
                  </table>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="ApUmsetzung" class="speichern" formular="ap" id="ApUmsetzung0" value="0">
                <label for="ApUmsetzung0">noch keine Umsetzung</label><br>
                <input type="radio" name="ApUmsetzung" class="speichern" formular="ap" id="ApUmsetzung1" value="1">
                <label for="ApUmsetzung1">in Umsetzung</label><br>
                <input type="radio" name="ApUmsetzung" class="speichern" formular="ap" id="ApUmsetzung2" value="2">
                <label for="ApUmsetzung2">umgesetzt</label>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='ApBearb'>Verantwortlich:</label>
              </td>
              <td class="Datenfelder">
                <select id="ApBearb" name="ApBearb" class="speichern" formular="ap">
                  <option></option>
                </select>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='ApArtwert'>Artwert:</label>
              </td>
              <td class="Datenfelder">
                <input id="ApArtwert" name="ApArtwert" class="speichern" formular="ap" type="text" readonly="readonly">
              </td>
            </tr>
          </table>
        </form>

        <form id="pop" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class="fieldcontain">
              <td class="label">
                <label for='PopNr'>Nr.:</label>
              </td>
              <td class="Datenfelder">
                <input id="PopNr" name="PopNr" class="speichern" formular="pop" type="number">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='PopName' class='apf-with-tooltip erforderlich'>
                  <span>Name:</span>
                </label>
                <div class="tooltiptext">
                  <p>Dieses Feld möglichst immer ausfüllen</p>
                </div>
              </td>
              <td class="Datenfelder">
                <input id="PopName" name="PopName" class="speichern" formular="pop" type="text" maxlength="150">
                <div id="PopName_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='PopHerkunft' class='apf-with-tooltip erforderlich'>
                  <span>Status:</span>
                </label>
                <div class="tooltiptext">
                  <p>Dieses Feld immer ausfüllen</p>
                </div>
              </td>
              <td class="Datenfelder">
                <div class="herkunft">
                  <div class="herkunftspalte">
                    <h4>ursprünglich</h4>
                    <div>
                      <input type="radio" name="PopHerkunft" id="PopHerkunft100" class="speichern" formular="pop" value="100">
                      <label for="PopHerkunft100">aktuell</label>
                    </div>
                    <div>
                      <input type="radio" name="PopHerkunft" id="PopHerkunft101" class="speichern" formular="pop" value="101">
                      <label for="PopHerkunft101">erloschen</label>
                    </div>
                  </div>
                  <div class="herkunftspalte">
                    <h4>angesiedelt</h4>
                    <div>
                      <input type="radio" name="PopHerkunft" id="PopHerkunft200" class="speichern" formular="pop" value="200">
                      <label for="PopHerkunft200">aktuell</label>
                    </div>
                    <div>
                      <input type="radio" name="PopHerkunft" id="PopHerkunft201" class="speichern" formular="pop" value="201">
                      <label for="PopHerkunft201">Ansaatversuch</label>
                    </div>
                    <div>
                      <input type="radio" name="PopHerkunft" id="PopHerkunft211" class="speichern" formular="pop" value="211">
                      <label for="PopHerkunft211">erloschen /<br>nicht etabliert</label>
                    </div>
                  </div>
                  <div class="herkunftspalte">
                    <h4>potenziell</h4>
                    <div>
                      <input type="radio" name="PopHerkunft" id="PopHerkunft300" class="speichern" formular="pop" value="300">
                      <label for="PopHerkunft300">potenzieller Wuchs-/<br>Ansiedlungsort</label>
                    </div>
                  </div>
                  <div class="herkunftspalte">
                    <h4>bekannt seit</h4>
                    <div>
                      <input id="PopBekanntSeit" name="PopBekanntSeit" class="speichern apf-with-tooltip erforderlich" formular="pop" type="number">
                      <div class="tooltiptext">
                      <p>Dieses Feld möglichst immer ausfüllen</p>
                    </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='PopHerkunftUnklar' class='apf-with-tooltip'>
                  <span>Status unklar:</span>
                </label>
                <div class="tooltiptext">
                  <p>Will heissen: Die Aussage zum Status ist unsicher<br>Bitte auch einen Status wählen</p>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="checkbox" name="PopHerkunftUnklar" id="PopHerkunftUnklar" class="speichern" formular="pop" value="1">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='PopHerkunftUnklarBegruendung'>Begründung:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="PopHerkunftUnklarBegruendung" id="PopHerkunftUnklarBegruendung" class="speichern" formular="pop" placeholder="...für unklaren Status" maxlength="255"></textarea>
                <div id="PopHerkunftUnklarBegruendung_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='PopXKoord'>X-Koordinaten:</label>
              </td>
              <td class="Datenfelder">
                <input id="PopXKoord" name="PopXKoord" class="speichern" formular="pop" type="number">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='PopYKoord'>Y-Koordinaten:</label>
              </td>
              <td class="Datenfelder">
                <input id="PopYKoord" name="PopYKoord" class="speichern" formular="pop" type="number">
              </td>
            </tr>
          </table>
        </form>

        <form id="tpop" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopNr'>Nr.:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopNr" name="TPopNr" class="speichern" formular="tpop" type="number">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopFlurname' class='apf-with-tooltip erforderlich'>
                  <span>Flurname:</span>
                </label>
                <div class="tooltiptext">
                  <p>Dieses Feld möglichst immer ausfüllen</p>
                </div>
              </td>
              <td class="Datenfelder">
                <input id="TPopFlurname" name="TPopFlurname" class="speichern" formular="tpop" type="text" maxlength="255">
                <div id="TPopFlurname_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopHerkunft' class='apf-with-tooltip erforderlich'>
                  <span>Status:</span>
                </label>
                <div class="tooltiptext">
                  <p>Dieses Feld immer ausfüllen</p>
                </div>
              </td>
              <td class="Datenfelder">
                <div class="herkunft">
                  <div class="herkunftspalte">
                    <h4>ursprünglich</h4>
                    <div>
                      <input type="radio" name="TPopHerkunft" id="TPopHerkunft100" class="speichern" formular="tpop" value="100">
                      <label for="TPopHerkunft100">aktuell</label>
                    </div>
                    <div>
                      <input type="radio" name="TPopHerkunft" id="TPopHerkunft101" class="speichern" formular="tpop" value="101">
                      <label for="TPopHerkunft101">erloschen</label>
                    </div>
                  </div>
                  <div class="herkunftspalte">
                    <h4>angesiedelt</h4>
                    <div>
                      <input type="radio" name="TPopHerkunft" id="TPopHerkunft200" class="speichern" formular="tpop" value="200">
                      <label for="TPopHerkunft200">aktuell</label>
                    </div>
                    <div>
                      <input type="radio" name="TPopHerkunft" id="TPopHerkunft201" class="speichern" formular="tpop" value="201">
                      <label for="TPopHerkunft201">Ansaatversuch</label>
                    </div>
                    <div>
                      <input type="radio" name="TPopHerkunft" id="TPopHerkunft211" class="speichern" formular="tpop" value="211">
                      <label for="TPopHerkunft211">erloschen /<br>nicht etabliert</label>
                    </div>
                  </div>
                  <div class="herkunftspalte">
                    <h4>potenziell</h4>
                    <div>
                      <input type="radio" name="TPopHerkunft" id="TPopHerkunft300" class="speichern" formular="tpop" value="300">
                      <label for="TPopHerkunft300">potenzieller Wuchs-/<br>Ansiedlungsort</label>
                    </div>
                  </div>
                  <div class="herkunftspalte">
                    <h4>bekannt seit</h4>
                    <div>
                      <input id="TPopBekanntSeit" name="TPopBekanntSeit" class="speichern apf-with-tooltip erforderlich" formular="tpop" type="number">
                      <div class="tooltiptext">
                      <p>Dieses Feld möglichst immer ausfüllen</p>
                    </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopHerkunftUnklar' class='apf-with-tooltip'>
                  <span>Status unklar:</span>
                </label>
                <div class="tooltiptext">
                  <p>Will heissen: Die Aussage zum Status ist unsicher<br>Bitte auch einen Status wählen</p>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="checkbox" name="TPopHerkunftUnklar" id="TPopHerkunftUnklar" class="speichern" formular="tpop" value="1">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopHerkunftUnklarBegruendung'>Begründung:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="TPopHerkunftUnklarBegruendung" id="TPopHerkunftUnklarBegruendung" class="speichern" formular="tpop" placeholder="...für unklaren Status" maxlength="255"></textarea>
                <div id="TPopHerkunftUnklarBegruendung_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopApBerichtRelevant' class='apf-with-tooltip erforderlich'>
                  <span>Für AP-Bericht<br>relevant?</span>
                </label>
                <div class="tooltiptext">
                  <p>Dieses Feld möglichst immer ausfüllen</p>
                  <table>
                    <tr class='apf-tr-with-border-bottom'>
                      <td>nein (historisch):</td>
                      <td>vor 1950 ohne Kontrolle (historisch = erloschen)</td>
                    </tr>
                    <tr>
                      <td>nein (kein Vorkommen):</td>
                      <td>siehe bei Populationen "überprüft kein Vorkommen"</td>
                    </tr>
                  </table>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="TPopApBerichtRelevant" id="TPopApBerichtRelevant1" class="speichern" formular="tpop" value="1">
                <label for="TPopApBerichtRelevant1">ja</label><br>
                <input type="radio" name="TPopApBerichtRelevant" id="TPopApBerichtRelevant2" class="speichern" formular="tpop" value="2">
                <label for="TPopApBerichtRelevant2">nein (historisch)</label><br>
                <input type="radio" name="TPopApBerichtRelevant" id="TPopApBerichtRelevant3" class="speichern" formular="tpop" value="3">
                <label for="TPopApBerichtRelevant3">nein (ausserkantonal)</label><br>
                <input type="radio" name="TPopApBerichtRelevant" id="TPopApBerichtRelevant5" class="speichern" formular="tpop" value="5">
                <label for="TPopApBerichtRelevant5">nein (kein Vorkommen)</label>
              </td>
            </tr>
            <tr class='fieldcontain TPopGemeinde'>
              <td class="label">
                <label for='TPopGemeinde'>Gemeinde:</label>
              </td>
              <td class="Datenfelder">
                <Input id="TPopGemeinde" name="TPopGemeinde" class="speichern" formular="tpop" type="text" maxlength="255">
                <div id="TPopGemeinde_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopXKoord'>X-Koordinaten:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopXKoord" name="TPopXKoord" class="speichern" formular="tpop" type="number">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopYKoord'>Y-Koordinaten:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopYKoord" name="TPopYKoord" class="speichern" formular="tpop" type="number">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
              </td>
              <td class="Datenfelder">
                <button id="kopiereKoordinatenInPop" type="button" style="float:left;">Koordinaten in die Population kopieren</button>
                <div id="kopiereKoordinatenInPopRueckmeldung" style="display:none; line-height:26px; margin-left:35px;">&nbsp;&nbsp;Koordinaten kopiert</div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopRadius'>Radius (m):</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopRadius" name="TPopRadius" class="speichern" formular="tpop" type="number">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopHoehe'>Höhe (m.ü.M.):</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopHoehe" name="TPopHoehe" class="speichern" formular="tpop" type="number">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopExposition'>Exposition,<br>Besonnung:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopExposition" name="TPopExposition" class="speichern" formular="tpop" type="text" maxlength="50">
                <div id="TPopExposition_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopKlima'>Klima:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopKlima" name="TPopKlima" class="speichern" formular="tpop" type="text" maxlength="50">
                <div id="TPopKlima_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopNeigung'>Hangneigung:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopNeigung" name="TPopNeigung" class="speichern" formular="tpop" type="text" maxlength="50">
                <div id="TPopNeigung_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopBeschr'>Beschreibung:</label>
              </td>
              <td class="Datenfelder">
                <textarea id="TPopBeschr" name="TPopBeschr" class="speichern" formular="tpop" type="text" maxlength="255"></textarea>
                <div id="TPopBeschr_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopKatNr'>Kataster-Nr.:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopKatNr" name="TPopKatNr" class="speichern" formular="tpop" type="text" maxlength="255">
                <div id="TPopKatNr_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopEigen'>EigentümerIn:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopEigen" name="TPopEigen" class="speichern" formular="tpop" type="text" maxlength="255">
                <div id="TPopEigen_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopKontakt'>Kontakt vor Ort:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopKontakt" name="TPopKontakt" class="speichern" formular="tpop" type="text" maxlength="255">
                <div id="TPopKontakt_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopNutzungszone'>Nutzungszone:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopNutzungszone" name="TPopNutzungszone" class="speichern" formular="tpop" type="text" maxlength="255">
                <div id="TPopNutzungszone_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopBewirtschafterIn'>BewirtschafterIn:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopBewirtschafterIn" name="TPopBewirtschafterIn" class="speichern" formular="tpop" type="text" maxlength="255">
                <div id="TPopBewirtschafterIn_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopBewirtschaftung'>Bewirtschaftung:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopBewirtschaftung" name="TPopBewirtschaftung" class="speichern" formular="tpop" type="text" maxlength="255">
                <div id="TPopBewirtschaftung_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='TPopTxt'>Bemerkungen:</label>
              </td>
              <td class="Datenfelder">
                <textarea id="TPopTxt" name="TPopTxt" class="speichern" formular="tpop" type="text"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="tpopfeldkontr" class="form" action="#" method="get" autocomplete="off">
          <div id="tpopfeldkontrTabs">
            <ul>
              <li><a href="#tpopfeldkontrTabs_entwicklung">Entwicklung</a></li>
              <li id="biotopTabLi"><a href="#tpopfeldkontrTabsBiotop">Biotop</a></li>
            </ul>
            <div id="tpopfeldkontrTabs_entwicklung">
              <table>
                <tr id='fieldcontain_TPopKontrJahr' class='fieldcontain feldTpopkontr TPopKontrJahr'>
                  <td class="label">
                    <label for='TPopKontrJahr'>Jahr:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrJahr" name="TPopKontrJahr" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrDatum' class='fieldcontain feldTpopkontr TPopKontrDatum'>
                  <td class="label">
                    <label for='TPopKontrDatum'>Datum:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrDatum" name="TPopKontrDatum" class="speichern Datum" formular="tpopfeldkontr" type="date" placeholder='xx.xx.xxxx' pattern="[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrTyp' class='fieldcontain feldTpopkontr TPopKontrTyp'>
                  <td class="label">
                    <label for='TPopKontrTyp'>Kontrolltyp:</label>
                  </td>
                  <td class="Datenfelder">
                    <input type="radio" name="TPopKontrTyp" id="TPopKontrTypAusgangszustand" class="speichern" formular="tpopfeldkontr" value="Ausgangszustand">
                    <label for="TPopKontrTypAusgangszustand">Ausgangszustand</label><br>
                    <input type="radio" name="TPopKontrTyp" id="TPopKontrTypZwischenbeurteilung" class="speichern" formular="tpopfeldkontr" value="Zwischenbeurteilung">
                    <label for="TPopKontrTypZwischenbeurteilung">Zwischenbeurteilung</label><br>
                    <input type="radio" name="TPopKontrTyp" id="TPopKontrTypZwischenziel" class="speichern" formular="tpopfeldkontr" value="Zwischenziel">
                    <label for="TPopKontrTypZwischenziel">Zwischenziel</label><br>
                    <input type="radio" name="TPopKontrTyp" id="TPopKontrTypZiel" class="speichern" formular="tpopfeldkontr" value="Ziel">
                    <label for="TPopKontrTypZiel">Ziel</label>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrBearb' class='fieldcontain feldTpopkontr TPopKontrBearb'>
                  <td class="label">
                    <label for='TPopKontrBearb'>BearbeiterIn:</label>
                  </td>
                  <td class="Datenfelder">
                    <select id="TPopKontrBearb" name="TPopKontrBearb" class="speichern" formular="tpopfeldkontr">
                      <option></option>
                    </select>
                  </td>
                </tr>
              </table>
              <div id='tPopKontrZaehlungen'></div>
              <table>
                <tr id='fieldcontain_TPopKontrPlan' class='fieldcontain feldTpopkontr TPopKontrPlan'>
                  <td class="label">
                    <label for='TPopKontrPlan'>Auf Plan eingezeichnet?</label>
                  </td>
                  <td class="Datenfelder">
                    <input type="checkbox" name="TPopKontrPlan" id="TPopKontrPlan" class="speichern" formular="tpopfeldkontr">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrUebFlaeche' class='fieldcontain feldTpopkontr TPopKontrUebFlaeche'>
                  <td class="label">
                    <label for='TPopKontrUebFlaeche'>Überprüfte Fläche in m2:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrUebFlaeche" name="TPopKontrUebFlaeche" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrUebPfl' class='fieldcontain feldTpopkontr TPopKontrUebPfl'>
                  <td class="label">
                    <label for='TPopKontrUebPfl'>Deckung überprüfte Art (%):</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrUebPfl" name="TPopKontrUebPfl" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrNaBo' class='fieldcontain feldTpopkontr TPopKontrNaBo'>
                  <td class="label">
                    <label for='TPopKontrNaBo'>Deckung nackter Boden (%):</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrNaBo" name="TPopKontrNaBo" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrVeg' class='fieldcontain feldTpopkontr TPopKontrVeg'>
                  <td class="label">
                    <label for='TPopKontrVeg'>Deckung Pflanzen, Streu u. Moos (%):</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrVeg" name="TPopKontrVeg" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrJungPflJN' class='fieldcontain feldTpopkontr TPopKontrJungPflJN'>
                  <td class="label">
                    <label for='TPopKontrJungPflJN'>Auch junge Pflanzen vorhanden?</label>
                  </td>
                  <td class="Datenfelder">
                    <input type="radio" name="TPopKontrJungPflJN" id="TPopKontrJungPflJN_leer" class="speichern" formular="tpopfeldkontr" value="">
                    <label for="TPopKontrJungPflJN_leer">kein Wert</label><br>
                    <input type="radio" name="TPopKontrJungPflJN" id="TPopKontrJungPflJN_ja" class="speichern" formular="tpopfeldkontr" value="1">
                    <label for="TPopKontrJungPflJN_ja">ja</label><br>
                    <input type="radio" name="TPopKontrJungPflJN" id="TPopKontrJungPflJN_nein" class="speichern" formular="tpopfeldkontr" value="0">
                    <label for="TPopKontrJungPflJN_nein">nein</label>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrVegHoeMax' class='fieldcontain feldTpopkontr TPopKontrVegHoeMax'>
                  <td class="label">
                    <label for='TPopKontrVegHoeMax'>Vegetationshöhe Maximum in cm:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrVegHoeMax" name="TPopKontrVegHoeMax" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrVegHoeMit' class='fieldcontain feldTpopkontr TPopKontrVegHoeMit'>
                  <td class="label">
                    <label for='TPopKontrVegHoeMit'>Vegetationshöhe Mittelwert in cm:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrVegHoeMit" name="TPopKontrVegHoeMit" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrGefaehrdung' class='fieldcontain feldTpopkontr TPopKontrGefaehrdung'>
                  <td class="label">
                    <label for='TPopKontrGefaehrdung'>Gefährdung:</label>
                  </td>
                  <td class="Datenfelder">
                    <textarea name="TPopKontrGefaehrdung" id="TPopKontrGefaehrdung" class="speichern" formular="tpopfeldkontr" maxlength="255"></textarea>
                    <div id="TPopKontrGefaehrdung_limit" class="limiter"></div>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrJungpfl' class='fieldcontain feldTpopkontr TPopKontrJungpfl'>
                  <td class="label">
                    <label for='TPopKontrJungpfl'>Anzahl Jungpflanzen:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrJungpfl" name="TPopKontrJungpfl" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrVitalitaet' class='fieldcontain feldTpopkontr TPopKontrVitalitaet'>
                  <td class="label">
                    <label for='TPopKontrVitalitaet'>Vitalität:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrVitalitaet" name="TPopKontrVitalitaet" class="speichern" formular="tpopfeldkontr" type="text" maxlength="255">
                    <div id="TPopKontrVitalitaet_limit" class="limiter"></div>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrUeberleb' class='fieldcontain feldTpopkontr TPopKontrUeberleb'>
                  <td class="label">
                    <label for='TPopKontrUeberleb'>Überlebensrate:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrUeberleb" name="TPopKontrUeberleb" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrEntwicklung' class='fieldcontain feldTpopkontr TPopKontrEntwicklung'>
                  <td class="label">
                    <label for='TPopKontrEntwicklung' class='apf-with-tooltip erforderlich'>
                      <span>Entwicklung:</span>
                    </label>
                    <div class="tooltiptext">
                      <p>Im 1. Jahr der Beobachtung die Entwicklung an der Massnahme beurteilen, nachher an vorhergehenden EK.</p>
                      <table>
                        <tr class='apf-tr-with-border-bottom'>
                          <td>zunehmend:</td>
                          <td>> 10% Zunahme</td>
                        </tr>
                        <tr class='apf-tr-with-border-bottom'>
                          <td>stabil:</td>
                          <td>± 10%</td>
                        </tr>
                        <tr class='apf-tr-with-border-bottom'>
                          <td>abnehmend:</td>
                          <td>> 10% Abnahme</td>
                        </tr>
                        <tr class='apf-tr-with-border-bottom'>
                          <td>erloschen / nicht etabliert:</td>
                          <td>nach 2 aufeinander folgenden Kontrollen ohne Funde oder nach Einschätzung AP-VerantwortlicheR</td>
                        </tr>
                        <tr class='apf-tr-with-border-bottom'>
                          <td>unsicher:</td>
                          <td>keine Funde aber noch nicht erloschen (nach zwei Kontrollen ohne Funde kann Status erloschen/nicht etabliert gewählt werden)</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                  <td class="Datenfelder">
                    <input type="radio" name="TPopKontrEntwicklung" id="TPopKontrEntwicklung3" class="speichern" formular="tpopfeldkontr" value="3">
                    <label for="TPopKontrEntwicklung3">zunehmend</label><br>
                    <input type="radio" name="TPopKontrEntwicklung" id="TPopKontrEntwicklung2" class="speichern" formular="tpopfeldkontr" value="2">
                    <label for="TPopKontrEntwicklung2">stabil</label><br>
                    <input type="radio" name="TPopKontrEntwicklung" id="TPopKontrEntwicklung1" class="speichern" formular="tpopfeldkontr" value="1">
                    <label for="TPopKontrEntwicklung1">abnehmend</label><br>
                    <input type="radio" name="TPopKontrEntwicklung" id="TPopKontrEntwicklung8" class="speichern" formular="tpopfeldkontr" value="8">
                    <label for="TPopKontrEntwicklung8">erloschen / nicht etabliert</label><br>
                    <input type="radio" name="TPopKontrEntwicklung" id="TPopKontrEntwicklung4" class="speichern" formular="tpopfeldkontr" value="4">
                    <label for="TPopKontrEntwicklung4">unsicher</label><br>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrUrsach' class='fieldcontain feldTpopkontr TPopKontrUrsach'>
                  <td class="label">
                    <label for='TPopKontrUrsach'>Ursachen:</label>
                  </td>
                  <td class="Datenfelder">
                    <textarea id="TPopKontrUrsach" name="TPopKontrUrsach" class="speichern" formular="tpopfeldkontr" type="text" placeholder="Standort: ... / Klima: ... / anderes: ..." maxlength="255"></textarea>
                    <div id="TPopKontrUrsach_limit" class="limiter"></div>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrUrteil' class='fieldcontain feldTpopkontr TPopKontrUrteil'>
                  <td class="label">
                    <label for='TPopKontrUrteil'>Erfolgsbeurteilung:</label>
                  </td>
                  <td class="Datenfelder">
                    <textarea name="TPopKontrUrteil" id="TPopKontrUrteil" class="speichern" formular="tpopfeldkontr" maxlength="255"></textarea>
                    <div id="TPopKontrUrteil_limit" class="limiter"></div>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrAendUms' class='fieldcontain feldTpopkontr TPopKontrAendUms'>
                  <td class="label">
                    <label for='TPopKontrAendUms'>Änd.-vorschläge Umsetzung:</label>
                  </td>
                  <td class="Datenfelder">
                    <textarea name="TPopKontrAendUms" id="TPopKontrAendUms" class="speichern" formular="tpopfeldkontr" maxlength="255"></textarea>
                    <div id="TPopKontrAendUms_limit" class="limiter"></div>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrAendKontr' class='fieldcontain feldTpopkontr TPopKontrAendKontr'>
                  <td class="label">
                    <label for='TPopKontrAendKontr'>Änd.-vorschläge Kontrolle:</label>
                  </td>
                  <td class="Datenfelder">
                    <textarea name="TPopKontrAendKontr" id="TPopKontrAendKontr" class="speichern" formular="tpopfeldkontr" maxlength="255"></textarea>
                    <div id="TPopKontrAendKontr_limit" class="limiter"></div>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrTxt' class='fieldcontain feldTpopkontr TPopKontrTxt'>
                  <td class="label">
                    <label for='TPopKontrTxt'>Bemerkungen:</label>
                  </td>
                  <td class="Datenfelder">
                    <textarea name="TPopKontrTxt" id="TPopKontrTxt" class="speichern" formular="tpopfeldkontr"></textarea>
                  </td>
                </tr>
                <tr id='fieldcontain_TPopKontrGuid' class='fieldcontain feldTpopkontr TPopKontrGuid'>
                  <td class="label">
                    <label for='TPopKontrGuid'>GUID:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrGuid" name="TPopKontrGuid" class="guid" formular="tpopfeldkontr" type="text" readonly="readonly"  style="width:350px;">
                    <span class="js-guidRueckmeldung" style="display:none; line-height:26px;">&nbsp;&nbsp;GUID kopiert</span>
                  </td>
                </tr>
              </table>
            </div>
            <div id="tpopfeldkontrTabsBiotop">
              <table>
                <tr id='fieldcontain_TPopKontrFlaeche' class='fieldcontain feldTpopkontr TPopKontrFlaeche'>
                  <td class="label">
                    <label for='TPopKontrFlaeche'>Fläche:</label>
                  </td>
                  <td class="Datenfelder">
                    <input id="TPopKontrFlaeche" name="TPopKontrFlaeche" class="speichern" formular="tpopfeldkontr" type="number">
                  </td>
                </tr>
              </table>
              <fieldset style="background:none;">
                <legend>Vegetation</legend>
                <table>
                  <tr id='fieldcontain_TPopKontrLeb' class='fieldcontain feldTpopkontr TPopKontrLeb'>
                    <td class="labelFieldset">
                      <label for='TPopKontrLeb' style="width:115px">Lebensraum nach Delarze:</label>
                    </td>
                    <td class="Datenfelder">
                      <select id="TPopKontrLeb" name="TPopKontrLeb" class="speichern" formular="tpopfeldkontr" style="white-space:pre;">
                        <option></option>
                      </select>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrLebUmg' class='fieldcontain feldTpopkontr TPopKontrLebUmg'>
                    <td class="labelFieldset">
                      <label for='TPopKontrLebUmg' style="width:115px">Umgebung:</label>
                    </td>
                    <td class="Datenfelder">
                      <select id="TPopKontrLebUmg" name="TPopKontrLebUmg" class="speichern" formular="tpopfeldkontr" style="white-space:pre;">
                        <option></option>
                      </select>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrVegTyp' class='fieldcontain feldTpopkontr TPopKontrVegTyp'>
                    <td class="labelFieldset">
                      <label for='TPopKontrVegTyp' style="width:115px">Vegetationstyp:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrVegTyp" name="TPopKontrVegTyp" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrVegTyp_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrKonkurrenz' class='fieldcontain feldTpopkontr TPopKontrKonkurrenz'>
                    <td class="labelFieldset">
                      <label for='TPopKontrKonkurrenz' style="width:115px">Konkurrenz:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrKonkurrenz" name="TPopKontrKonkurrenz" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrKonkurrenz_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrMoosschicht' class='fieldcontain feldTpopkontr TPopKontrMoosschicht'>
                    <td class="labelFieldset">
                      <label for='TPopKontrMoosschicht' style="width:115px">Moosschicht:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrMoosschicht" name="TPopKontrMoosschicht" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrMoosschicht_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrKrautschicht' class='fieldcontain feldTpopkontr TPopKontrKrautschicht'>
                    <td class="labelFieldset">
                      <label for='TPopKontrKrautschicht' style="width:115px">Krautschicht:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrKrautschicht" name="TPopKontrKrautschicht" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrKrautschicht_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrStrauchschicht' class='fieldcontain feldTpopkontr TPopKontrStrauchschicht'>
                    <td class="labelFieldset">
                      <label for='TPopKontrStrauchschicht' style="width:115px">Strauchschicht:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrStrauchschicht" name="TPopKontrStrauchschicht" class="speichern" formular="tpopfeldkontr" type="text" maxlength="255">
                      <div id="TPopKontrStrauchschicht_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrBaumschicht' class='fieldcontain feldTpopkontr TPopKontrBaumschicht'>
                    <td class="labelFieldset">
                      <label for='TPopKontrBaumschicht' style="width:115px">Baumschicht:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrBaumschicht" name="TPopKontrBaumschicht" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrBaumschicht_limit" class="limiter"></div>
                    </td>
                  </tr>
                </table>
              </fieldset>
              <fieldset style="background:none;">
                <legend>Boden</legend>
                <table>
                  <tr id='fieldcontain_TPopKontrBodenTyp' class='fieldcontain feldTpopkontr TPopKontrBodenTyp'>
                    <td class="labelFieldset">
                      <label for='TPopKontrBodenTyp' style="width:115px">Typ:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrBodenTyp" name="TPopKontrBodenTyp" class="speichern" formular="tpopfeldkontr" type="text" maxlength="255">
                      <div id="TPopKontrBodenTyp_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrBodenKalkgehalt' class='fieldcontain feldTpopkontr TPopKontrBodenKalkgehalt'>
                    <td class="labelFieldset">
                      <label for='TPopKontrBodenKalkgehalt' style="width:115px">Kalkgehalt:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrBodenKalkgehalt" name="TPopKontrBodenKalkgehalt" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrBodenKalkgehalt_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrBodenDurchlaessigkeit' class='fieldcontain feldTpopkontr TPopKontrBodenDurchlaessigkeit'>
                    <td class="labelFieldset">
                      <label for='TPopKontrBodenDurchlaessigkeit' style="width:115px">Durchlässigkeit:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrBodenDurchlaessigkeit" name="TPopKontrBodenDurchlaessigkeit" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrBodenDurchlaessigkeit_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrBodenHumus' class='fieldcontain feldTpopkontr TPopKontrBodenHumus'>
                    <td class="labelFieldset">
                      <label for='TPopKontrBodenHumus' style="width:115px">Humusgehalt:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrBodenHumus" name="TPopKontrBodenHumus" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrBodenHumus_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrBodenNaehrstoffgehalt' class='fieldcontain feldTpopkontr TPopKontrBodenNaehrstoffgehalt'>
                    <td class="labelFieldset">
                      <label for='TPopKontrBodenNaehrstoffgehalt' style="width:115px">Nährstoffgehalt:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrBodenNaehrstoffgehalt" name="TPopKontrBodenNaehrstoffgehalt" class="speichern" formular="tpopfeldkontr" type="text" maxlength="100">
                      <div id="TPopKontrBodenNaehrstoffgehalt_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrBodenAbtrag' class='fieldcontain feldTpopkontr TPopKontrBodenAbtrag'>
                    <td class="labelFieldset">
                      <label for='TPopKontrBodenAbtrag' style="width:115px">Bodenabtrag:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrBodenAbtrag" name="TPopKontrBodenAbtrag" class="speichern" formular="tpopfeldkontr" type="text" maxlength="255">
                      <div id="TPopKontrBodenAbtrag_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrWasserhaushalt' class='fieldcontain feldTpopkontr TPopKontrWasserhaushalt'>
                    <td class="labelFieldset">
                      <label for='TPopKontrWasserhaushalt' style="width:115px">Wasserhaushalt:</label>
                    </td>
                    <td class="Datenfelder">
                      <input id="TPopKontrWasserhaushalt" name="TPopKontrWasserhaushalt" class="speichern" formular="tpopfeldkontr" type="text" maxlength="255">
                      <div id="TPopKontrWasserhaushalt_limit" class="limiter"></div>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrHandlungsbedarf' class='fieldcontain feldTpopkontr TPopKontrHandlungsbedarf'>
                    <td class="labelFieldset">
                      <label for='TPopKontrHandlungsbedarf' style="width:115px">Handlungsbedarf:</label>
                    </td>
                    <td class="Datenfelder">
                      <textarea name="TPopKontrHandlungsbedarf" id="TPopKontrHandlungsbedarf" class="speichern" formular="tpopfeldkontr"></textarea>
                    </td>
                  </tr>
                  <tr id='fieldcontain_TPopKontrIdealBiotopUebereinst' class='fieldcontain feldTpopkontr TPopKontrIdealBiotopUebereinst'>
                    <td class="labelFieldset">
                      <label for='TPopKontrIdealBiotopUebereinst' style="width:115px">Übereinst. mit Idealbiotop:</label>
                    </td>
                    <td class="Datenfelder">
                      <select id="TPopKontrIdealBiotopUebereinst" name="TPopKontrIdealBiotopUebereinst" class="speichern" formular="tpopfeldkontr" style="white-space:pre;">
                        <option></option>
                      </select>
                    </td>
                  </tr>
                </table>
              </fieldset>
            </div>
          </div>
        </form>

        <form id="tpopmassn" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain TPopMassnJahr'>
              <td class="label">
                <label for='TPopMassnJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnJahr" name="TPopMassnJahr" class="speichern" formular="tpopmassn" type="number">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnDatum'>
              <td class="label">
                <label for='TPopMassnDatum'>Datum:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnDatum" name="TPopMassnDatum" class="speichern Datum" formular="tpopmassn" type="date" placeholder='xx.xx.xxxx' pattern="[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnTyp'>
              <td class="label">
                <label for='TPopMassnTyp'>Typ:</label>
              </td>
              <td class="Datenfelder">
                <select id="TPopMassnTyp" name="TPopMassnTyp" class="speichern" formular="tpopmassn">
                  <option></option>
                </select>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnTxt'>
              <td class="label">
                <label for='TPopMassnTxt'>Massnahme:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnTxt" name="TPopMassnTxt" class="speichern" formular="tpopmassn" type="text" maxlength="255">
                <div id="TPopMassnTxt_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnBearb'>
              <td class="label">
                <label for='TPopMassnBearb'>BearbeiterIn:</label>
              </td>
              <td class="Datenfelder">
                <select id="TPopMassnBearb" name="TPopMassnBearb" class="speichern" formular="tpopmassn">
                  <option></option>
                </select>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnBemTxt'>
              <td class="label">
                <label for='TPopMassnBemTxt'>Bemerkungen:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="TPopMassnBemTxt" id="TPopMassnBemTxt" class="speichern" formular="tpopmassn"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnPlan'>
              <td class="label">
                <label for='TPopMassnPlan'>Plan vorhanden:</label>
              </td>
              <td class="Datenfelder">
                <input type="checkbox" name="TPopMassnPlan" id="TPopMassnPlan" class="speichern" formular="tpopmassn">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnPlanBez'>
              <td class="label">
                <label for='TPopMassnPlanBez'>Plan Bezeichnung:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnPlanBez" name="TPopMassnPlanBez" class="speichern" formular="tpopmassn" type="text" maxlength="255">
                <div id="TPopMassnPlanBez_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnFlaeche'>
              <td class="label">
                <label for='TPopMassnFlaeche'>Fläche (m2):</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnFlaeche" name="TPopMassnFlaeche" class="speichern" formular="tpopmassn" type="number">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnAnsiedForm'>
              <td class="label">
                <label for='TPopMassnAnsiedForm'>Form der Ansiedlung:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnAnsiedForm" name="TPopMassnAnsiedForm" class="speichern" formular="tpopmassn" type="text" maxlength="255">
                <div id="TPopMassnAnsiedForm_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnAnsiedPflanzanordnung'>
              <td class="label">
                <label for='TPopMassnAnsiedPflanzanordnung'>Pflanzanordnung:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnAnsiedPflanzanordnung" name="TPopMassnAnsiedPflanzanordnung" class="speichern" formular="tpopmassn" type="text" maxlength="255">
                <div id="TPopMassnAnsiedPflanzanordnung_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnMarkierung'>
              <td class="label">
                <label for='TPopMassnMarkierung'>Markierung:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnMarkierung" name="TPopMassnMarkierung" class="speichern" formular="tpopmassn" type="text" maxlength="255">
                <div id="TPopMassnMarkierung_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnAnsiedAnzTriebe'>
              <td class="label">
                <label for='TPopMassnAnsiedAnzTriebe'>Anzahl Triebe:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnAnsiedAnzTriebe" name="TPopMassnAnsiedAnzTriebe" class="speichern" formular="tpopmassn" type="number">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnAnsiedAnzPfl'>
              <td class="label">
                <label for='TPopMassnAnsiedAnzPfl'>Anzahl Pflanzen:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnAnsiedAnzPfl" name="TPopMassnAnsiedAnzPfl" class="speichern" formular="tpopmassn" type="number">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnAnzPflanzstellen'>
              <td class="label">
                <label for='TPopMassnAnzPflanzstellen'>Anz. Pflanzstellen:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnAnzPflanzstellen" name="TPopMassnAnzPflanzstellen" class="speichern" formular="tpopmassn" type="number">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnAnsiedWirtspfl'>
              <td class="label">
                <label for='TPopMassnAnsiedWirtspfl'>Wirtspflanze:</label>
              </td>
              <td class="Datenfelder">
                <input type="text" id="TPopMassnAnsiedWirtspfl" name="TPopMassnAnsiedWirtspfl" class="speichern" formular="tpopmassn">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnAnsiedHerkunftPop'>
              <td class="label">
                <label for='TPopMassnAnsiedHerkunftPop'>Herkunftspopulation:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnAnsiedHerkunftPop" name="TPopMassnAnsiedHerkunftPop" class="speichern" formular="tpopmassn" type="text" maxlength="255">
                <div id="TPopMassnAnsiedHerkunftPop_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnAnsiedDatSamm'>
              <td class="label">
                <label for='TPopMassnAnsiedDatSamm'>Sammeldatum:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnAnsiedDatSamm" name="TPopMassnAnsiedDatSamm" class="speichern" formular="tpopmassn" type="text" maxlength="50">
                <div id="TPopMassnAnsiedDatSamm_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnGuid'>
              <td class="label">
                <label for='TPopMassnGuid'>GUID:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnGuid" name="TPopMassnGuid" class="guid" formular="tpopmassn" type="text" readonly="readonly" style="width:350px;">
                <span class="js-guidRueckmeldung" style="display:none; line-height:26px;">&nbsp;&nbsp;GUID kopiert</span>
              </td>
            </tr>
          </table>
        </form>

        <form id="apziel" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain ZielJahr'>
              <td class="label">
                <label for='ZielJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="ZielJahr" name="ZielJahr" class="speichern" formular="apziel" type="number">
              </td>
            </tr>
            <tr class='fieldcontain ZielTyp'>
              <td class="label">
                <label for='ZielTyp'>Zieltyp:</label>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="ZielTyp" id="ZielTyp1170775556" class="speichern" formular="apziel" value="1170775556">
                <label for="ZielTyp1170775556">Zwischenziel</label><br>
                <input type="radio" name="ZielTyp" id="ZielTyp1" class="speichern" formular="apziel" value="1">
                <label for="ZielTyp1">10-Jahresziel</label><br>
                <input type="radio" name="ZielTyp" id="ZielTyp2" class="speichern" formular="apziel" value="2">
                <label for="ZielTyp2">Gesamtziel</label>
              </td>
            </tr>
            <tr class='fieldcontain ZielBezeichnung'>
              <td class="label">
                <label for='ZielBezeichnung'>Ziel:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="ZielBezeichnung" id="ZielBezeichnung" class="speichern" formular="apziel"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="zielber" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain ZielBerJahr'>
              <td class="label">
                <label for='ZielBerJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="ZielBerJahr" name="ZielBerJahr" class="speichern" formular="zielber" type="number">
              </td>
            </tr>
            <tr class='fieldcontain ZielBerErreichung'>
              <td class="label">
                <label for='ZielBerErreichung'>Entwicklung:</label>
              </td>
              <td class="Datenfelder">
                <input id="ZielBerErreichung" name="ZielBerErreichung" class="speichern" formular="zielber" type="text">
              </td>
            </tr>
            <tr class='fieldcontain ZielBerTxt'>
              <td class="label">
                <label for='ZielBerTxt'>Bemerkungen:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="ZielBerTxt" id="ZielBerTxt" class="speichern" formular="zielber"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="erfkrit" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain ErfkritErreichungsgrad'>
              <td class="label">
                <label for='ErfkritErreichungsgrad'>Beurteilung:</label>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="ErfkritErreichungsgrad" id="ErfkritErreichungsgrad4" class="speichern" formular="erfkrit" value="4">
                <label for="ErfkritErreichungsgrad4">sehr erfolgreich</label><br>
                <input type="radio" name="ErfkritErreichungsgrad" id="ErfkritErreichungsgrad1" class="speichern" formular="erfkrit" value="1">
                <label for="ErfkritErreichungsgrad1">erfolgreich</label><br>
                <input type="radio" name="ErfkritErreichungsgrad" id="ErfkritErreichungsgrad5" class="speichern" formular="erfkrit" value="5">
                <label for="ErfkritErreichungsgrad5">mässig erfolgreich</label><br>
                <input type="radio" name="ErfkritErreichungsgrad" id="ErfkritErreichungsgrad6" class="speichern" formular="erfkrit" value="6">
                <label for="ErfkritErreichungsgrad6">wenig erfolgreich</label><br>
                <input type="radio" name="ErfkritErreichungsgrad" id="ErfkritErreichungsgrad3" class="speichern" formular="erfkrit" value="3">
                <label for="ErfkritErreichungsgrad3">nicht erfolgreich</label><br>
                <input type="radio" name="ErfkritErreichungsgrad" id="ErfkritErreichungsgrad1168274204" class="speichern" formular="erfkrit" value="1168274204">
                <label for="ErfkritErreichungsgrad1168274204">unsichere Entwicklung</label>
              </td>
            </tr>
            <tr class='fieldcontain ErfkritTxt'>
              <td class="label">
                <label for='ErfkritTxt'>Kriterien:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="ErfkritTxt" id="ErfkritTxt" class="speichern" formular="erfkrit" maxlength="255"></textarea>
                <div id="ErfkritTxt_limit" class="limiter"></div>
              </td>
            </tr>
          </table>
        </form>

        <form id="jber" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain JBerJahr'>
              <td class="label">
                <label for='JBerJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="JBerJahr" name="JBerJahr" class="speichern" formular="jber" type="number">
              </td>
            </tr>
            <tr class='fieldcontain JBerSituation'>
              <td class="label">
                <label for='JBerSituation'>Situation:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerSituation" id="JBerSituation" class="speichern" formular="jber"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain JBerVergleichVorjahrGesamtziel'>
              <td class="label">
                <label for='JBerVergleichVorjahrGesamtziel'>Vergleich Vorjahr - Gesamtziel:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerVergleichVorjahrGesamtziel" id="JBerVergleichVorjahrGesamtziel" class="speichern" formular="jber"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain JBerBeurteilung'>
              <td class="label">
                <label for='JBerBeurteilung'>Beurteilung:</label>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="JBerBeurteilung" id="JBerBeurteilung0" class="speichern" formular="jber" value="">
                <label for="JBerBeurteilung0">(Auswahl aufheben)</label><br>
                <input type="radio" name="JBerBeurteilung" id="JBerBeurteilung4" class="speichern" formular="jber" value="4">
                <label for="JBerBeurteilung4">sehr erfolgreich</label><br>
                <input type="radio" name="JBerBeurteilung" id="JBerBeurteilung1" class="speichern" formular="jber" value="1">
                <label for="JBerBeurteilung1">erfolgreich</label><br>
                <input type="radio" name="JBerBeurteilung" id="JBerBeurteilung5" class="speichern" formular="jber" value="5">
                <label for="JBerBeurteilung5">mässig erfolgreich</label><br>
                <input type="radio" name="JBerBeurteilung" id="JBerBeurteilung6" class="speichern" formular="jber" value="6">
                <label for="JBerBeurteilung6">wenig erfolgreich</label><br>
                <input type="radio" name="JBerBeurteilung" id="JBerBeurteilung3" class="speichern" formular="jber" value="3">
                <label for="JBerBeurteilung3">nicht erfolgreich</label><br>
                <input type="radio" name="JBerBeurteilung" id="JBerBeurteilung1168274204" class="speichern" formular="jber" value="1168274204">
                <label for="JBerBeurteilung1168274204">unsichere Entwicklung</label>
              </td>
            </tr>
            <tr class='fieldcontain JBerVeraenGegenVorjahr'>
              <td class="label">
                <label for='JBerVeraenGegenVorjahr'>Veränderung zum Vorjahr:</label>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="JBerVeraenGegenVorjahr" id="JBerVeraenGegenVorjahr0" class="speichern" formular="jber" value="">
                <label for="JBerVeraenGegenVorjahr0">(Auswahl aufheben)</label><br>
                <input type="radio" name="JBerVeraenGegenVorjahr" id="JBerVeraenGegenVorjahr+" class="speichern" formular="jber" value="+">
                <label for="JBerVeraenGegenVorjahr+">+</label><br>
                <input type="radio" name="JBerVeraenGegenVorjahr" id="JBerVeraenGegenVorjahr-" class="speichern" formular="jber" value="-">
                <label for="JBerVeraenGegenVorjahr-">-</label>
              </td>
            </tr>
            <tr class='fieldcontain JBerAnalyse'>
              <td class="label">
                <label for='JBerAnalyse'>Analyse:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerAnalyse" id="JBerAnalyse" class="speichern" formular="jber" maxlength="255"></textarea>
                <div id="JBerAnalyse_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain JBerUmsetzung'>
              <td class="label">
                <label for='JBerUmsetzung'>Konsequenzen Umsetzung:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerUmsetzung" id="JBerUmsetzung" class="speichern" formular="jber"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain JBerErfko'>
              <td class="label">
                <label for='JBerErfko'>Konsequenzen Erfolgskontrolle:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerErfko" id="JBerErfko" class="speichern" formular="jber"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain JBerATxt'>
              <td class="label">
                <label for='JBerATxt'>Bemerkungen zum Aussagebereich A (neue Biotope):</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerATxt" id="JBerATxt" class="speichern" formular="jber"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain JBerBTxt'>
              <td class="label">
                <label for='JBerBTxt'>Bemerkungen zum Aussagebereich B (Optimierung Biotope):</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerBTxt" id="JBerBTxt" class="speichern" formular="jber"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain JBerCTxt'>
              <td class="label">
                <label for='JBerCTxt'>Bemerkungen zum Aussagebereich C (Optimierung Massnahmen):</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerCTxt" id="JBerCTxt" class="speichern" formular="jber"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain JBerDTxt'>
              <td class="label">
                <label for='JBerDTxt'>Bemerkungen zum Aussagebereich D:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JBerDTxt" id="JBerDTxt" class="speichern" formular="jber"></textarea>
              </td>
            </tr>
            <tr class='fieldcontain JBerDatum'>
              <td class="label">
                <label for='JBerDatum'>Datum:</label>
              </td>
              <td class="Datenfelder">
                <input id="JBerDatum" name="JBerDatum" class="speichern Datum" formular="jber" type="date" placeholder='xx.xx.xxxx' pattern="[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}">
              </td>
            </tr>
            <tr class='fieldcontain JBerBearb'>
              <td class="label">
                <label for='JBerBearb'>BearbeiterIn:</label>
              </td>
              <td class="Datenfelder">
                <select id="JBerBearb" name="JBerBearb" class="speichern" formular="jber">
                  <option></option>
                </select>
              </td>
            </tr>
          </table>
        </form>

        <form id="jberUebersicht" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain JbuJahr' style="display:none;">
              <td class="label">
                <label for='JbuJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="JbuJahr" name="JbuJahr" class="speichern" formular="jberUebersicht" type="number">
              </td>
            </tr>
            <tr class='fieldcontain JbuBemerkungen'>
              <td class="label">
                <label for='JbuBemerkungen'>Bemerkungen:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="JbuBemerkungen" id="JbuBemerkungen" class="speichern" formular="jberUebersicht"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="ber" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain BerAutor'>
              <td class="label">
                <label for='BerAutor'>AutorIn:</label>
              </td>
              <td class="Datenfelder">
                <input id="BerAutor" name="BerAutor" class="speichern" formular="ber" type="text">
              </td>
            </tr>
            <tr class='fieldcontain BerJahr'>
              <td class="label">
                <label for='BerJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="BerJahr" name="BerJahr" class="speichern" formular="ber" type="number">
              </td>
            </tr>
            <tr class='fieldcontain BerTitel'>
              <td class="label">
                <label for='BerTitel'>Titel:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="BerTitel" id="BerTitel" class="speichern" formular="ber" maxlength="255"></textarea>
                <div id="BerTitel_limit" class="limiter"></div>
              </td>
            </tr>
            <tr class='fieldcontain berUrl'>
              <td class="label">
                <label for='berUrl'>URL:</label>
              </td>
              <td class="Datenfelder">
                <textarea type="url" name="berUrl" id="berUrl" class="speichern" formular="ber" maxlength="255"></textarea>
                <div id="BerURL_limit" class="limiter"></div>
                <label for='BerURLHref' style="display:none;">URL öffnen</label>
                <input type="button" id="BerURLHref" onclick="" value="URL öffnen">
              </td>
            </tr>
          </table>
        </form>

        <form id="idealbiotop" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain IbErstelldatum'>
              <td class="label">
                <label for='IbErstelldatum'>Erstelldatum:</label>
              </td>
              <td class="Datenfelder">
                <input id="IbErstelldatum" name="IbErstelldatum" class="speichern Datum" formular="idealbiotop" type="date" placeholder='xx.xx.xxxx' pattern="[0-9]{4}\.[0-9]{1,2}\.[0-9]{1,2}">
              </td>
            </tr>
          </table>
          <fieldset>
            <legend>Lage</legend>
            <table>
              <tr class='fieldcontain IbHoehenlage'>
                <td class="labelFieldset">
                  <label for='IbHoehenlage'>Höhe:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbHoehenlage" name="IbHoehenlage" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbRegion'>
                <td class="labelFieldset">
                  <label for='IbRegion'>Region:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbRegion" name="IbRegion" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbExposition'>
                <td class="labelFieldset">
                  <label for='IbExposition'>Exposition:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbExposition" name="IbExposition" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbBesonnung'>
                <td class="labelFieldset">
                  <label for='IbBesonnung'>Besonnung:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbBesonnung" name="IbBesonnung" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbHangneigung'>
                <td class="labelFieldset">
                  <label for='IbHangneigung'>Hangneigung:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbHangneigung" name="IbHangneigung" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
            </table>
          </fieldset>
          <fieldset>
            <legend>Boden</legend>
            <table>
              <tr class='fieldcontain IbBodenTyp'>
                <td class="labelFieldset">
                  <label for='IbBodenTyp'>Typ:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbBodenTyp" name="IbBodenTyp" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class="fieldcontain IbBodenKalkgehalt">
                <td class="labelFieldset">
                  <label for="IbBodenKalkgehalt">Kalkgehalt:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbBodenKalkgehalt" name="IbBodenKalkgehalt" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbBodenDurchlaessigkeit'>
                <td class="labelFieldset">
                  <label for='IbBodenDurchlaessigkeit'>Durchlässigkeit:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbBodenDurchlaessigkeit" name="IbBodenDurchlaessigkeit" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbBodenHumus'>
                <td class="labelFieldset">
                  <label for='IbBodenHumus'>Humus:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbBodenHumus" name="IbBodenHumus" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbBodenNaehrstoffgehalt'>
                <td class="labelFieldset">
                  <label for='IbBodenNaehrstoffgehalt'>Nährstoffgehalt:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbBodenNaehrstoffgehalt" name="IbBodenNaehrstoffgehalt" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbWasserhaushalt'>
                <td class="labelFieldset">
                  <label for='IbWasserhaushalt'>Wasserhaushalt:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbWasserhaushalt" name="IbWasserhaushalt" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
            </table>
          </fieldset>
          <fieldset>
            <legend>Vegetation</legend>
            <table>
              <tr class='fieldcontain IbKonkurrenz'>
                <td class="labelFieldset">
                  <label for='IbKonkurrenz'>Konkurrenz:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbKonkurrenz" name="IbKonkurrenz" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbMoosschicht'>
                <td class="labelFieldset">
                  <label for='IbMoosschicht'>Moosschicht:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbMoosschicht" name="IbMoosschicht" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbKrautschicht'>
                <td class="labelFieldset">
                  <label for='IbKrautschicht'>Krautschicht:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbKrautschicht" name="IbKrautschicht" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbStrauchschicht'>
                <td class="labelFieldset">
                  <label for='IbStrauchschicht'>Strauchschicht:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbStrauchschicht" name="IbStrauchschicht" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
              <tr class='fieldcontain IbBaumschicht'>
                <td class="labelFieldset">
                  <label for='IbBaumschicht'>Baumschicht:</label>
                </td>
                <td class="Datenfelder">
                  <textarea id="IbBaumschicht" name="IbBaumschicht" class="speichern" formular="idealbiotop" type="text"></textarea>
                </td>
              </tr>
            </table>
          </fieldset>
          <table>
            <tr class='fieldcontain IbBemerkungen'>
              <td class="label">
                <label for='IbBemerkungen'>Bemerkungen:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="IbBemerkungen" id="IbBemerkungen" class="speichern" formular="idealbiotop"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="assozarten" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain AaSisfNr'>
              <td class="label">
                <label for='AaSisfNrText'>Art:</label>
              </td>
              <td class="Datenfelder">
                <input type="text" id="AaSisfNrText">
                <input type="number" id="AaSisfNr" name="AaSisfNr" class="speichern" formular="assozarten" style="display:none;">
              </td>
            </tr>
            <tr class='fieldcontain AaBem'>
              <td class="label">
                <label for='AaBem'>Bemerkungen zur Assoziation:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="AaBem" id="AaBem" class="speichern" formular="assozarten"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="popber" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain PopBerJahr'>
              <td class="label">
                <label for='PopBerJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="PopBerJahr" name="PopBerJahr" class="speichern" formular="popber" type="number">
              </td>
            </tr>
            <tr class='fieldcontain PopBerEntwicklung'>
              <td class="label">
                <label for='PopBerEntwicklung' class='apf-with-tooltip erforderlich'>
                  <span>Entwicklung:</span>
                </label>
                <div class="tooltiptext">
                  <p>Entgegen dem Vorgehen bei der Entwicklungsbeurteilung der Teilpopulationen kann die Beurteilung der Gesamtentwicklung einer Population nicht rein rechnerisch bestimmt werden. Weil meist nicht alle Teilpopulationen einer Population im laufenden Jahr kontrolliert und beurteilt werden, kann die Entwicklung der Population deshalb meist nur fachlich beurteilt werden. Es sind dazu auch allfällige frühere Beurteilungen von verschiedenen Teilpopulationen bei der Beurteilung der gesamten Population zu berücksichtigen.</p>
                  <p>Beispiele:</p>
                  <ul>
                    <li>Wenn nur 3 von 20 Teilpopulationen kontrolliert werden > unsichere Entwicklung</li>
                    <li>Ist bei 5 Teilpopulationen 1 sehr gross, die übrigen klein und wurde die grosse kontrolliert, kann diese grosse Teilpopulation massgeblich für die Entwicklungsangabe der gesamten Population verwendet werden</li>
                    <li>Werden über Jahre hinweg abwechslungsweise verschiedene Teilpopulationen kontrolliert und sind diese über Jahre hinweg konstant, dann kann auch die Gesamtpopulation als konstant angesehen werden</li>
                  </ul>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="PopBerEntwicklung" id="PopBerEntwicklung3" class="speichern" formular="popber" value="3">
                <label for="PopBerEntwicklung3">zunehmend</label><br>
                <input type="radio" name="PopBerEntwicklung" id="PopBerEntwicklung2" class="speichern" formular="popber" value="2">
                <label for="PopBerEntwicklung2">stabil</label><br>
                <input type="radio" name="PopBerEntwicklung" id="PopBerEntwicklung1" class="speichern" formular="popber" value="1">
                <label for="PopBerEntwicklung1">abnehmend</label><br>
                <input type="radio" name="PopBerEntwicklung" id="PopBerEntwicklung8" class="speichern" formular="popber" value="8">
                <label for="PopBerEntwicklung8">erloschen / nicht etabliert</label><br>
                <input type="radio" name="PopBerEntwicklung" id="PopBerEntwicklung4" class="speichern" formular="popber" value="4">
                <label for="PopBerEntwicklung4">unsicher</label>
              </td>
            </tr>
            <tr class='fieldcontain PopBerTxt'>
              <td class="label">
                <label for='PopBerTxt'>Bemerkungen:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="PopBerTxt" id="PopBerTxt" class="speichern" formular="popber"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="popmassnber" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain PopMassnBerJahr'>
              <td class="label">
                <label for='PopMassnBerJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="PopMassnBerJahr" name="PopMassnBerJahr" class="speichern" formular="popmassnber" type="number">
              </td>
            </tr>
            <tr class='fieldcontain PopMassnBerErfolgsbeurteilung'>
              <td class="label">
                <label for='PopMassnBerErfolgsbeurteilung' class='apf-with-tooltip erforderlich'>
                  <span>Entwicklung:</span>
                </label>
                <div class="tooltiptext">
                  <p>Dieses Feld möglichst immer ausfüllen.</p>
                  <p>Die aktuelle Kontrolle wird im Vergleich zu allen bisherigen Massnahmen beurteilt.</p>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="PopMassnBerErfolgsbeurteilung" id="PopMassnBerErfolgsbeurteilung1" class="speichern" formular="popmassnber" value="1">
                <label for="PopMassnBerErfolgsbeurteilung1">sehr erfolgreich (>= 150%)</label><br>
                <input type="radio" name="PopMassnBerErfolgsbeurteilung" id="PopMassnBerErfolgsbeurteilung2" class="speichern" formular="popmassnber" value="2">
                <label for="PopMassnBerErfolgsbeurteilung2">erfolgreich (90 - 149%)</label><br>
                <input type="radio" name="PopMassnBerErfolgsbeurteilung" id="PopMassnBerErfolgsbeurteilung3" class="speichern" formular="popmassnber" value="3">
                <label for="PopMassnBerErfolgsbeurteilung3">weniger erfolgreich (1 - 89%)</label><br>
                <input type="radio" name="PopMassnBerErfolgsbeurteilung" id="PopMassnBerErfolgsbeurteilung4" class="speichern" formular="popmassnber" value="4">
                <label for="PopMassnBerErfolgsbeurteilung4">nicht erfolgreich (0%)</label><br>
                <input type="radio" name="PopMassnBerErfolgsbeurteilung" id="PopMassnBerErfolgsbeurteilung5" class="speichern" formular="popmassnber" value="5">
                <label for="PopMassnBerErfolgsbeurteilung5">unsicher</label>
              </td>
            </tr>
            <tr class='fieldcontain PopMassnBerTxt'>
              <td class="label">
                <label for='PopMassnBerTxt'>Interpretation:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="PopMassnBerTxt" id="PopMassnBerTxt" class="speichern" formular="popmassnber"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="tpopber" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain TPopBerJahr'>
              <td class="label">
                <label for='TPopBerJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopBerJahr" name="TPopBerJahr" class="speichern" formular="tpopber" type="number">
              </td>
            </tr>
            <tr class='fieldcontain TPopBerEntwicklung'>
              <td class="label">
                <label for='TPopBerEntwicklung' class='apf-with-tooltip erforderlich'>
                  <span>Entwicklung:</span>
                </label>
                <div class="tooltiptext">
                  <p>Dieses Feld möglichst immer ausfüllen.</p>
                  <p>Im 1. Jahr der Beobachtung die Entwicklung an der Massnahme beurteilen, nachher an vorhergehenden EK.</p>
                  <table>
                    <tr class='apf-tr-with-border-bottom'>
                      <td>zunehmend:</td>
                      <td>> 10% Zunahme</td>
                    </tr>
                    <tr class='apf-tr-with-border-bottom'>
                      <td>stabil:</td>
                      <td>± 10%</td>
                    </tr>
                    <tr class='apf-tr-with-border-bottom'>
                      <td>abnehmend:</td>
                      <td>> 10% Abnahme</td>
                    </tr>
                    <tr class='apf-tr-with-border-bottom'>
                      <td>erloschen / nicht etabliert:</td>
                      <td>nach 2 aufeinander folgenden Kontrollen ohne Funde oder nach Einschätzung AP-VerantwortlicheR</td>
                    </tr>
                    <tr class='apf-tr-with-border-bottom'>
                      <td>unsicher:</td>
                      <td>keine Funde aber noch nicht erloschen (nach zwei Kontrollen ohne Funde kann Status erloschen/nicht etabliert gewählt werden)</td>
                    </tr>
                  </table>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="TPopBerEntwicklung" id="TPopBerEntwicklung3" class="speichern" formular="tpopber" value="3">
                <label for="TPopBerEntwicklung3">zunehmend</label><br>
                <input type="radio" name="TPopBerEntwicklung" id="TPopBerEntwicklung2" class="speichern" formular="tpopber" value="2">
                <label for="TPopBerEntwicklung2">stabil</label><br>
                <input type="radio" name="TPopBerEntwicklung" id="TPopBerEntwicklung1" class="speichern" formular="tpopber" value="1">
                <label for="TPopBerEntwicklung1">abnehmend</label><br>
                <input type="radio" name="TPopBerEntwicklung" id="TPopBerEntwicklung8" class="speichern" formular="tpopber" value="8">
                <label for="TPopBerEntwicklung8">erloschen / nicht etabliert</label><br>
                <input type="radio" name="TPopBerEntwicklung" id="TPopBerEntwicklung4" class="speichern" formular="tpopber" value="4">
                <label for="TPopBerEntwicklung4">unsicher</label>
              </td>
            </tr>
            <tr class='fieldcontain TPopBerTxt'>
              <td class="label">
                <label for='TPopBerTxt'>Bemerkungen:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="TPopBerTxt" id="TPopBerTxt" class="speichern" formular="tpopber"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="tpopmassnber" class="form" action="#" method="get" autocomplete="off">
          <table>
            <tr class='fieldcontain TPopMassnBerJahr'>
              <td class="label">
                <label for='TPopMassnBerJahr'>Jahr:</label>
              </td>
              <td class="Datenfelder">
                <input id="TPopMassnBerJahr" name="TPopMassnBerJahr" class="speichern" formular="tpopmassnber" type="number">
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnBerErfolgsbeurteilung'>
              <td class="label">
                <label for='TPopMassnBerErfolgsbeurteilung' class='apf-with-tooltip erforderlich'>
                  <span>Entwicklung:</span>
                </label>
                <div class="tooltiptext">
                  <p>Dieses Feld möglichst immer ausfüllen.</p>
                  <p>Die aktuelle Kontrolle wird im Vergleich zu allen bisherigen Massnahmen beurteilt.</p>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="TPopMassnBerErfolgsbeurteilung" id="TPopMassnBerErfolgsbeurteilung1" class="speichern" formular="tpopmassnber" value="1">
                <label for="TPopMassnBerErfolgsbeurteilung1">sehr erfolgreich (>= 150%)</label><br>
                <input type="radio" name="TPopMassnBerErfolgsbeurteilung" id="TPopMassnBerErfolgsbeurteilung2" class="speichern" formular="tpopmassnber" value="2">
                <label for="TPopMassnBerErfolgsbeurteilung2">erfolgreich (90 - 149%)</label><br>
                <input type="radio" name="TPopMassnBerErfolgsbeurteilung" id="TPopMassnBerErfolgsbeurteilung3" class="speichern" formular="tpopmassnber" value="3">
                <label for="TPopMassnBerErfolgsbeurteilung3">weniger erfolgreich (1 - 89%)</label><br>
                <input type="radio" name="TPopMassnBerErfolgsbeurteilung" id="TPopMassnBerErfolgsbeurteilung4" class="speichern" formular="tpopmassnber" value="4">
                <label for="TPopMassnBerErfolgsbeurteilung4">nicht erfolgreich (0%)</label><br>
                <input type="radio" name="TPopMassnBerErfolgsbeurteilung" id="TPopMassnBerErfolgsbeurteilung5" class="speichern" formular="tpopmassnber" value="5">
                <label for="TPopMassnBerErfolgsbeurteilung5">unsicher</label>
              </td>
            </tr>
            <tr class='fieldcontain TPopMassnBerTxt'>
              <td class="label">
                <label for='TPopMassnBerTxt'>Interpretation:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="TPopMassnBerTxt" id="TPopMassnBerTxt" class="speichern" formular="tpopmassnber"></textarea>
              </td>
            </tr>
          </table>
        </form>

        <form id="beob" class="form" action="#" method="get" autocomplete="off">
          <h1>Informationen des Aktionsplans</h1>
          <table>
            <tr class="fieldcontain">
              <td class="label">
                <label for='beobNichtBeurteilt'>Nicht beurteilt:</label>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="beobNichtZugeordnet" id="beobNichtBeurteilt" formular="beob">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='beobNichtZuordnen' class='apf-with-tooltip'>
                  <span>Nicht zuordnen:</span>
                </label>
                <div class="tooltiptext">
                  <p>Will heissen: Die Beobachtung kann nicht zugeordnet werden</p>
                  <p>Mögliche Gründe: Unsichere Bestimmung, nicht lokalisierbar</p>
                  <p>Bitte im Bemerkungsfeld begründen</p>
                </div>
              </td>
              <td class="Datenfelder">
                <input type="radio" name="beobNichtZugeordnet" id="beobNichtZuordnen" formular="beob">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for='BeobBemerkungen'>Bemerkungen zur Zuordnung:</label>
              </td>
              <td class="Datenfelder">
                <textarea name="BeobBemerkungen" id="BeobBemerkungen" class="speichern" formular="beob"></textarea>
              </td>
            </tr>
          </table>
          <table id="beob_zuordnungsfelder">
          </table>
          <table>
            <tr class="fieldcontain">
              <td class="label">
                <label for="BeobMutWann">Zuletzt verändert...</label>
              </td>
              <td class="Datenfelder">
                <input id="BeobMutWann" class="Datenfelder Datum" formular="beob" type="text" readonly="readonly" style="border:none;">
              </td>
            </tr>
            <tr class="fieldcontain">
              <td class="label">
                <label for="BeobMutWer">...von:</label>
              </td>
              <td class="Datenfelder">
                <input id="BeobMutWer" class="Datenfelder" formular="beob" type="text" readonly="readonly" style="border:none;">
              </td>
            </tr>
          </table>
          <hr>
          <div id="beob_table">
          </div>
        </form>

        <div id="gMap" class="karte">
          <button id='gMapDistanzMessen'>Distanz messen</button>
          <button id='gMapDistanzMessenEntfernen'>Messung entfernen</button>
          <div class="gMapDetailplaeneDiv"><input id="gMapDetailplaeneCheckbox" type="checkbox" class="gMapDetailplaeneCheckbox"><label for="gMapDetailplaeneCheckbox">Detailpläne</label></div>
          <div id="gMapDiv" style="width:100%; height:100%;">
          </div>
        </div>
        
        <div id="olMap" class="karte">
          <div id="olMapDiv">
            <div id='olMapMenuleiste'>
              <span id="olMapMessen">
                <input type="radio" name="type" value="olMapInfosAbfragen" id="olMapInfosAbfragen" onclick="window.apf.olMap.messe(this);" checked="checked">
                <label id="label_olmap_infos_abfragen" for="olMapInfosAbfragen" title="Infos abfragen: auf Objekte klicken<br>Zoomen: Mausrad drehen<br>Auf Rechteck Zoomen: Shift-Taste halten und mit der Maus ein Rechteck aufziehen">Infos abfragen</label>
                <input type="radio" name="type" value="line" id="olMapDistanzMessen" onclick="window.apf.olMap.messe(this);">
                <label id="label_olmap_distanz_messen" for="olMapDistanzMessen" title="Klicken um Punkte zu setzen<br>Doppelklicken um die Messung abzuschliessen">Distanz messen</label>
                <input type="radio" name="type" value="polygon" id="olMapFlaecheMessen" onclick="window.apf.olMap.messe(this);">
                <label id="label_olmap_flaeche_messen" for="olMapFlaecheMessen" title="Klicken um Punkte zu setzen<br>Doppelklicken um die Messung abzuschliessen">Fläche messen</label>
                <input type="radio" name="type" value="drawPolygon" id="olMapAuswaehlen" onclick="window.apf.olMap.waehleAus();">
                <label id="label_olmap_auswaehlen" for="olMapAuswaehlen" title="Einzelne Objekte wählen: drauf klicken<br>Weitere hinzufügen: SHIFT-Taste halten und weitere Objekte anklicken<br>Rechteck wählen: ALT-Taste halten und mit der Maus ein Rechteck aufziehen<br>Auswahl löschen: auf einen leeren Bereich der Karte klicken">auswählen</label>
              </span>
              <ol id='olMapErgebnisMessung' reversed></ol>
              <div id='olMapErgebnisAuswahl'>
                <div id='olMapErgebnisAuswahlHeader'>
                  <div id='olMapErgebnisAuswahlHeaderText'></div>
                  <a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button">
                    <span class="ui-icon ui-icon-closethick">schliessen</span>
                  </a>
                </div>
                <div id='olMapErgebnisAuswahlListe'>
                </div>
                <div id='olMapErgebnisAuswahlFooter'>
                </div>
              </div>
            </div>
            <div id="olMapExportierenDiv" title="Karte als png herunterladen<br>Diese Funktion ist inaktiv<br>Um sie zu aktivieren, müssen Sie die Karte verkleinern<br>Packen Sie dazu die untere rechte Ecke und ziehen Sie sie nach oben links">
              <a id="olMapExportieren" download="map.png">Karte als png herunterladen</a>
            </div>
            <div id="olMapLayertree" class="accordion">
              <h3 style="font-weight:bold;">Ebenen</h3>
              <div id="olMapLayertreeLayers" class="accordion"></div>
            </div>
          </div>
          <div style="display:none;">
            <div id="olMapPopup" class="olMapPopup"></div>
          </div>
          <div id="olMapEigeneEbeneNameContainer" style="display:none">
            <input id="olMapEigeneEbeneName" type="text" placeholder="hier benennen...">
          </div>
        </div>

        <form id="exporte">
          <a name="top"></a>
          <h2 style='-webkit-margin-before: 0em;'>Exporte</h2>
          <ul style="font-weight:bold; -webkit-padding-start: 22px; -webkit-margin-before: 0.5em;">
            <li><a href="#Anleitung">So geht's</a></li>
            <li><a href="#ProgrammArt">Programm / Art</a></li>
            <li><a href="#Populationen">Populationen</a></li>
            <li><a href="#Teilpopulationen">Teilpopulationen</a></li>
            <li><a href="#Kontrollen">Kontrollen</a></li>
            <li><a href="#Massnahmen">Massnahmen</a></li>
            <li><a href="#Beobachtungen">Beobachtungen</a></li>
            <li><a href="#Anwendung">Anwendung</a></li>
          </ul>

          <a name="Anleitung"></a>
          <h2 class="borderTop">So geht's</h2>
          <p>Hier sind alle Auswertungen (bzw. Abfragen, Kontrollen, Listen).</p>
          <p>Die Daten werden direkt als mit Kommas getrennte .csv-Datei heruntergeladen.</p>
          <p>Diese Datei kann nach dem Download auf zwei Arten geöffnet werden:</p>
          <ol>
            <li>Heruntergeladene Datei doppelklicken. Meist wählt das Betriebssystem ein geeignetes Programm, um die Datei damit zu öffnen und dieses Programm erkennt am Datenformat, dass der Importassistent geöffnet werden muss. In Excel funktioniert dies häufig nicht!</li>
            <li>Gewünschtes Programm öffnen und damit die heruntergeladene Datei öffnen oder die Daten importieren</li>
          </ol>
          <div style="padding:10px 5px 10px 5px; margin-right:10px; border-radius:5px; background-color: #FFDA8F; box-shadow: 5px 5px 5px #888;"><b>ACHTUNG: Microsoft Excel braucht Streicheleinheiten:</b>
            <ol style="-webkit-margin-after: 0em; -webkit-margin-before: 0.5em;">
              <li>Excel öffnen</li>
              <li>"Daten" > "Externe Daten abrufen" > "Aus Text" wählen</li>
              <li>Nun erscheit der Textkonvertierungs-Assistent. Im Schritt 1 als Dateiursprung statt dem vorgegebenen "Windows (ANSI)" dies hier wählen: "65001 : Unicode (UTF-8)". Excel versteht sonst partout keine Umlaute</li>
              <li>Vorsicht: Excel ist fähig, die importierten Daten nach eigenem Ermessen willkürlich zu vermanschen. Daher bitte obige Tipps missachten und Excel nur für die Auswertung von Daten benutzten - nicht im .csv-Dateien zu öffnen.</li>
            </ol>
          </div>
          <p>Um .csv-Dateien zu öffnen ist <a href="https://de.libreoffice.org/" target="_blank">Libre Office</a> sehr empfehlenswert: 1. Mit Libre Office öffnen, 2. als .xlsx-Datei speichern, 3. mit Excel öffnen und auswerten.</p>
          <p>Fragt das Programm, mit welchem Zeichen die einzelnen Felder getrennt werden? Es sind Kommas.</p>
          <p>Zeigt das Programm nach dem Öffnen ungeordnete Daten an? Dann muss die Datei nochmals geöffnet werden und dabei ist die Option zu suchen, mit der eine Trennung der Felder mittels Kommas erzwungen werden kann. Vielleicht muss wie in Excel statt dem Öffnen-Befehl ein Import-Befehl verwendet werden. Vorsicht: Es sollte nicht noch zusätzlich eine andere Option gewählt sein, z.B. Trennung durch Strichpunkte.</p>
          <div style="padding:10px 5px 10px 5px; margin-right:10px; border-radius:5px; background-color: #FFDA8F; box-shadow: 5px 5px 5px #888;"><b>Enthält der Export zuviele Daten?</b><br>
            Meist werden alle verfügbaren Datensätze und Felder angezeigt. Daher können Listen sehr viele Zeilen und Spalten enthalten und unübersichtlich werden.
            <ul style="-webkit-margin-after: 0em; -webkit-margin-before: 0.5em;">
              <li>Filtere die Zeilen nach den gewünschten Kriterien</li>
              <li>Blende unerwünschte Spalten aus (oder lösche sie)</li>
            </ul>
          </div>
          <p>Ist nach dem Herunterladen das Exportformular verschwunden und es muss wieder ein Programm gewählt werden? In Safari auf Mac scheint das leider die Standardeinstellung zu sein. Man kann dies korrigieren: "Safari" > "Tabs" > "Neue Tabs oder Fenster im Vordergrund öffnen" wählen. Falls das auf einem anderen Browser passiert: Einstellungen suchen, die das Öffnen von neuen Tabs beeinflussen und ausprobieren.</p>

          <br><a href="#top">&uArr;&nbsp;top</a>

          <div class="exportAbschnitt">
            <a name="ProgrammArt"></a>
            <h2 class="borderTop">Programm / Art</h2>
            <div class="exportAbschnittExporte">
              <button id="exportAp" class="export" view="v_ap" filename="Programme">Programme</button><br>
              <button id="exportApOhnePop" class="export" view="v_ap_ohnepop" filename="ProgrammeOhnePopulationen">Programme ohne Populationen</button><br><br>

              <button id="exportApAnzMassn" class="export" view="v_ap_anzmassn" filename="ProgrammeAnzahlMassnahmen">Anzahl Massnahmen pro Programm</button><br>
              <button id="exportApAnzKontr" class="export" view="v_ap_anzkontr" filename="ProgrammeAnzahlKontrollen">Anzahl Kontrollen pro Programm</button><br><br>

              <button id="exportJber" class="export" view="v_apber" filename="Jahresberichte">AP-Berichte (Jahresberichte)</button><br>
              <button id="exportJberMassn" class="export" view="v_ap_apberundmassn" filename="ApJahresberichteUndMassnahmen">AP-Berichte und Massnahmen</button><br><br>

              <button id="exportApziel" class="export" view="v_ziel" filename="ApZiele">Ziele</button><br><br>

              <button id="exportZielber" class="export" view="v_zielber" filename="Zielberichte">Ziel-Berichte</button><br><br>

              <button id="exportBer" class="export" view="v_ber" filename="Berichte">Berichte</button><br><br>

              <button id="exportErfkrit" class="export" view="v_erfkrit" filename="Erfolgskriterien">Erfolgskriterien</button><br><br>

              <button id="exportIdealbiotop" class="export" view="v_idealbiotop" filename="Idealbiotope">Idealbiotope</button><br><br>

              <button id="exportAssozArten" class="export" view="v_assozart" filename="AssoziierteArten">Assoziierte Arten</button><br>
            </div>
            <br><br><a href="#top">&uArr;&nbsp;top</a>
          </div>
          <div class="exportAbschnitt">
            <a name="Populationen"></a>
            <h2 class="borderTop">Populationen</h2>
            <div class="exportAbschnittExporte">
              <button id="exportPop" class="exportPop export" view="v_pop" filename="Populationen">Populationen</button><br>
              <button id="exportPopFuerKml" class="GoogleEarthButton export" view="v_pop_kml" filename="ApFloraPopulationen" format="kml">Populationen für Google Earth<br>(beschriftet mit PopNr)</button><br>
              <button id="exportPopFuerKmlNamen" class="GoogleEarthButton export" view="v_pop_kmlnamen" filename="PopulationenNachNamen" format="kml">Populationen für Google Earth<br>(beschriftet mit Artname, PopNr)</button><br>
              <button id="exportPopOhneTpop" class="export" view="v_pop_ohnetpop" filename="PopulationenOhneTeilpopulationen">Populationen ohne Teilpopulationen</button><br>
              <button id="exportPopVonApOhneStatus" class="export" view="v_pop_vonapohnestatus" filename="PopulationenVonApArtenOhneStatus">Populationen von AP-Arten ohne "Status"</button><br>
              <button id="exportPopOhneKoord" class="export" view="v_pop_ohnekoord" filename="PopulationenOhneKoordinaten">Populationen ohne Koordinaten</button><br><br>

              <button id="exportPopMitMassnberAnzMassn" class="export" view="v_popmassnber_anzmassn" filename="PopulationenAnzMassnProMassnber">Populationen mit Massnahmen-Berichten:<br>Anzahl Massnahmen im Berichtsjahr</button><br>
              <button id="exportPopAnzMassn" class="export" view="v_pop_anzmassn" filename="PopulationenAnzahlMassnahmen">Anzahl Massnahmen pro Population</button><br>
              <button id="exportPopAnzKontr" class="export" view="v_pop_anzkontr" filename="PopulationenAnzahlKontrollen">Anzahl Kontrollen pro Population</button><br><br>

              <button id="exportPopberMassnber" class="export" view="v_pop_popberundmassnber" filename="PopulationenPopUndMassnBerichte">Populationen inkl. Populations- und Massnahmen-Berichte</button><br>
            </div>
            <br><a href="#top">&uArr;&nbsp;top</a>
          </div>
          <div class="exportAbschnitt">
            <a name="Teilpopulationen"></a>
            <h2 class="borderTop">Teilpopulationen</h2>
            <div class="exportAbschnittExporte">
              <button id="exportTpop" class="exportTpop export" view="v_tpop" filename="Teilpopulationen">Teilpopulationen</button><br>
              <button id="exportTpopFuerKml" class="export" view="v_tpop_kml" filename="Teilpopulationen" format="kml">Teilpopulationen für Google Earth<br>(beschriftet mit PopNr/TPopNr)</button><br>
              <button id="exportTpopFuerKmlNamen" class="export" view="v_tpop_kmlnamen" filename="TeilpopulationenNachNamen" format="kml">Teilpopulationen für Google Earth<br>(beschriftet mit Artname, PopNr/TPopNr)</button><br>
              <button id="exportTpopOhneBekanntSeit" class="export" view="v_tpop_ohnebekanntseit" filename="TeilpopulationenVonApArtenOhneBekanntSeit">Teilpopulationen von AP-Arten<br>ohne "Bekannt seit"</button><br>
              <button id="exportTpopOhneApBerichtRelevant" class="export" view="v_tpop_ohneapberichtrelevant" filename="TeilpopulationenOhneApBerichtRelevant">Teilpopulationen ohne Eintrag<br>im Feld "Für AP-Bericht relevant"</button><br>
              <button id="exportTpopPopnrTpopnrMehrdeutig" class="export" view="v_tpop_popnrtpopnrmehrdeutig" filename="TeilpopulationenPopnrTpopnrMehrdeutig">Teilpopulationen mit mehrdeutiger<br>Kombination von PopNr und TPopNr</button><br><br>

              <button id="exportTpopAnzMassn" class="export" view="v_tpop_anzmassn" filename="TeilpopulationenAnzahlMassnahmen">Anzahl Massnahmen pro Teilpopulation</button><br>
              <button id="exportTpopAnzKontrInklLetzteInklLetzteTPopBer" class="export" view="v_tpop_anzkontrinklletzterundletztertpopber" filename="TeilpopulationenAnzKontrInklusiveLetzteKontrUndLetztenTPopBericht">Teilpopulationen mit:<ul style='padding-left:15px;margin-top:5px;margin-bottom:10px;'><li>Anzahl Kontrollen</li><li>letzte Kontrolle</li><li>letzter Teilpopulationsbericht</li><li>letzte Zählung</li></ul>= "Eier legende Wollmilchsau"</button>
              <div class='fieldcontain' style="margin-right:5px; margin-bottom:5px; position:relative;">
                <p style='margin-bottom: 3px;'>Die "Eier legende Wollmilchsau" für eine Art:</p>
                <input type="text" id="ewmsApWaehlenText" style="width:100%; font-size:17px; box-sizing:border-box; padding-right:20px;" placeholder="Art wählen">
                <div id="ewmsApWaehlenTextLoeschen" class="ui-icon ui-icon-closethick" style="position:absolute;top:25px;right:4px;cursor:pointer;"></div>
                <input type="number" id="ewmsApWaehlen" style="display:none">
              </div>
              <br><br>

              <button id="exportTpopberMassnber" class="export" view="v_tpop_popberundmassnber" filename="TeilpopulationenTPopUndMassnBerichte">Teilpopulationen inklusive Teilpopulations- und Massnahmen-Berichten</button><br>
            </div>
            <br><a href="#top">&uArr;&nbsp;top</a>
          </div>
          <div class="exportAbschnitt">
            <a name="Kontrollen"></a>
            <h2 class="borderTop">Kontrollen</h2>
            <div class="exportAbschnittExporte">
              <button id="exportKontr" class="exportKontr export" view="v_tpopkontr" filename="Kontrollen">Kontrollen</button><br>
              <button id="exportKontrAnzProZaehleinheit" class="export" view="v_kontrzaehl_anzproeinheit" filename="KontrollenAnzahlProZaehleinheit">Kontrollen: Anzahl pro Zähleinheit</button><br>
            </div>
            <br><a href="#top">&uArr;&nbsp;top</a>
          </div>
          <div class="exportAbschnitt">
            <a name="Massnahmen"></a>
            <h2 class="borderTop">Massnahmen</h2>
            <div class="exportAbschnittExporte">
              <button id="exportMassn" class="exportMassn export" view="v_massn" filename="Massnahmen">Massnahmen</button><br>
            </div>
            <br><a href="#top">&uArr;&nbsp;top</a>
          </div>
          <div class="exportAbschnitt">
            <a name="Beobachtungen"></a>
            <h2 class="borderTop">Beobachtungen</h2>
            <div class="exportAbschnittExporte">
              <button id="exportBeob" class="export" view="v_beob" filename="Beobachtungen">zugeordnete und nicht zuzuordnende Beobachtungen</button><br>
            </div>
            <br><a href="#top">&uArr;&nbsp;top</a>
          </div>
          <div class="exportAbschnitt">
            <a name="Anwendung"></a>
            <h2 class="borderTop">Anwendung</h2>
            <div class="exportAbschnittExporte">
              <button id="exportDatenstruktur" class="export" view="v_datenstruktur" filename="Datenstruktur">Tabellen und Felder</button><br>
            </div>
            <div class="exportAbschnittExporte">
              <button id="exportDatenstrukturGrafisch">Datenstruktur grafisch dargestellt</button><br>
            </div>
            <br><a href="#top">&uArr;&nbsp;top</a>
          </div>
        </form>
      </fieldset>
    </div>

    <div id="anmeldeDialog" title="Anmeldung erforderlich">
      <p id="anmeldungRueckmeldung" style="margin: 16px 0 16px 0;">Logins werden von Topos vergeben</p>
      <label for="anmeldungName" style="display:block;">Name</label>
      <input type="text" id="anmeldungName" style="width:270px; margin: 2px 0 2px 0;" autofocus>
      <label for="anmeldungPasswort" style="display:block;">Passwort</label>
      <input type="password" id="anmeldungPasswort" style="width:270px; margin: 2px 0 2px 0;">
    </div>

    <div id="loeschen_dialog" title="Sind sie sicher?" style="display:none;">
      <p id="loeschen_dialog_mitteilung">Dieser Knoten und alle darunter befindlichen werden unwiederbringlich gelöscht.</p>
    </div>

    <div id="entferneEigeneEbeneDialog" title="Ebene entfernen?" style="display:none;">
      <p id="entferne_eigene_ebene_dialog_mitteilung">Wollen Sie diese Ebene unwiederbringlich entfernen?</p>
    </div>

    <div id="uebertrageBeobZugeordnetKoordInTPopDialog" title="Koordinaten übertragen?" style="display:none;">
      <p id="uebertrageBeobZugeordnetKoordInTPopMitteilung">Wollen Sie die Koordinaten der Teilpopulation mit denjenigen dieser Beobachtung ersetzen?</p>
    </div>

    <div id="Meldung"></div>
    <div id="offline_dialog" title="offline" style="display:none;">
      <p>Sie sind nicht mit dem Internet verbunden.<br>Das Speichern und Abfragen von Daten ist nur online möglich</p>
    </div>

    <script>
      $(document).ready(function () {
        // die folgenden Aktionen müssen direkt von index.html ausgelöst werden
        window.apf.pruefeObAngemeldet()
        window.apf.setupEvents()
        window.apf.setupJqueryUi()
      })
    </script>
  </body>
</html>

`
}
