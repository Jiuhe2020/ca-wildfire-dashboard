// funtion that create the plots id using the assigned data
function getPlots(id) {
    //use D3 library to read the samples JSON file 
    d3.json("samples.json").then((data) => {
        console.log(data);
        // filter sample data by id
        var sampleData = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samplesData);
        // get only the first 10 objects for plotting and reverse the array
        var sampleValues = sampleData.sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        // Use `otu_ids` as the labels for the bar chart
        var otuIds = sampleData.otu_ids.slice(0,10).map(i => {
            return 'OTU' + i;
        }).reverse();
        console.log('OTU IDS: ${topTenOtuIds}')
        // Use `otu_labels` as the hovertext for the chart
        var otuLabels = sampleData.otu_labels.slice(0,10).reverse;

        // create a trace for the bar plot
        var barTrace = {
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            name: 'First 10',
            marker: {
                color: 'turquoise'},
            type: 'bar',
            orientation: 'h'
        };
        // Create the data variable
        var data = [barTrace];
        // Create layout variable for the plots
        var barLayout = {
            title: 'Top 10 OTU',
            font: {size: 13},
            yaxis:{
                tickmode: 'linear'
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30,
            }
        };
        // Generate a new bar plot
        Plotly.newPlot('bar', data, barLayout);
        // Build bubble chart trace
        var bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };
        // Create the data variable for the bubble plot
        var data1 = [bubbleTrace];
        // Create layout variable for the bubble plot
        var bubbleLayout = {
            xaxis: {title: 'OTU ID'},
            showlegend: false,
        };
        // Create the bubble plot
        plotly.newplot('bubble', data1, bubbleLayout);
    });
}
// Create the function to get the necessary data
function getInfo(id) {
    // Read the JSON file to get data
    d3.json("data/samples.json").then((samplesData) => {
        // Get the data info for the demographic 
        var metadata = samplesData.metadata;
        console.log(metadata)
        // filter meta data info by id
       var result = metadata.filter(meta => meta.id.toString() === id)[0];
       console.log(result);
       // select demographic panel to insert data
        var demoInfo = d3.select("#sample-metadata");
         
      // Clear out the demographic for every new id input 
        demoInfo.html("");
 
      // Grab the necessary demographic data for the id and append the info
         Object.entries(result).forEach((key) => {   
             demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
         });
    });
}

