
const meetContraints = (rows, column, solution) => {
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
    for (let i = 0; i< prev.length; i++) {
    	let solution = prev[i];
    	for (let j = 0; j < columns; j++) {
        	if (meetContraints(row, j, solution)) {
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

console.log(solve_Nqueens(4));