<?php
// Verbindung aufbauen, Datenbank auswählen
$link = new mysqli("barbalex.ch", "alexande", "excalibu", "alexande_apflora");

/* check connection */
if ($link->connect_errno) {
    printf("Connect failed: %s\n", $link->connect_error);
    exit();
}

$ApArtId = $_GET["id"];
settype($id, "integer");

// SQL-Anfrage ausführen
$result = mysqli_query($link, "SELECT * FROM tblAktionsplan WHERE ApArtId = $ApArtId");

//$rows = array();
/*while($r = mysql_fetch_assoc($result)) {
	$ApArtId = $r['ApArtId'];
	settype($ApArtId, "integer");
	$row = array("Artname" => utf8_encode($r['Artname']), "id" => $ApArtId);
    $rows[] = $row;
}*/


while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

//in json verwandeln
$return = json_encode($rows);

print($return);

// Resultset freigeben
mysqli_free_result($result);

// Verbindung schliessen
mysqli_close($link);
?>