import Cell from './Cell';

function Board({ boardData, initialBoard }) {
  const size = boardData.length;
  const subgridHeight = size === 6 ? 2 : 3;
  const subgridWidth = 3; // 6x6 and 9x9 both 3 col

  return (
    <div className={`sudoku-board size-${size}`}>
      {boardData.map((rowArr, rowIndex) => (
        // for CSS
        <div key={rowIndex} className="board-row">
          {rowArr.map((value, colIndex) => {
            
            const isInitial = initialBoard[rowIndex][colIndex] !== 0;
            
            // Add border in end of subgrids
            
            const isRightBorder = (colIndex + 1) % subgridWidth === 0 
                                  && (colIndex + 1) !== size;
                                  
            const isBottomBorder = (rowIndex + 1) % subgridHeight === 0 
                                   && (rowIndex + 1) !== size;
            
            return (
              <Cell
                key={colIndex}
                value={value}
                row={rowIndex}
                col={colIndex}
                isInitial={isInitial}
                isRightBorder={isRightBorder}
                isBottomBorder={isBottomBorder}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;