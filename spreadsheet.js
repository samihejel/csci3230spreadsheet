spreadArray = [
    //Top row
    ["SID", "Asmt 1", "Asmt 2", "Asmt 3", "Midterm", "FinalExam"],
    //Data rows
    [1000001, 92.0, 80.0, 100.0, 62.5, 81.5],
    [1000002, 100.0, 85.5, 90.0, 75.0, 90.25],
    [1000003, 80.0, 90.5, 90.0, 66.5, 68.0],
    [1000004, 100.0, 100.0, 100.0, 98.0, 95.5],
    [1000005, 100.0, 90.0, 100.0, 58.5, 72.0],
    [1000006, 90.5, 81.5, 95.5, 65.5, 64.0],
    [1000007, 40.5, 50.5, 65.5, 22.5, 51.0],
    [1000008, 70.0, 75.0, 70.0, 55.5, 21.0],
    [1000009, 80.0, 82.5, 65.0, 72.5, 88.0]  
]
var gradesData
function deselectAll() {
    var cells = document.getElementsByClassName("spreadsheetCell")
    for (i=0; i<cells.length; i++) {
        var cellId = cells[i].id
        var element = document.getElementById(cellId)
        element.classList.remove("selectedCell")
        element.contentEditable = false
    }
}
function selectRow(rowIndex) {
    var cells = document.getElementsByClassName("spreadsheetCell")
    var k = 1
    for (i=0; i<cells.length; i++) {
        var cellId = cells[i].id        
        if (cellId == "cell-" + rowIndex + "-" + k) {
            k++
            document.getElementById(cellId).classList.add("selectedCell")
        }
    }
}
function setNewValue()
  {
        var newValue = $('#currentInput').val();
        selectedObj.html('');
        selectedObj.text(newValue);
  }

function selectColumn(colIndex) {
    var cells = document.getElementsByClassName("spreadsheetCell")
    var k = 1
    var temp = []
    for (i=0; i<cells.length; i++) {
        var cellId = cells[i].id
        console.log("cell-" + k + "-" + colIndex)
        if (cellId == "cell-" + k + "-" + colIndex) {
            
            k++
            document.getElementById(cellId).classList.add("selectedCell")
            temp.push(document.getElementById(cellId).innerText)
        }
    }
    console.log(temp)
    gradesData = temp
    gradesData = getFrequency(gradesData)
    makeChart()
}

function getFrequency(grades) {
    var length = grades.length
    var frequency = [
        {"grade": "A", "frequency": grades.filter(number => number > 80).length/length},
        {"grade": "B", "frequency": grades.filter(number => number >= 65 && number < 80).length/length},
        {"grade": "C", "frequency": grades.filter(number => number >= 55 && number < 65).length/length},
        {"grade": "D", "frequency": grades.filter(number => number >= 50 && number < 55).length/length},
        {"grade": "F", "frequency": grades.filter(number => number < 50).length/length},
    ]

    console.log(frequency);
    return frequency
}

function generateTable(table, data) {
    for (let i=0; i<data.length; i++) {
        let row = table.insertRow()
        for (let j=0; j<data[i].length; j++) {
            let cell = row.insertCell()
            let text = document.createTextNode(data[i][j])
            if (i == 0) {
                cell.classList.add("colHeader")
                cell.setAttribute("id", "column-"+j)
            }
            if (j == 0 && i > 0) {
                cell.classList.add("rowHeader")
                cell.setAttribute("id", "row-"+i)
            } else if (j > 0 && i > 0)  {
                cell.classList.add("spreadsheetCell")
                cell.setAttribute("id", "cell-"+i+"-"+j)
                // console.log(cell.id)
            }
            cell.appendChild(text);
        }
    }
}

function makeChart() {
    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin


    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("grades.csv", function(error, data) {
    if (error) {
        throw error;
    }

    xScale.domain(data.map(function(d) { return d.year; }));
    yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

    g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function(d){
        return "$" + d;
    }).ticks(10));


    g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.year); })
    .attr("y", function(d) { return yScale(d.value); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale(d.value); });
    });

}

var colIndex
var rowIndex
let table = document.getElementById("spreadsheet")
let data = spreadArray
generateTable(table, data)
$(document).ready(function(){
    $(".spreadsheetCell").click(function() {    
        deselectAll()
        this.classList.add("selectedCell")
        $(this).attr("contentEditable", "true")
        
    });
    $(".colHeader").click(function() {
        deselectAll()
        colIndex = (this.id).replace("column-","")
        selectColumn(colIndex)
        this.classList.add("selectedCell")
    });
    $(".rowHeader").click(function() {
        deselectAll()
        rowIndex = (this.id).replace("row-","")
        selectRow(rowIndex)
        this.classList.add("selectedCell")
    });
     
});


