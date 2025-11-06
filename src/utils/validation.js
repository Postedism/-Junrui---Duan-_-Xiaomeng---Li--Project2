/**
 * Check value for basic rule/not the solution
 * @param {number[][]} board - Current Chessboard State
 * @param {number} row 
 * @param {number} col 
 * @param {number} value 
 * @returns {boolean} if the value violate rule,return true
 */
export function isMoveInvalid(board, row, col, value) {
  // value should in [1,size]
  if (value === 0) {
    return false;
  }
  
  const size = board.length;

  // chekc Row
  for (let c = 0; c < size; c++) {
    if (c !== col && board[row][c] === value) {
      return true; 
    }
  }

  // Check Column
  for (let r = 0; r < size; r++) {
    if (r !== row && board[r][col] === value) {
      return true; 
    }
  }

  // Check Subgrid
  const subgridHeight = size === 6 ? 2 : 3;
  const subgridWidth = 3; 

  const startRow = Math.floor(row / subgridHeight) * subgridHeight;
  const startCol = Math.floor(col / subgridWidth) * subgridWidth;

  for (let r = startRow; r < startRow + subgridHeight; r++) {
    for (let c = startCol; c < startCol + subgridWidth; c++) {
      if ((r !== row || c !== col) && board[r][c] === value) {
        return true; 
      }
    }
  }

  return false;
}

/**
 * Search the Naked Single
 * Find the first empty cell with the only value
 * @param {number[][]} board - Current Chessboard status
 * @returns {object | null} - return { row, col, value } or null
 */
export function findNakedSingle(board) {
  const size = board.length;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      
      if (board[r][c] === 0) {
        
        const candidates = [];
        for (let val = 1; val <= size; val++) {
          if (!isMoveInvalid(board, r, c, val)) {
            candidates.push(val);
          }
        }

        if (candidates.length === 1) {
          return {
            row: r,
            col: c,
            value: candidates[0], 
          };
        }
      }
    }
  }

  return null;
}