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
    Sattelite: satstreets,

  }

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup()

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
}

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the airport GeoJSON URL
let equakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'


// --------------------------------- //

d3.json(equakeData).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(data)
      return L.circleMarker(latlng)
  },
  style: styleInfo,
  onEachFeature: function(feature, layer){
    layer.bindPopup('<h3> Magnitude: '+ feature.properties.mag + '<hr> Location: '+feature.properties.place + '</h3>' )
  }
}).addTo(earthquakes)
  earthquakes.addTo(map)
})

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
})

// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend")
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ]

  for (var i = 0; i < magnitudes.length; i++) {
  console.log(colors[i]);
  div.innerHTML +=
    "<i style='background: " + colors[i] + "'></i> " +
    magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
}
return div;
}
legend.addTo(map)


// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: 'black',
    radius: getRadius(feature.properties.mag),
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

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c"
  }
  if (magnitude > 4) {
    return "#ea822c"
  }
  if (magnitude > 3) {
    return "#ee9c00"
  }
  if (magnitude > 2) {
    return "#eecc00"
  }
  if (magnitude > 1) {
    return "#d4ee00"
  }
  return "#98ee00"
}
