<?php
// Verbindung aufbauen, Datenbank auswählen

$link = new mysqli("localhost", "alexande", "y3oYksFsQL49es9x", "alexande_apflora");

/* check connection */
if ($link->connect_errno) {
    printf("Connect failed: %s\n", $link->connect_error);
    exit();
}

mysqli_set_charset($link, "utf8");

$TPopId = $_POST["tpop_id"];
settype($TPopId, "integer");
$TPopMassnId = $_POST["tpopmassn_id"];
settype($TPopMassnId, "integer");
$user = $_POST["user"];
$time = date('Y-m-d H:i:s');

$Querystring = 'UPDATE tblTeilPopMassnahme SET TPopId="'.mysqli_real_escape_string($link, $TPopId).'", MutWann="'.mysqli_real_escape_string($link, $time).'", MutWer="'.mysqli_real_escape_string($link, $user).'" WHERE TPopMassnId='.mysqli_real_escape_string($link, $TPopMassnId);

// SQL-Anfrage ausführen
$result = mysqli_query($link, $Querystring);

if (!$result) {
	print "Fehler: Die Massnahme wurde nicht verschoben";
}

// Verbindung schliessen
mysqli_close($link);
?>