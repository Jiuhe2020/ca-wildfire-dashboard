// from data.js, write code that appends a table to your web page and then add new rows of data for each fire incident
// var tableData = data[0];

// variable declaration
var tbody = d3.select('tbody');

var tableData2 = data;
console.log(tableData2);

// Build Table
    // 1. clear existing data
    // 2. loop through all row in data.js
    // 3. Append the table row 'tr' to the table body 'tbody'
    // 4. Iterate through the values using the object.values and the forEach
    // 5. For each value, append a cell to the row.
function buildTable(tableData2){
    tbody.html('');
    tableData2.forEach((dataRow) => {
        var row = tbody.append('tr');
        // Get the entries for each function in the array
        Object.values(dataRow).forEach((value) => {
            var cell = row.append('td');
            cell.text(value);
        });

    });
};

buildTable(tableData2);
// print arrays to console
console.log(tableData2);

// PART II 
// Code that will listen for events and search through the `month` column to find rows that match user input
function handleButtonClick(){
    // prevent the page from refreshing
    d3.event.preventDefault();
    var date = d3.select('#month').property('value');
    var filterData = tableData2;

    if (date) {
        filterData = filterData.filter((row) => row.Month === date);
    }
    // Build data
    buildTable(filterData);
}

var filterBotton = d3.selectAll('#filter-btn').on('click', handleButtonClick);
buildTable(tableData2);