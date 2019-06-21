/* Initial map */
var map = L.map('map').setView([-7.9,110.45],10);

/* Tile basemap */
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="http://www.unsorry.net" target="_blank">unsorry@2019</a>'
});
basemap.addTo(map);

/* GeoJSON layer */
var geojsonlayerColor = {"A":"#81c8d9", "Qa":"#a6e91e", "Qc":"#ed4823", "Qmi":"#58d38f", "Qmo":"#6066e4", "Teon":"#6128db", "Tmj":"#d153c9", "Tmng":"#62c9b6", "Tmo":"#ca2482", "Tmpk":"#1fca2a", "Tmps":"#af58d7", "Tms":"#cec213", "Tmss":"#d98f2d", "Tmw":"#98df7a", "Tmwl":"#6aa1e8", "Tomk":"#e84e6a"};
var geojsonlayer = L.geoJson(null, {
  style: function (feature) {
	return {
	  fillColor: geojsonlayerColor[feature.properties.kode],
	  fillOpacity: 0.7, 
	  color: "black",
	  weight: 1,
	  opacity: 1,
	};
  },
  onEachFeature: function (feature, layer) {
    var content = "<b>Formasi " + feature.properties.FORMASI + "</b><br>" +
      "Kode: " + feature.properties.kode + "<br><hr>" +
      "<font style='font-size: 10px;'>Sumber: <a href='http://gis.jogjaprov.go.id/layers/geonode:geologi_ar_100k_rev' target='_blank'>http://gis.jogjaprov.go.id</a></font>";
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
        geojsonlayer.bindTooltip(feature.properties.kode);
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
});

/* Scale bar */
L.control.scale({maxWidth: 150}).addTo(map);