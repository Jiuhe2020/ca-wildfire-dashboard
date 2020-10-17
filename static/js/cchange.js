var Data = 
[{"County": "Amador","Change": 0.8,"Fire": 1},{"County": "El Dorado","Change": 0.8,"Fire": 6},
{"County": "Calaveras","Change": 0.9,"Fire": 2},{"County": "Mendocino","Change": 1,"Fire": 4},
{"County": "Nevada","Change": 1,"Fire": 1},{"County": "Placer","Change": 1,"Fire": 5},
{"County": "Glenn","Change": 1.3,"Fire": 1},{"County": "Alpine","Change": 1.4,"Fire": 0},
{"County": "Tehama","Change": 1.4,"Fire": 9},{"County": "Tuolumne","Change": 1.4,"Fire": 2},
{"County": "Yuba","Change": 1.4,"Fire": 4},{"County": "Butte","Change": 1.5,"Fire": 9},
{"County": "Lake","Change": 1.5,"Fire": 5},{"County": "Sacramento","Change": 1.5,"Fire": 2},
{"County": "Sierra","Change": 1.6,"Fire": 0},{"County": "Colusa","Change": 1.7,"Fire": 1},
{"County": "Plumas","Change": 1.7,"Fire": 1},{"County": "Sutter","Change": 1.8,"Fire": 1},
{"County": "Yolo","Change": 1.8,"Fire": 3},{"County": "Mariposa","Change": 1.9,"Fire": 5},
{"County": "San Joaquin","Change": 1.9,"Fire": 3},{"County": "Shasta","Change": 1.9,"Fire": 9},
{"County": "Trinity","Change": 2,"Fire": 2},{"County": "Humboldt","Change": 2.1,"Fire": 1},
{"County": "Sonoma","Change": 2.1,"Fire": 1},{"County": "Mono","Change": 2.2,"Fire": 1},
{"County": "Solano","Change": 2.2,"Fire": 5},{"County": "Napa","Change": 2.4,"Fire": 3},
{"County": "San Diego","Change": 2.4,"Fire": 17},{"County": "Stanislaus","Change": 2.4,"Fire": 7},
{"County": "Fresno","Change": 2.5,"Fire": 3},{"County": "Marin","Change": 2.5,"Fire": 1},
{"County": "Contra Costa","Change": 2.6,"Fire": 9},{"County": "Kings","Change": 2.6,"Fire": 1},
{"County": "Merced","Change": 2.6,"Fire": 1},{"County": "San Luis Obispo","Change": 2.6,"Fire": 10},
{"County": "Tulare","Change": 2.6,"Fire": 7},{"County": "Lassen","Change": 2.7,"Fire": 10},
{"County": "Madera","Change": 2.7,"Fire": 1},{"County": "Siskiyou","Change": 2.7,"Fire": 9},
{"County": "Del Norte","Change": 2.8,"Fire": 0},{"County": "Inyo","Change": 2.8,"Fire": 2},
{"County": "Alameda","Change": 2.9,"Fire": 9},{"County": "Kern","Change": 3,"Fire": 6},
{"County": "Monterey","Change": 3,"Fire": 7},{"County": "San Francisco","Change": 3,"Fire": 0},
{"County": "Riverside","Change": 3.2,"Fire": 33},{"County": "San Bernardino","Change": 3.3,"Fire": 7},
{"County": "San Mateo","Change": 3.3,"Fire": 1},{"County": "Imperial","Change": 3.4,"Fire": 0},
{"County": "San Benito","Change": 3.4,"Fire": 2},{"County": "Santa Clara","Change": 3.4,"Fire": 11},
{"County": "Modoc","Change": 3.6,"Fire": 4},{"County": "Santa Cruz","Change": 3.6,"Fire": 1},
{"County": "Orange","Change": 3.7,"Fire": 0},{"County": "Los Angeles","Change": 4.1,"Fire": 6},
{"County": "Santa Barbera","Change": 4.2,"Fire": 0},{"County": "Ventura","Change": 4.6,"Fire": 6}]

 var trace = {
  x: Data.map(row => row.County),
  y: Data.map(row => row.Change),
  type: "bar"
};

var data = [trace];

var layout = {
  xaxis: {
      title: "Counties",
      showticklabels: false
      },
  yaxis: {title: "Average Increase (°F)"},
};

Plotly.newPlot("plot", data, layout);