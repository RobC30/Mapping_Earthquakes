// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([36.1733, -120.1794],7)
let map = L.map('mapid', {
    center : [39.8283, -98.5795],
    zoom: 4.5
})

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
})
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map)

// Coordinates for each point to be used in the line.
let line = [
    [40.6413, -73.7781], // jfk airport
    [43.6777, -79.6248],
    [30.1975, -97.6664], // aus airport
    [33.9416, -118.4085]
  ]


// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "white",
    weight: '2.5',
    dashArray: '5, 5',
    dashOffset: '100',
    opacity: '.5'
    }).addTo(map)

