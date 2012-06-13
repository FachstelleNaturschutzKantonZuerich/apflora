<?php
// Verbindung aufbauen, Datenbank auswählen
$link = new mysqli("barbalex.ch", "alexande", "excalibu", "alexande_apflora");
//$link = new mysqli("127.0.0.1", "root", "admin", "apflora");

/* check connection */
if ($link->connect_errno) {
    printf("Connect failed: %s\n", $link->connect_error);
    exit();
}

mysqli_set_charset($link, "utf8");

$id = $_GET["id"];
settype($id, "integer");

// SQL-Anfrage ausführen
$result = mysqli_query($link, "SELECT BeobId, TPopId, Name, StatusText, IdZdsf, IdEvab, tblBeobachtungen.NR, Projekt, RaumGde, Ort, X, Y, Datum, Jahr, Anzahl, tblBeobachtungen.Autor, Herkunft, DistZurTPop, MutWann, MutWer, Name FROM (ArtenDb_tblFloraSisf INNER JOIN tblBeobachtungen ON ArtenDb_tblFloraSisf.NR = tblBeobachtungen.NR) LEFT JOIN DomainFloraStatus ON Status = StatusWert WHERE BeobId=".$id);
$row = mysqli_fetch_assoc($result);

//in json verwandeln
$return = json_encode($row);

print($return);

// Resultset freigeben
mysqli_free_result($result);

// Verbindung schliessen
mysqli_close($link);
?>