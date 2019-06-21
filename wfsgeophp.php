<?php
	$wfsUrl = file_get_contents("http://gis.jogjaprov.go.id/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3Ageologi_ar_100k_rev&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature");

	echo($wfsUrl);
	# Jika terdapat &maxFeatures=50 pada url wfs geojson, dihapus supaya jumlah feature tidak dibatasi
?>

