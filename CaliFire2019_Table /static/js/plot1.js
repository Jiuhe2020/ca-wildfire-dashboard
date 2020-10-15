 // Initial idea is to create the three just as on HW 15; but now i am mostly focus on having the Gauge and the Histogram. 
 //for the Gauge, I had two ideas; for every county, to add up the total number of acre burned - but it will a larger number which is not good for the gauge; 
 // but instead, we can take the number of fire over a course of one year per counties which is done in line 16-20
 //for the histogram, the original plan was to know how many months each fire incident lasted? but now I am just going to create two filters where one filter down the counties
 // and the second filter for the starting months only. I already create the 1st filter; I just need it to work in line 59 and then create the second filter. 
 // after that the plot should be able to work for all 3 chart; Histogram, gauge and bubble.   
 // number of fires over a course of one year per counties
 //Indicator was replaced by countiesName.

function init() {
    var countiesName = d3.select("#selDataset");
  
    d3.json("static/data/fire.geojson").then((data) => {
      var fireName = data.features;
      console.log(fireName);
      fireName.forEach((fire) => {
        countiesName
          .append("option")
          .text(fire.properties.Counties)
          .property("value", fire);
      });
  })
buildHistogramChart(countiesName)

} 
  
  
  init();
  
  function optionChanged(countiesName) {
    // buildProperties(countiesName);
    buildHistogramChart(countiesName);
    // buildGaugeChart(countiesName);
    // buildBubbleChart(countiesName);
  }
  
  function buildProperties(fire) {
    d3.json("static/data/fire.geojson").then((data) => {    
      var properties = data.properties;
      var resultArray = properties.filter(fireObj => fireObj.AcresBurned == fire);
      var result = resultArray[0];
      var PANEL = d3.select("#fire-properties");
  
      PANEL.html("");
      
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(key.toUpperCase() + ': ' + value); 
      })
  
  
    });
  }
  
  function buildHistogramChart(fire) {
    d3.json("static/data/fire.geojson").then((data) => {
        // console.log(data)
        var resultArray = data
      .features
      .filter(fireObjObj => {fireObjObj.properties.Counties == fire // we can use one county "Ventura" to see if it returns the data
      });
        console.log(resultArray)


    // var countyList     
    // var fireName2 = data.features
    // fireName2.forEach((fire) =>{
    //     return countyList = fire.properties}
    //     );
    // console.log(countyList)
      

    //   var result = resultArray[0];
    //   var AcresBurned = result.AcresBurned.slice(0, 10).map(numericIds => {
    //     return 'AcresBurned' + numericIds;
    //   }).reverse();
      
    //   var top_ten_sample_values = result.sample_values.slice(0, 10).reverse();
    //   var top_ten_otu_labels = result.otu_labels.slice(0, 10).reverse();
      
    //   var Histogram_trace = [
    //     {
    //     //   x: top_ten_sample_values,  
    //       y: Monthly_Fire,
    //     //   text: top_ten_otu_labels,
    //       name: "Total Month of Fire",
    //       type: 'histogram',
    //     }
    //     ];

    //     var data = [Histogram_trace];
  
    //     var Histogram_layout = {
    //       title: "Top 10 OTUs",
     
    //     };
        
    //     Plotly.newPlot('bar', bar_trace, bar_layout)
      
      });
    }

    
    // function buildGaugeChart(fire) {
    //   d3.json("static/data/fire.geojson").then((data) => {
    //     var properties = data.features.properties;
    //     var resultArray = properties
    //     .filter(fireObj => {
    //       return fireObj.id == fire
    //     });
    //     console.log(resultArray);
  
    //     var result = resultArray[0];
    //     console.log(result);
  
        
    //     var gauge_trace = [
    //       {
    //         domain: { x: [0, 1], y: [0, 1] },
    //         title: {text: "Califire Washing Frequency <br> per Month", font: {size: 20}},
    //         type: "CountiesName",
    //         mode: "gauge+number",
    //         gauge: {
    //           axis: { range: [null, 10]},
    //           bar: { color: "cadet blue" },
    //           steps: [
    //             { range: [0, 1], color: 'rgba(0, 0, 0, 0.5)' },
    //             { range: [1, 2], color: 'rgba(0, 0, 0, 0.5)' },
    //             { range: [2, 3], color: 'rgba(183,28,28, .5)' },
    //             { range: [3, 4], color: 'rgba(183,28,28, .5)' },
    //             { range: [4, 5], color: 'rgba(249, 168, 37, .5)' },
    //             { range: [5, 6], color: 'rgba(249, 168, 37, .5)' },
    //             { range: [6, 7], color: 'rgba(110, 154, 22, .5)' },
    //             { range: [7, 8], color: 'rgba(110, 154, 22, .5)' },
    //             { range: [8, 9], color: 'rgba(14, 127, 0, .5)' },
    //             { range: [9, 10], color: 'rgba(14, 127, 0, .5)' }
    //           ],
    //         }  
    //       }
    //     ];
        
    //     var gauge_layout = {
          
          
    //       width: 600, 
    //       height: 500, 
    //       margin: { t: 0, b: 0 } 
    //     };
        
    //     Plotly.newPlot('gauge', gauge_trace, gauge_layout)
      
    //   });
    
    // }