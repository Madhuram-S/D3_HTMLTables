// from data.js
var tableData = data;
var stateData = states;

// Get instances of all the required elements from HTML Page (table, tbody, input field, submit button)
var table  = d3.select("#ufo-table");   
var tbody = table.select("tbody");   
var inpFld_dt = d3.select("#datetime");
var submitBtn = d3.select("#filter-btn"); 
var clearBtn = d3.select("#clear-filter-btn"); 

var ddwn_city = d3.select("#city");
var ddwn_state = d3.select("#state");
var ddwn_shp = d3.select("#shape");


// Util function to extract unique values from an array
function onlyUnique(value, index, self) { 
    // console.log(value+","+ index+","+ self);
    return self.indexOf(value) === index;
}

// Create Filters
// common function to populate select drop down list
function dropDown(selElement, sel_arr){
    selElement.append("option").attr("value","ALL").text("All"); // Default Select Option

    // Get unique records only for the drop down - precaution to avoid duplicate drop down entries
    // also sort by asc order
    sel_arr = sel_arr.filter(onlyUnique).sort();

    //populate the dropdown list
    sel_arr.map(s => {
        selElement.append("option")
                .attr("value",s)
                .text(s);

    });
    
};
// Function to add table data based on a given array
function writeTable(inputData){
    inputData.map(function(row){
        var tr = tbody.append("tr");
        
        Object.values(row).map(function(col){
            tr.append('td').text(col);
        });
    });
};
// Function to clear HTML table 
function clearTable(){ var tr = tbody.selectAll("tr").remove(); }
// Function to display Data NOt found Message onto a HTML table
function writeDataNotFnd(){
    var tr = tbody.append('tr');
    tr.append("td")
        .attr("colspan",7)
        .attr("class", "text-center")
        .text("Sorry! We could not find any data matching your search criteria");
}
// Callback function for handling Search button click event 
function filterData(){
    d3.event.preventDefault();
    var filtDate = inpFld_dt.property("value");
    var filtCity = ddwn_city.property("value").toLowerCase();
    var filtSt = ddwn_state.property("value").toLowerCase();
    var filtShp = ddwn_shp.property("value").toLowerCase();
    console.log(`${filtDate}, ${filtCity},${filtSt},${filtShp}`);

    // Filter the tableData
    var filtTableData = tableData.filter(r => {
        return ((filtDate !== ""?r.datetime === filtDate:true) &&
        (filtCity !== "all"?r.city === filtCity:true) &&
        (filtSt !== "all"?r.state === filtSt:true) &&
        (filtShp !== "all"?r.shape === filtShp:true))
    }); 

    // Clear the existing table and rewrite
    clearTable();
    // ternary function to check if the search yielded any result
    filtTableData.length !== 0 ? writeTable(filtTableData) : writeDataNotFnd();
    
};
// Function to reset filters and display all contents in HTML table
function resetFilters(){
    d3.event.preventDefault();
    inpFld_dt.property("value","");
    d3.select("body").selectAll("option").property("selected",function(d){ return d === "All"; });   
    // Clear the existing table and rewrite
    clearTable();
    // Rewrite All data
    writeTable(tableData);
};

// Load all filters in the page by creating dropdown for city, state and shape
dropDown(ddwn_state, stateData); // dropdown for state     
dropDown(ddwn_city, tableData.map(c => c.city)); // dropdown for city
dropDown(ddwn_shp, tableData.map(s => s.shape)); // drop down for sighted shapes

// Load data into HTML table using d3 DOM mapping
writeTable(tableData);

// Listen for filter events (Click of "Filter Table" button)
// When button is clicked to filter data by values in input or select fields, 
// then extract the date to be filtered from input field, filter the data and display the data
submitBtn.on("click", function(){filterData();});
clearBtn.on("click", function(){resetFilters();});

