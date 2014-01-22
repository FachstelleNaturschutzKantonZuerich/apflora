<?php
// Verbindung aufbauen, Datenbank auswählen

$link = new mysqli("localhost", "alexande", "y3oYksFsQL49es9x", "alexande_apflora");

/* check connection */
if ($link->connect_errno) {
    printf("Connect failed: %s\n", $link->connect_error);
    exit();
}

mysqli_set_charset($link, "utf8");

$ZielId = $_GET["id"];
settype($ZielId, "integer");

// SQL-Anfrage ausführen
$result = mysqli_query($link, "SELECT * FROM tblZiel WHERE ZielId=".mysqli_real_escape_string($link, $ZielId));

$row = mysqli_fetch_assoc($result);

// in json verwandeln
$return = json_encode($row);

print($return);

// Resultset freigeben
mysqli_free_result($result);

// Verbindung schliessen
mysqli_close($link);
?>