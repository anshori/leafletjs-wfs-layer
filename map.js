/* Initial map */
var map = L.map('map').setView([-7.9,110.45],10);

/* Tile basemap */
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="http://www.unsorry.net" target="_blank">unsorry@2019</a>'
});
basemap.addTo(map);

/* GeoJSON layer */
var geojsonlayerColor = {"KRB I":"#ffcc00", "KRB II":"#ff99cc", "KRB III":"#ff0066"};
var geojsonlayer = L.geoJson(null, {
  style: function (feature) {
	return {
	  fillColor: geojsonlayerColor[feature.properties.Rawan_Benc],
	  fillOpacity: 0.7, 
	  color: "black",
	  weight: 1,
	  opacity: 1,
	};
  },
  onEachFeature: function (feature, layer) {
    var content = "<b>Rawan Bencana " + feature.properties.Rawan_Benc + "</b><br>" +
      "Sumber: " + feature.properties.SUMBER + "<br><hr>" +
      "<font style='font-size: 10px;'>Sumber: <a href='http://geoportal.slemankab.go.id/geoserver/geonode/wms?service=WMS&version=1.1.0&request=GetMap&layers=geonode:rawan_gunung_api&styles=&bbox=110.270125886,-7.79777489899993,110.491081062,-7.54116155899991&width=661&height=768&srs=EPSG:4326&format=application/openlayers' target='_blank'>http://geoportal.slemankab.go.id/</a></font>";
    layer.on({
  	  mouseover: function (e) {
  			var layer = e.target;
  			layer.setStyle({
  			  weight: 1,
  			  color: "black",
  			  opacity: 1,
  			  fillColor: "cyan",
  			  fillOpacity: 0.7,
  			});
        geojsonlayer.bindTooltip(feature.properties.Rawan_Benc, {sticky: true});
  	  },
  	  mouseout: function (e) {
  			geojsonlayer.resetStyle(e.target);
  	  },
  	  click: function (e) {
        geojsonlayer.bindPopup(content);
  	  }
  	});
  }
});
$.getJSON("wfsgeophp.php", function (data) {
  geojsonlayer.addData(data);
  map.addLayer(geojsonlayer);
  map.fitBounds(geojsonlayer.getBounds());
});

/* Scale bar */
L.control.scale({maxWidth: 150}).addTo(map);