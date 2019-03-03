// from data.js
var tableData = data;
var stateData = states;

// Get instances of all the required elements from HTML Page (table, tbody, input field, submit button)
var table  = d3.select("#ufo-table");   
var tbody = table.select("tbody");   
var inpFld = d3.select("#datetime");
var submitBtn = d3.select("#filter-btn"); 

var selectGrp = d3.select("#state");

// YOUR CODE HERE!

// Create Filters
// Create state dropdown filter
function dropDown(selElement, sel_arr){
    selElement.append("option")
                .attr("value","ALL")
                .text("All");
    sel_arr.map(s => {
        selElement.append("option")
                .attr("value",s)
                .text(s);

    });
    
};

function loadAllFilters(){
    dropDown(selectGrp, stateData); // dropdown for state

    //dropdown for cities 
    // get the city array and filte by Unique
    // usage example:
    var a = ['a', 1, 'a', 2, '1'];
    var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']    
};

       
function writeTable(inputData){
    inputData.map(function(row){
        var tr = tbody.append("tr");
        
        Object.values(row).map(function(col){
            tr.append('td').text(col);
        });
    });
};

function clearTable(){
    var tr = tbody.selectAll("tr").remove();
}


function writeDataNotFnd(){
    var tr = tbody.append('tr');
    tr.append("td")
        .attr("colspan",7)
        .attr("class", "text-center")
        .text("Sorry! We could not find any data matching your search criteria");
}

function filterByDate(event){
    d3.event.preventDefault();
    var filtDate = inpFld.property("value");
    console.log(filtDate);

    // Filter the tableData
    //OPtion 1
    // var filtTableData = tableData.filter(r => ((r.datetime === filtDate)&& (r.state === "tx")));
    //OPtion 2
    var filtTableData = tableData.filter(r => r.datetime === filtDate);
                                //  .filter(r => r.state === "tx");
    console.log(filtTableData);

    // Clear the existing table and rewrite
    clearTable();
    if(filtTableData.length !== 0){
        //Call write table again to rewrite the HTML Table with filtered data
        writeTable(filtTableData);
    }
    else{
        writeDataNotFnd();
    }
};


// Load all filters in the page
loadAllFilters();

// Default when no selection is made
// Write HTML Table to the <table> tag
writeTable(tableData);


// Filter by date
// When button is clicked or input field is changed, 
// then extract the date to be filtered from input field, filter the data and display the data

// inpFld.on("change",function(){filterByDate(d3.event);});
submitBtn.on("click", function(){filterByDate(d3.event);});

