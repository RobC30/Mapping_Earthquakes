// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let satstreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([36.1733, -120.1794],7)
let map = L.map('mapid', {
    center : [43.7,-79.3],
    zoom: 11,
    layers: [streets]
})

// Create a base layer that holds both maps.
let baseMaps = {
    Light: streets,
    Sattelite: satstreets
  }

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods = 'https://raw.githubusercontent.com/RobC30/Mapping_Earthquakes/main/Mapping_GeoJSON_Polygons/static/js/torontoNeighborhoods.json'


// --------------------------------- //

d3.json(torontoHoods).then(function(data) {
    console.log(data)
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    color: 'orange',
    fillColor: 'yellow',
    weight: 1,
    onEachFeature: function(feature, layer){
        layer.bindPopup('<h2>Neighborhood: ' + feature.properties.AREA_NAME + '</h2>')
  }
}).addTo(map)
})
