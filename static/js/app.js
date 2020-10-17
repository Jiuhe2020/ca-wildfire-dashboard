// from data.js
// var tableData = Array.from(data[0].values() );
var tableData = data[0]

var tbody = d3.select('tbody');

var tableData2 = Object.values(tableData);

// // Evr_D3_Table example 
// tableData = Array.from(tableData.values());
// console.log(tableData)

console.log(tableData2);
// Populate table using Arrow

tableData2.forEach((fire) => {
    var row = tbody.append('tr');
    Object.entries(fire).forEach(([key,value]) => {
        var cell = row.append('td');
        cell.text(value);
    });
});

// Par Form Filter activity example

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Create event handlers
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {
    
    d3.select('tbody').html('');

    // Prevent the page from refreshing 
    
    d3.event.preventDefault();
    // Select the input element and get the raw HTML node
    
    // var inputElement = d3.select("#Month");
    // Get the value property of the input element
    
    var minputElement = d3.select("#Month").property('value');
    var countyinputElement = d3.select("#County").property('value');
    var burnedinputElement = d3.select("#AcesBurned").property('value');

    // console.log(inputValue);
    console.log(tableData2);
    var filteredData = tableData2

    // var filteredData = tableData2.filter(time => time.mName === inputValue);

    if (minputElement !== "") {
        filteredData = filteredData.filter(fire => fire.Month === minputElement)

    }

    if (countyinputElement !== "") {
        filteredData = filteredData.filter(fire => fire.Counties === countyinputElement);
    }

    if (burnedinputElement !== "") {
        filteredData = filteredData.filter(fire => fire.AcesBurned === burnedinputElement);
    }
    if (filteredData.length === 0) {
        // If no data found, display "No fires found. Try again!"
        // tbody.append("tr").text("No fires found. Try again!");
        alert("No fires found, please try again");
    };
    
    console.log(filteredData);
  
    filteredData.forEach((selections) => {

    console.log(selections);

    var row = tbody.append("tr");
    Object.entries(selections).forEach(([key, value]) => {
        console.log(key, value);
        var cell = row.append("td");
        cell.text(value);
    });
});
};

// if($("#list_search_client a:visible").length==0){
//     $(".noresult").show();
//   }else{
//     $(".noresult").hide();
//   }