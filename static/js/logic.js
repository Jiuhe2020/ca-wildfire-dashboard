// Create layerGroups
var wildfires = L.layerGroup();
var temps = L.layerGroup();

// Create tile layers
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 20,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 20,
  id: "dark-v10",
  accessToken: API_KEY
});


// Define a baseMaps object to hold the base layers
var baseMaps = {
  "Light Map": lightMap,
  "Dark Map": darkMap,
};

// Create overlay object to hold the overlay layer
var overlayMaps = {
  "Wild Fires": wildfires,
  "Temperature (F)": temps
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
var wildfirelink = "static/data/fire_temp_counties.geojson";
// var tempslink = "https://raw.githubusercontent.com/Esri/gis-tools-for-hadoop/master/samples/data/counties-data/california-counties.json";

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
      return "darkred";
    case area >= 10000:
      return "#F11D28";
    case area >= 5000:
      return "#FD3A2D";
    case area >= 1000:
      return "#FE612C";
    case area >= 500:
      return "#FF872C";
    default:
      return "#FFA12C";
    }
  }
  // Creating a geoJSON layer with all month data
  var all = L.geoJson(wildfireData, {
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with January data
  var jan = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "January";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with February data
  var feb = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "February";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);
  
    // Creating a geoJSON layer with March data
  var mar = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "March";
    },
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
          layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
        }
      }).addTo(wildfires);
      wildfires.addTo(myMap);
    
  // Creating a geoJSON layer with April data
  var apr = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "April";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);
  
    // Creating a geoJSON layer with May data
  var may = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
          return feature.properties.Month === "May";
        },
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
            layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
          }
        }).addTo(wildfires);
        wildfires.addTo(myMap);
  
  // Creating a geoJSON layer with June data
  var jun = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "June";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with July data
  var jul = L.geoJson(wildfireData, {
  filter: function(feature, layer) {
    return feature.properties.Month === "July";
  },
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
      layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
    }
  }).addTo(wildfires);
  wildfires.addTo(myMap);

  // Creating a geoJSON layer with August data
  var aug = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "August";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with September data
  var sep = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "September";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with October data
  var oct = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "October";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with November data
  var nov = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "November";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with December data
  var dec = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "December";
    },
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
        layer.bindPopup("<h4>County: " + feature.properties.Counties + "</h4> <hr> <p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Function to determine the color of each county based on their temp
  function tempColor(temp) {
    switch (true) {
    case temp >= 85:
      return "orangered";
    case temp >= 80:
      return "darkorange";
    case temp >= 75:
      return "orange";
    case temp >= 70:
      return "yellow";
    case temp >= 65:
      return "#FEFE69";
    case temp >= 60:
      return "#DDF969";      
    default:
      return "#A9F36A";
    }
  }
  // Add temperature layer
L.geoJson(wildfireData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng,
        // Set the style of the markers based on properties.mag
        {
          radius: 8,
          fillColor: tempColor(feature.properties.Fahrenheit),
          fillOpacity: 0.9,
          color: "white",
          stroke: true,
          weight: 0.5
        }
        );
    },
  }).addTo(temps);
  temps.addTo(myMap);

  // var jul_temp = L.geoJson(wildfireData, {
  //   filter: function(feature, layer) {
  //     return feature.properties.Month === "July";
  //   },
  //   pointToLayer: function (feature, latlng) {
  //     return L.circleMarker(latlng,
  //       // Set the style of the markers based on properties.mag
  //       {
  //         radius: 8,
  //         fillColor: tempColor(feature.properties.Fahrenheit),
  //         fillOpacity: 0.9,
  //         color: "white",
  //         stroke: true,
  //         weight: 0.5
  //       }
  //       );
  //   },
  // }).addTo(temps);
  // temps.addTo(myMap);

   // Add legend
   var legend = L.control({position: "bottomright"});
   legend.onAdd = function() {
     var div = L.DomUtil.create("div", "info legend"),
     mag = [0, 500, 1000, 5000, 10000, 50000];
     
     div.innerHTML += "<h3>Acres Burned</h3>"
 
     for (var i =0; i < mag.length; i++) {
       div.innerHTML += 
       '<i style="background:' + chooseColor(mag[i] + 1) + '"></i> ' +
           mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
       }
       return div;
     };
     legend.addTo(myMap);

    // Switch between buttons
    $("#all").click(function() {
      myMap.addLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#jan").click(function() {
      myMap.addLayer(jan)
      myMap.removeLayer(all)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#feb").click(function() {
      myMap.addLayer(feb)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#mar").click(function() {
      myMap.addLayer(mar)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#apr").click(function() {
      myMap.addLayer(apr)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#may").click(function() {
      myMap.addLayer(may)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#jun").click(function() {
      myMap.addLayer(jun)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#jul").click(function() {
      myMap.addLayer(jul)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#aug").click(function() {
      myMap.addLayer(aug)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#sep").click(function() {
      myMap.addLayer(sep)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#oct").click(function() {
      myMap.addLayer(oct)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(nov)
      myMap.removeLayer(dec)
    });
    $("#nov").click(function() {
      myMap.addLayer(nov)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(dec)
    });
    $("#dec").click(function() {
      myMap.addLayer(dec)
      myMap.removeLayer(all)
      myMap.removeLayer(jan)
      myMap.removeLayer(feb)
      myMap.removeLayer(mar)
      myMap.removeLayer(apr)
      myMap.removeLayer(may)
      myMap.removeLayer(jun)
      myMap.removeLayer(jul)
      myMap.removeLayer(aug)
      myMap.removeLayer(sep)
      myMap.removeLayer(oct)
      myMap.removeLayer(nov)
    });













});
