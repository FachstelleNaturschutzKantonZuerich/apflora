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

$view = 'vApJahresberichteUndMassnahmen'; // view you want to export
$file = 'ApJahresberichteUndMassnahmen'; // csv name.

$result = mysqli_query($link, "SHOW COLUMNS FROM ".$view."");
$i = 0;
 
if (mysqli_num_rows($result) > 0) {
	while ($row = mysqli_fetch_assoc($result)) {
		$csv_output .= $row['Field']."\t";
	$i++;}
}
$csv_output .= "\n";
$values = mysqli_query($link, "SELECT * FROM ".$view."");
 
while ($rowr = mysqli_fetch_row($values)) {
	for ($j=0;$j<$i;$j++) {
		$csv_output .= $rowr[$j]."\t";
	}
	$csv_output .= "\n";
}
 
$filename = $file."_".date("Y-m-d_H-i",time());

header('Content-Type: text/x-csv');
header('Expires: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Content-Disposition: attachment; filename='.$filename.'.csv');
header('Pragma: no-cache');

print($csv_output);

// Resultset freigeben
mysqli_free_result($result);

// Verbindung schliessen
mysqli_close($link);
?>