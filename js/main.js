var mdebug = true;
var wd_geojson;
var curent_zoom = 0;

var featureByName = {};

const config_plot_xy_Chart = {
    type: 'line',
    data: {},
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
};

import * as _worldLayer from './wd_layer.js'
import * as _L1Layer from './L1_layer.js' 
import * as _plot_xy from './plot_xy.js'

var basemaps = {
        "OpenStreetMaps": L.tileLayer(
            "https://cartodb-basemaps-b.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png", {
                attribution: "<a href='http://www.esri.com/'>Esri</a>, HERE, Garmin, (c) OpenStreetMap",
                minZoom: 1,
                maxZoom: 14,
                id: "osm.streets"
            }
        )
    };

    var mapOptions = {
        zoomControl: false,
        attributionControl: false,
        center: [0.09, 18.54],
        zoom: 4,
        maxZoom: 11,
        layers: [basemaps.OpenStreetMaps]
    };


var map = L.map("map", mapOptions);

 var plot_xy_control = L.control({
        position: 'bottomright'
});

plot_xy_control.onAdd = function(map) {
        var legent_text = "Population ";
        // Create Div Element and Populate it with HTML
        var div = L.DomUtil.create('div', 'leaflet-control-plot_xy');
        div.setAttribute('id',"plot_xy_div_id");
        div.innerHTML += '<div id="plot_xy_div">\n\
        <span id="plot_xy_span_close" style="">\n\
        <i class="fa fa-times"></i>\n\
        </span>\n\
        <canvas id="plot_xy_Chart"></canvas>\n\
        </div>';
        return div;
};

plot_xy_control.addTo(map);
_plot_xy.plot_xy_display("hide");

var xy_Chart = new Chart(
    document.getElementById('plot_xy_Chart'),
    config_plot_xy_Chart
);

var sidebar = L.control.sidebar('sidebar', {
        position: 'right',
        autopan: true
}).addTo(map);
sidebar.open("home");

var L1_layer = L.geoJson(null, {
       style: _L1Layer.style,
        onEachFeature: function(feature, layer) {
                
                layer.on({
                    mouseover: function (e) {
                        
                        if (mdebug === true) console.log( "hove over sub");
                        _plot_xy.plot_xy_display("show");
                        _plot_xy.plot_xy(xy_Chart, "s");
                        
                    }
                });
      }.bind(this)       
});




var wd_layer_grey = L.geoJson(null, {
        style: {
            "color": "grey",        
            "fill":  "grey",         
            "opacity": 0.5
        },
        onEachFeature: function(feature, layer) {
                
                layer.on({
                    click: function (e) {
                        curent_zoom = map.getBoundsZoom(e.target.getBounds());
                        
                        L1_layer.clearLayers();
                        map.removeLayer(L1_layer);
                        var layer = e.target;
                        var iso3 = layer.feature.properties.iso_a3;
                        
                        // map.fitBounds(e.target.getBounds());
                        
                        _L1Layer.load_layer(iso3, 2000, 1, map, L1_layer); 
                       
                        map.fitBounds(e.target.getBounds());
                        if (mdebug === true) console.log( "curent_zoom getBoundsZoom: " + curent_zoom );
                        
                        _plot_xy.plot_xy_display("hide");
                        
                        
                    }
                });
      }.bind(this)
      
});


var wd_layer = L.geoJson(null, {
        style: _worldLayer.style,
        onEachFeature: function(feature, layer) {
            featureByName[feature.properties.iso_a3] = layer;
               layer.on({
                    mouseover: _worldLayer.highlightFeature,
                    mouseout: function (e) {
                                _worldLayer.resetHighlight(e.target, wd_layer);
                            },
                    click: function (e) {
                                _plot_xy.plot_xy_display("hide");
                                curent_zoom = map.getBoundsZoom(e.target.getBounds());
                                console.log( "curent_zoom getBoundsZoom: " + curent_zoom );
                                _worldLayer.zoomToFeature(e, map, wd_layer, wd_layer_grey, L1_layer, 2000, 2);
                                _plot_xy.plot_xy_display("hide");
        
                            }
                        });             
      }.bind(this)
});



// https://api.jquery.com/jQuery.getJSON/
var jqxhr = $.getJSON( "./data/world_med.geo.json", function() {
  if (mdebug === true) console.log( "success loading geojson" );
})
  .done(function(data ) {
      
      wd_geojson=data;
      _worldLayer.load_layer(2020, 1, map, wd_layer, wd_geojson);
      wd_layer_grey.addData(wd_geojson);

    
  })
  .fail(function(e) {
    if (mdebug === true) console.log( e );
  })
  .always(function() {
    if (mdebug === true) console.log( "complete loading geojson" );
});




   map.on('click', function(e) {  
       if (mdebug === true) console.log( "click on the map ");
   });
    
//  map.once('zoomend moveend', function(){});
  
  map.on('zoomend', function() {
    
        if (mdebug === true) {
            console.log("Zoom1 : " + map.getZoom());
        }    
        if(map.hasLayer(L1_layer)){
            if (mdebug === true) console.log("L1_layer :  on map" );
            if (mdebug === true) console.log("curent_zoom " + curent_zoom );   
                
            if (map.getZoom() < curent_zoom ) {
                L1_layer.clearLayers();
                map.removeLayer(L1_layer);
                map.removeLayer(wd_layer_grey);
                _worldLayer.load_layer(2020, 1, map, wd_layer, wd_geojson);
            }                
        }            
   
    
    }); 
    

        
        
    $("#select_iso").change(function() {
            var country = $("#select_iso").val();
            map.fitBounds(featureByName[country].getBounds(), {});
            featureByName[country].fire('click');
            if (mdebug === true) console.log("selected " + country); 
    });     

    $("#plot_xy_span_close").click(function(event) {
        if (mdebug === true) console.log("clicked on close button ");
        
        if (plot_xy_control._map){
            //map.removeControl(plot_xy_control);
            //plot_xy_control.remove();
            _plot_xy.plot_xy_display("hide");
        }        
        //plot_xy_control.removeFrom(map);
        event.stopPropagation();
    });  


