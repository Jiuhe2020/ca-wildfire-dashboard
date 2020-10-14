// Create layerGroups
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
  "Dark Map": darkMap,
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

// Create fire icons on the map
var fireIcons = L.Icon.extend(
  {options: {
    shadowUrl: 'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/markers_shadow.png',
    iconSize: [60, 80],
    iconAnchor: [30, 50],
    popupAnchor: [0, -20],
    shadowSize: [60, 60]
  }
});

var fireIcon_1 = new fireIcons({iconUrl: 'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_1.png'}),
    fireIcon_2 = new fireIcons({iconUrl: 'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_2.png'}),
    fireIcon_3 = new fireIcons({iconUrl: 'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_3.png'}),
    fireIcon_4 = new fireIcons({iconUrl: 'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_4.png'}),
    fireIcon_5 = new fireIcons({iconUrl: 'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_5.png'}),
    fireIcon_6 = new fireIcons({iconUrl: 'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_6.png'});

// Use this link to get the geojson data
var wildfirelink = "static/data/fire_temp_counties.geojson";

// Grabbing our GeoJSON data
d3.json(wildfirelink, function(wildfireData) {

  // Function that will determine the color of the icon
  function fireIcon(area) {
    switch (true) {
    case area >= 50000:
      return fireIcon_1;
    case area >= 10000:
      return fireIcon_2;
    case area >= 5000:
      return fireIcon_3;
    case area >= 1000:
      return fireIcon_4;
    case area >= 500:
      return fireIcon_5;
    default:
      return fireIcon_6;
    }
  }

  // Creating a geoJSON layer with all month data
  var all = L.geoJson(wildfireData, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
        // Set the style of the icons based on properties.AcresBurned
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with January data
  var jan = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "January";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with February data
  var feb = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "February";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);
  
    // Creating a geoJSON layer with March data
  var mar = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "March";
    },
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
      }).addTo(wildfires);
      wildfires.addTo(myMap);
    
  // Creating a geoJSON layer with April data
  var apr = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "April";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);
  
    // Creating a geoJSON layer with May data
  var may = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
          return feature.properties.Month === "May";
        },
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng,
              {icon: fireIcon(feature.properties.AcresBurned)}
              );
          },
          // Called on each feature
          onEachFeature: function(feature, layer) {
            // Giving each feature a pop-up with information pertinent to it
            layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
          }
        }).addTo(wildfires);
        wildfires.addTo(myMap);
  
  // Creating a geoJSON layer with June data
  var jun = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "June";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with July data
  var jul = L.geoJson(wildfireData, {
  filter: function(feature, layer) {
    return feature.properties.Month === "July";
  },
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng,
        {icon: fireIcon(feature.properties.AcresBurned)}
        );
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
    }
  }).addTo(wildfires);
  wildfires.addTo(myMap);

  // Creating a geoJSON layer with August data
  var aug = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "August";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with September data
  var sep = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "September";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with October data
  var oct = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "October";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with November data
  var nov = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "November";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

  // Creating a geoJSON layer with December data
  var dec = L.geoJson(wildfireData, {
    filter: function(feature, layer) {
      return feature.properties.Month === "December";
    },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng,
          {icon: fireIcon(feature.properties.AcresBurned)}
          );
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>Location: " + feature.properties.Location + "</h5><hr><p>County: " + feature.properties.Counties + "</p><hr><p>Acres Burned: " + feature.properties.AcresBurned + "</p>");
      }
    }).addTo(wildfires);
    wildfires.addTo(myMap);

   // Add legend
   var legend = L.control({position: "bottomright"});
   legend.onAdd = function() {
     var div = L.DomUtil.create("div", "info legend"),
     mag = [0, 500, 1000, 5000, 10000, 50000];
     icons = ['https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_6.png',
        'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_5.png',
        'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_4.png',
        'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_3.png',
        'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_2.png',
        'https://raw.githubusercontent.com/zcheatle5/ca-wildfire-dashboard/main/fire_icons/fire_icon_1.png'
      ]

     div.innerHTML += "<h5 align='center'><b>Acres Burned</b></h5>"
 
     for (var i =0; i < mag.length; i++) {
       div.innerHTML += 
      ("<img align='right' src="+ icons[i] +" height='25' width='20'>") +
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
