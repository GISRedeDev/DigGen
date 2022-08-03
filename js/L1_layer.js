export let breaks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export let colors = ["#b2df8a", "#ff0000", "#ff6f00", "#ffb700", "#d2ff69", "#91ffb4", "#00ffff", "#38acff", "#3661ff", "#0000ff"];

export function get_color(d) {
    for (let i = 0;
    i < breaks.length; i++) {
        if (d > breaks[i] && d <= breaks[i + 1]) {
            return colors[i];
        }
    }
}

export function style(feature) {

    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: get_color(feature.properties.su_dif)
    };
}

export function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

export function resetHighlight(e, _layer) {
    _layer.resetStyle(e.target);
}

export function zoomToFeature(e, _map) {
    var layer = e.target;

    _map.fitBounds(e.target.getBounds());

}

export function onEachFeature(feature, layer, _map, _layer) {
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: function (e) {
            resetHighlight(e.target, _layer);
        },
        click: function (e) {
            zoomToFeature(e, _map);
        }
    });
}


export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


export function load_layer(iso, year, month, _map, _layer) {

    //api 

    fetch('./data/L1_geojson/'+iso+'_L1_0.008.geojson').then(
            function (u) {
                return u.json();
            }
    ).then(
            function (json) {
                
                if (mdebug === true) {
                    console.log(json.features);
                }

                for (var i = 0; i < json.features.length; i++) {
                    json.features[i].properties.su_dif = getRandomArbitrary(1, 10);
                }

                _layer.addData(json);
            }
    );
    _layer.addTo(_map);
}

