const meetConstraints = (rows, column, solution) => {
  for (let i = 0; i < rows; i++) {
    if (solution[i] === column ||
      Math.abs(column - solution[i]) === Math.abs(rows - i)) {
      return false;
    }
  }
  return true;
}

const queen = {
  name: "queen",
  w: "\u2655",
  b: "\u265B"
};
const indexes = [0, 1, 2, 3];


const drawBoard = (n, totalSolutions, index) => {
  
  const boxSize = 50,
    boardDimension = n,
    boardSize = boardDimension * boxSize,
    margin = 100;

  const div = d3.select("#svg-container");
  
  const svg = div.append("svg")
    .attr("width", boardSize + boxSize + "px")
    .attr("height", boardSize + boxSize + "px");
  labels = indexes.slice();
  if (n > indexes.length) {
    for (let i = indexes.length; i < n; i++) {
      labels.push(i);
    }
  }

   
  svg.selectAll("colLabel")
    .data(labels)
    .enter().append("text")
    .text(function (d) { return d; })
    .classed("colLabel", true)
    .attr("y", 0)
    .attr("x", function (d, i) { return i * boxSize + boxSize / 2; })
    .attr("dx", boxSize / 2)
    .attr("dy", boxSize / 3)
    .style("font-size", boxSize / 3 + "px")
    .style("text-anchor", "middle")
    .style("opacity", 0.8);
  
  svg.selectAll("rowLabel")
    .data(labels)
    .enter().append("text")
    .text(function (d) { return d; })
    .classed("rowLabel", true)
    .attr("y", function (d, i) { return i * boxSize + boxSize / 2; })
    .attr("x", 0)
    .attr("dx", boxSize / 4)
    .attr("dy", boxSize / 2)
    .style("font-size", boxSize / 3 + "px")
    .style("text-anchor", "middle")
    .style("opacity", 0.8);
  
  for (let i = 0; i < boardDimension; i++) {
    for (let j = 0; j < boardDimension; j++) {
   
      const box = svg.append("rect")
        .attr("x", i * boxSize + boxSize / 2)
        .attr("y", j * boxSize + boxSize / 2)
        .attr("width", boxSize + "px")
        .attr("height", boxSize + "px");
      if ((i + j) % 2 === 0) {
        box.attr("fill", "beige");
      } else {
        box.attr("fill", "gray");
      }
    }
  }

   
  for (let i = 0; i < boardDimension; i++) {
    for (let j = 0; j < boardDimension; j++) {
      const chess = svg.append("text")
        .classed('chess-pieces', true)
        .attr("id", "b" + j + i)
        .attr("text-anchor", "middle")
        .attr("x", i * boxSize + boxSize / 2)
        .attr("y", j * boxSize + boxSize / 2)
        .attr("dx", boxSize / 2)
        .attr("dy", boxSize * 3 / 4)
        .attr("font-size", '45')
        .style("text-shadow", "2px 2px 4px #757575");
      chess.attr("X", chess.attr("x"))
        .attr("Y", chess.attr("y"));

      if (j === 0) {
        chess.classed('row0', true);
      }
      if (j === 1) {
        chess.classed('row1', true);
      }
      if (j === 2) {
        chess.classed('row2', true);
      }
      if (j === 3) {
        chess.classed('row3', true);
      }
      if (j === totalSolutions[index][i]) {
        chess.attr("id", "b" + j + i)
          .classed('team1', true)
          .text(queen.b);
      }
    }
  }
}


let n = 4;
const colors = ["green", "#FF5722", "brown", "black", "#FFC107", "#9C27B0", "#009688", "#E91E63"];
let countCol = 0;
let countRow = 0;
let solIndex = 0;
let newSolutions = [];
let prevSolutions = [];
let autoAnimation = "";
const inputNum = document.getElementById("inputNum");
const status = document.getElementById("status");
let steps = 0;

const init = () => {
  drawBoard(n, [[]], 0);
}
init();


const nextStep = () => {
  steps++;
  
  if (countCol === n) {
       
    if (solIndex === prevSolutions.length - 1) {
      prevSolutions = newSolutions.slice();
      newSolutions = [];
      countRow++;
      countCol = 0;
      solIndex = 0;
      if (countRow === n) { // finish checking the last row
        status.innerHTML = `There are total  ${prevSolutions.length} solutions. There are ${steps} steps.`;
        
        for (let i = 0; i < prevSolutions.length; i++) {
          drawBoard(n, prevSolutions, i);
        }
      };

      
      for (let i = 0; i <= countRow; i++) {
        d3.selectAll(".queens" + i).attr("visibility", "hidden");
      }
    } else { 
      if (countRow > 0) {
        
        countRow--;
        solIndex++;
        d3.select("#b" + countRow + solIndex).attr("visibility", "visible");
        countCol = 0;
        countRow++;
      }
    }

    if (countRow === 0) {
      countCol = 0;
      d3.selectAll(".queens" + countRow).attr("visibility", "hidden");
      d3.select("#b" + countRow + countCol).attr("visibility", "visible");
      countRow++;
      prevSolutions = newSolutions.slice();
      newSolutions = [];
    }
  } 
  if (countRow > 0 && countRow < n && countCol <= n) {
    
    for (let i = 0; i <= countRow; i++) {
      d3.selectAll(".queens" + i).attr("visibility", "hidden");
    }
    let solution = prevSolutions[solIndex];
    status.innerHTML = `Check row ${countRow} and column  ${countCol} when queens are placed previously at [${solution}]. `;
    //display solution
    for (let i = 0; i < solution.length; i++) {
      let solutionQ = d3.select("#b" + i + solution[i]).text(queen.b).datum(colors[solution[0]]).attr("fill", function (d) {
        return d;
      }).attr("visibility", "visible");
    }
   
    let selectedQ = d3.select("#b" + countRow + countCol);
    if (meetConstraints(countRow, countCol, solution)) { 
      newSolutions.push(solution.concat([countCol]));
      selectedQ.classed("queens" + countRow, true).text(queen.b).datum(colors[solution[0]]).attr("fill", function (d) {
        return d;
      });
      status.innerHTML += `Store accepted solution [${solution.concat([countCol])}]`;
    } else { 
      selectedQ.classed("queens" + countRow, true).text("X").datum(colors[solution[0]]).attr("fill", function (d) {
        return d;
      });
    }
    selectedQ.attr("visibility", "visible");
    countCol++;
  }
  
  if (countRow === 0 && countCol < n) {
    let solution = [];
    status.innerHTML = `Check row ${countRow} and column  ${countCol}. `;
    let selectedQ = d3.select("#b" + countRow + countCol);
    selectedQ.classed("queens" + countRow, true).text(queen.b).datum(colors[countCol]).attr("fill", function (d) {
      return d;
    });
   
    if (meetConstraints(countRow, countCol, solution)) {
      
      newSolutions.push(solution.concat([countCol]));
      status.innerHTML += `Store accepted solution [${solution.concat([countCol])}]`;
    }
    countCol++;
  }
}


const autoRun = () => {
 
  autoAnimation = setInterval(nextStep, 100);
}


const stopAnimation = () => {
  
  clearInterval(autoAnimation);
 
  d3.selectAll("svg").remove();
  drawBoard(n, [[]], 0);
  status.innerHTML = "You stop the animation";
  
  countCol = 0;
  countRow = 0;
  solIndex = 0;
  newSolutions = [];
  prevSolutions = [];
  steps = 0;
}


const clickGet = () => {
  
  n = parseInt(inputNum.value);
  if (Number.isNaN(n)) {
    status.innerHTML = "Please enter a number";
  }
  else if (n < 4 || n > 10) {
    status.innerHTML = "Please enter a number between 4 and 8";
  }
  else {
    stopAnimation();
    status.innerHTML = `The chess board size is now ${n}`;
  }
}
