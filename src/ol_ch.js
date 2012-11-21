function init() {
	//Proxy Host for Ajax Requests to overcome Cross-Domain HTTTP Requests
	//OpenLayers.ProxyHost = "../cgi-bin/proxy.cgi?url=";
	//var zh_bbox_1903 = new OpenLayers.Bounds(669000, 222000, 717000, 284000);

	//buttons initiieren
	$("#messen").buttonset();
	//$("#toggleLayertree").button();

	var api = new GeoAdmin.API();

	api.createMap({
		div: "ga_map",
		easting: 693000,
		northing: 253000,
		zoom: 4
	});

	var zh_uep = new OpenLayers.Layer.WMS("Übersichtsplan Kt. Zürich", "http://wms.zh.ch/upwms", {
		layers: 'upwms',
		//projection: new OpenLayers.Projection("EPSG:4326"),
		//projection: "EPSG:21781",
		isBaseLayer: true
	}, {
		visibility: true,
		singleTile: true
	});
    var zh_av = new OpenLayers.Layer.WMS("ZH Parzellen", "http://wms.zh.ch/avwms", {
		layers: 'RESF',
		transparent: true
	}, {
		opacity: 0.7,
		visibility: false,
		singleTile: true
	});
	var zh_avnr = new OpenLayers.Layer.WMS("ZH Parzellen-Nummern", "http://wms.zh.ch/avwms", {
		layers: 'OSNR',
		transparent: true
	}, {
		opacity: 0.7,
		visibility: false,
		singleTile: true
	});
	var ch_gem2 = new OpenLayers.Layer.WMS("CH Gemeinden 2", "http://wms.geo.admin.ch?", {
		layers: 'ch.swisstopo.swissboundaries3d-gemeinde-flaeche.fill',
		transparent: true
	}, {
		singleTile: true,
		opacity: 0.7,
		visibility: false
	});
	var zh_svo = new OpenLayers.Layer.WMS("ZH SVO farbig", "http://wms.zh.ch/FnsSVOZHWMS", {
		//layers: 'FnsSVOZHWMS',
		layers: 'zonen-schutzverordnungen,ueberlagernde-schutzzonen,schutzverordnungsobjekte,svo-zonen-labels,schutzverordnungsobjekt-nr',
		transparent: true
	}, {
		singleTile: true,
		opacity: 0.7,
		visibility: false
	});
	var zh_svo_raster = new OpenLayers.Layer.WMS("ZH SVO Raster", "http://wms.zh.ch/FnsSVOZHWMS", {
		//layers: 'FnsSVOZHWMS',
		layers: 'zonen-schutzverordnungen-raster,ueberlagernde-schutzzonen,schutzverordnungsobjekte,svo-zonen-labels,schutzverordnungsobjekt-nr',
		transparent: true
	}, {
		singleTile: true,
		//opacity: 0.7,
		visibility: false
	});
	var ch_gemeinden = new OpenLayers.Layer.WMS("CH Gemeinden", "http://wms.geo.admin.ch?", {
		//layers: 'FnsSVOZHWMS',
		layers: 'ch.swisstopo-vd.geometa-gemeinde',
		transparent: true
	}, {
		singleTile: true,
		visibility: false
	});
	var ch_lk1000 = new OpenLayers.Layer.WMS("Landeskarte 1:1'000'000", "http://wms.geo.admin.ch?", {
		layers: 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
		srs: 'EPSG:21781',
		'format': 'png'
	}, {
		singleTile: true,
		visibility: false
	});
	var ch_ktgrenzen = new OpenLayers.Layer.WMS("Kantone", "http://wms.geo.admin.ch?", {
		layers: 'ch.swisstopo.swissboundaries3d-kanton-flaeche.fill',
		srs: 'EPSG:21781',
		'format': 'png'
	}, {
		singleTile: true,
		visibility: false
	});

	//wms hinzufügen
	var ch_tww = new OpenLayers.Layer.WMS("CH TWW", "http://wms.geo.admin.ch", {
		layers: 'ch.bafu.bundesinventare-trockenwiesen_trockenweiden',
		//projection: new OpenLayers.Projection("EPSG:4326"),
		transparent: true
	}, {
		opacity: 0.7,
		visibility: false
	});
	var ch_hm = new OpenLayers.Layer.WMS("CH Hochmoore", "http://wms.geo.admin.ch", {
		layers: 'ch.bafu.bundesinventare-hochmoore',
		//projection: new OpenLayers.Projection("EPSG:4326"),
		transparent: true
	}, {
		opacity: 0.7,
		visibility: false
	});	
	var ch_fm = new OpenLayers.Layer.WMS("CH Flachmoore", "http://wms.geo.admin.ch", {
		layers: 'ch.bafu.bundesinventare-flachmoore',
		transparent: true
	}, {
		opacity: 0.7,
		visibility: false
	});
	var ch_au = new OpenLayers.Layer.WMS("CH Auen", "http://wms.geo.admin.ch", {
		layers: 'ch.bafu.bundesinventare-auen',
		transparent: true
	}, {
		opacity: 0.7,
		visibility: false
	});
	var ch_alg = new OpenLayers.Layer.WMS("CH Amphibien", "http://wms.geo.admin.ch", {
		layers: 'ch.bafu.bundesinventare-amphibien',
		transparent: true
	}, {
		visibility: false,
		opacity: 0.7
	});

	//The complementary layer is per default the color pixelmap.
	api.map.switchComplementaryLayer("voidLayer", {opacity: 1});

	api.map.addLayers([zh_uep, ch_lk1000]);

	api.map.addLayerByName('ch.swisstopo.pixelkarte-farbe-pk25.noscale', {
		visibility: false
	});

	api.map.addLayers([ch_ktgrenzen, zh_av, zh_avnr, ch_gemeinden, zh_svo, zh_svo_raster, ch_tww, ch_fm, ch_hm, ch_au, ch_alg]);

	api.createLayerTree({
		renderTo: "layertree",
		width: 285
	});
	//layertree minimieren
	$(".x-panel-bwrap").css('display', 'none');

	$(".x-panel-header-text").text("Ebenen");

	api.map.addControl(new OpenLayers.Control.MousePosition({numDigits: 0, separator: ' / '}));
	//api.map.addControl(new OpenLayers.Control.KeyboardDefaults());    scheint nicht zu funktionieren

	//messen
	// style the sketch fancy
	var sketchSymbolizers = {
		"Point": {
			pointRadius: 4,
			graphicName: "square",
			fillColor: "white",
			fillOpacity: 1,
			strokeWidth: 1,
			strokeOpacity: 1,
			strokeColor: "#333333"
		},
		"Line": {
			strokeWidth: 3,
			strokeOpacity: 1,
			strokeColor: "red",
			strokeDashstyle: "dash"
		},
		"Polygon": {
			strokeWidth: 2,
			strokeOpacity: 1,
			strokeColor: "red",
			fillColor: "red",
			fillOpacity: 0.3
		}
	};
	var style = new OpenLayers.Style();
	style.addRules([
		new OpenLayers.Rule({symbolizer: sketchSymbolizers})
	]);
	var styleMap = new OpenLayers.StyleMap({"default": style});

	measureControls = {
		line: new OpenLayers.Control.Measure(
			OpenLayers.Handler.Path, {
				persist: true,
				handlerOptions: {
					layerOptions: {
						styleMap: styleMap
					}
				}
			}
		),
		polygon: new OpenLayers.Control.Measure(
			OpenLayers.Handler.Polygon, {
				persist: true,
				handlerOptions: {
					layerOptions: {
						styleMap: styleMap
					}
				}
			}
		)
	};
	
	var control;
	for(var key in measureControls) {
		control = measureControls[key];
		control.events.on({
			"measure": handleMeasurements,
			"measurepartial": handleMeasurements
		});
		api.map.addControl(control);
	}
	
	$('karteSchieben').checked = true;

	$("#layertree").on("click", "#toggleLayertree", function() {
		oeffneSchliesseLayertree();
	});
};

function oeffneSchliesseLayertree() {
	//ein hübscher Übergang wäre nett
	if ($(".x-panel-bwrap").css('display') !== 'none') {
		$(".x-panel-bwrap").css('display', 'none');
	} else {
		$(".x-panel-bwrap").css('display', 'inline');
	}
}

function handleMeasurements(event) {
	var geometry = event.geometry;
	var units = event.units;
	var order = event.order;
	var measure = event.measure;
	var element = document.getElementById('ergebnisMessung');
	var out = "";
	if(order == 1) {
		out += measure.toFixed(3) + " " + units;
	} else {
		out += measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
	}
	element.innerHTML = out;
}

function messe(element) {
	for(key in measureControls) {
		var control = measureControls[key];
		if(element.value == key && element.checked) {
			control.activate();
		} else {
			control.deactivate();
			$("#ergebnisMessung").text("");
		}
	}
}