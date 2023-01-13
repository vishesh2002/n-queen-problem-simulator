const meetConstraints = (rows, column, solution) => {
    for (let i = 0; i < rows; i++) {
        if (solution[i] === column ||
            Math.abs(column - solution[i]) === Math.abs(rows - i)) {
            return false;
        }
    }
    return true;
}
const eachRow = (row, columns, prevSolutions) => {
    let newSolutions = [];
    let prev = prevSolutions;
    for (let i = 0; i < prev.length; i++) {
        let solution = prev[i];
        for (let j = 0; j < columns; j++) {
            if (meetConstraints(row, j, solution)) {
                newSolutions.push(solution.concat([j]));
            }
        }
    }
    if (row === columns - 1) {
        result = newSolutions;
    } else {
        eachRow(row + 1, columns, newSolutions);
    }
    return result;
};
const solve_Nqueens = (n) => {
    const init = [[]];
    const totalSolutions = eachRow(0, n, init);
   
    return totalSolutions;
}
const queen = {
    name: "queen",
    w: "\u2655",
    b: "\u265B"
};

const drawBoard = (n, totalSolutions, index) => {
    
    const boxSize = 100,
        boardDimension = n,
        boardSize = boardDimension * boxSize,
        margin = 100;
    
    const div = d3.select("#svg-container");

  
    const svg = div.append("svg")
        .attr("width", boardSize + "px")
        .attr("height", boardSize + "px");

    
    for (let i = 0; i < boardDimension; i++) {
        for (let j = 0; j < boardDimension; j++) {
        
            const box = svg.append("rect")
                .attr("x", i * boxSize)
                .attr("y", j * boxSize)
                .attr("width", boxSize + "px")
                .attr("height", boxSize + "px");
            if ((i + j) % 2 === 0) {
                box.attr("fill", "beige");
            } else {
                box.attr("fill", "gray");
            }

       
            const chess = svg.append("text")
                .classed('draggable', true)
                .style("font-size", boxSize*3/4)
                .attr("text-anchor", "middle")
                .attr("x", i * boxSize)
                .attr("y", j * boxSize)
                .attr("dx", boxSize / 2)
                .attr("dy", boxSize * 3 / 4)
                .style("text-shadow", "2px 2px 4px #757575");

         
            if (j === totalSolutions[index][i]) {
                chess.attr("id", "b" + j + i)
                    .classed('team1', true)
                    .text(queen.b);
            }
        }
    }
}

const init = () => {
    drawBoard(8, [[]], 0);
}
init();

const clearBoard = () => {
    d3.select("svg").remove();
}


const inputNum = document.getElementById("inputNum");
const instruction = document.getElementById("instruction");
const status = document.getElementById("status");
const title = document.getElementById("title");
let index = 0; //index to count solutions when showing on chess boards

const getSol = () => {
    n = parseInt(inputNum.value);
    if (Number.isNaN(n)) {
        instruction.innerHTML = "Please enter a number";
    }
    else if (n < 4 || n > 10) {
        instruction.innerHTML = "Please enter a number between 4 and 10";
    } else {
        clearBoard();
        const totalSolutions = solve_Nqueens(n);
        title.innerHTML = `Find solutions for ${n} queens problem`
        instruction.innerHTML = "Click Next to see solutions";
        status.innerHTML = `There are ${totalSolutions.length} solutions.`;
        return [n, totalSolutions];
    }
}


const nextSol = () => {
       
    const vars = getSol();
    
    drawBoard(vars[0], vars[1], index);
    if (index < vars[1].length - 1) {
        status.innerHTML = ` Solution ${index + 1}`;
        index++;
    } else {
        
        status.innerHTML = ` Solution ${index + 1}. You reach the last solution!`;
        index = 0;
    }
}

