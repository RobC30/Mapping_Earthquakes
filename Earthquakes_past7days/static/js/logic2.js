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
    center : [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Create a base layer that holds both maps.
let baseMaps = {
    Streets: streets,
    Sattelite: satstreets
  }

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let equakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'


// --------------------------------- //

d3.json(equakeData).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(data)
      return L.circleMarker(latlng)
        .bindPopup('<h2>' + feature.properties.place + '</h2>')
  },
  style: styleInfo
}).addTo(map)
})

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: '#ffae42',
    color: '#000000',
    radius: getRadius(),
    stroke: true,
    weight: 0.5
  }
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0 ){
    return 1
  }
  return magnitude * 4
}
