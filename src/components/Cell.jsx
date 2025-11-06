import { useSudokuState, useSudokuDispatch } from '../contexts/SudokuContext';
import { isMoveInvalid } from '../utils/validation'; 

function Cell({ value, row, col, isInitial, isRightBorder, isBottomBorder }) {
  
  const state = useSudokuState();
  const dispatch = useSudokuDispatch();

  // All status, hint, selected, incorrect for css
  const isSelected = state.selectedCell?.row === row && state.selectedCell?.col === col;
  const isHint = state.hintCell?.row === row && state.hintCell?.col === col;
  const isIncorrect = isMoveInvalid(state.currentBoardState, row, col, value);

  // click status
  const handleCellClick = () => {
    dispatch({
      type: 'SELECT_CELL',
      payload: { row, col },
    });
  };

  // The CSS Prority
  let cellClass = 'sudoku-cell';
  if (isInitial) cellClass += ' cell-initial'; 
  
  
  // Incorrect first
  if (!isInitial && isIncorrect) {
    cellClass += ' cell-incorrect';
  
  // Hint before click
  } else if (isHint) {
    cellClass += ' cell-hinted';
  
  // click status before empty
  } else if (isSelected) {
    cellClass += ' cell-selected';
  }


  // keep border
  if (isRightBorder) cellClass += ' border-right-heavy';
  if (isBottomBorder) cellClass += ' border-bottom-heavy';

  return (
    <div 
      className={cellClass} 
      onClick={handleCellClick}
      data-row={row}
      data-col={col}
    >
      {value !== 0 ? value : ''}
    </div>
  );
}

export default Cell;