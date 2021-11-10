// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let navnight = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([36.1733, -120.1794],7)
let map = L.map('mapid', {
    center : [44,-80],
    zoom: 2,
    layers: [navnight]
})

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Night: navnight
  }

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = 'https://raw.githubusercontent.com/RobC30/Mapping_Earthquakes/main/Mapping_GeoJSON_Linestrings/static/js/torontoRoutes.json'


// --------------------------------- //

d3.json(airportData).then(function(data) {
    console.log(data)
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    color: 'orange',
    weight: 2,
    onEachFeature: function(feature, layer){
        layer.bindPopup('<h2>Airline: ' + feature.properties.airline + '</h2> <hr> <h3> Destination: '+feature.properties.dst+'</h3>')
  }
}).addTo(map)
})


// // Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature)
//       return L.marker(latlng)
//       .bindPopup('<h2>' + feature.properties.name + '</h2> <hr> <h3>' + feature.properties.city +', '+feature.properties.country)
//     }
//     })
//     .addTo(map)

// L.geoJson(sanFranAirport, {
//     pointToLayer: function(feature, layer) {
//         console.log(layer)
//         return L.marker(layer)
//         .bindPopup('<h2>Airport Code: ' + feature.properties.faa + '</h2> <hr> <h3> Airport Name: '+feature.properties.name)
//     }
//     })
//     .addTo(map)


    // function onMapClick(e) {
    //     alert("You clicked the map at " + e.latlng);
    // }
    
    // map.on('click', onMapClick)