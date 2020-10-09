// Create a layerGroup
var wildfires = L.layerGroup();

// Create tile layers
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Define a baseMaps object to hold the base layers
var baseMaps = {
  "Light Map": lightMap,
  "Dark Map": darkMap
};

// Create overlay object to hold the overlay layer
var overlayMaps = {
  "Wild Fires": wildfires,
};

// Creating map object
var myMap = L.map("map", {
  center: [36.7783, -119.4179],
  zoom: 8,
  layers: [lightMap, wildfires]
});

// Create a layer control
// Pass in the baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// Use this link to get the geojson data
var wildfirelink = "static/data/Cali_Fire_Update.geojson";

// Grabbing our GeoJSON data
d3.json(wildfirelink, function(wildfireData) {
  // Function that will determine the size of the marker
  function markerSize(area) {
    return Math.sqrt(area) / 3;
  };
  // Function that will determine the color of the marker
  function chooseColor(area) {
    switch (true) {
    case area >= 50000:
      return "red";
    case area >= 10000:
      return "orangered";
    case area >= 5000:
      return "orange";
    case area >= 1000:
      return "gold";
    case area >= 500:
      return "yellow";
    default:
      return "lightgreen";
    }
  }
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(wildfireData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng,
        // Set the style of the markers based on properties.mag
        {
          radius: markerSize(feature.properties.AcresBurned),
          fillColor: chooseColor(feature.properties.AcresBurned),
          fillOpacity: 0.7,
          color: "black",
          stroke: true,
          weight: 0.5
        }
        );
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h3>County: " + feature.properties.Counties + "</h3> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
    }
  }).addTo(wildfires);
  wildfires.addTo(myMap);

   // Add legend
   var legend = L.control({position: "bottomright"});
   legend.onAdd = function() {
     var div = L.DomUtil.create("div", "info legend"),
     mag = [0, 500, 1000, 5000, 10000, 50000];
     
     div.innerHTML += "<h3>Magnitude</h3>"
 
     for (var i =0; i < mag.length; i++) {
       div.innerHTML += 
       '<i style="background:' + chooseColor(mag[i] + 1) + '"></i> ' +
           mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
       }
       return div;
     };
     legend.addTo(myMap);
});
