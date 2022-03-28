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

function deselectAll() {
    var cells = document.getElementsByClassName("spreadsheetCell")
    for (i=0; i<cells.length; i++) {
        var cellId = cells[i].id
        document.getElementById(cellId).classList.remove("selectedCell")
    }
    cells = document.getElementsByClassName("rowHeader")
    for (i=0; i<cells.length; i++) {
        var cellId = cells[i].id
        document.getElementById(cellId).classList.remove("selectedCell")
    }
    cells = document.getElementsByClassName("colHeader")
    for (i=0; i<cells.length; i++) {
        var cellId = cells[i].id
        document.getElementById(cellId).classList.remove("selectedCell")
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
function selectColumn(colIndex){
    var cells = document.getElementsByClassName("spreadsheetCell")
    var k = 1
    for (i=0; i<cells.length; i++) {
        var cellId = cells[i].id        
        if (cellId == "cell-" + k + "-" + colIndex) {
            k++
            document.getElementById(cellId).classList.add("selectedCell")
        }
    }
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
var colIndex
var rowIndex
let table = document.getElementById("spreadsheet")
let data = spreadArray
generateTable(table, data)
$(document).ready(function(){
    $(".spreadsheetCell").click(function() {
        deselectAll()
        this.classList.add("selectedCell")
    });
    $(".colHeader").click(function() {
        deselectAll()
        colIndex = (this.id).replace("col-","")
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


