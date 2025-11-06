import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getPuzzle } from '../data/generator'; 
import { findNakedSingle } from '../utils/validation'; 

// Check win
function checkWin(board, solution) {
  if (!board.length || !solution.length) return false;
  return JSON.stringify(board) === JSON.stringify(solution);
}

const initialState = {
  gameMode: 'normal',
  initialBoard: [],
  solutionBoard: [],
  currentBoardState: [],
  selectedCell: null,
  hintCell: null, 
  timer: 0,
  isWon: false,
};

// Local Storage init func
const initializer = (defaultState) => {
  try {
    const storedState = localStorage.getItem('sudokuGameState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState && !parsedState.isWon) {
        console.log("From Local Storage load game。");
        return { ...defaultState, ...parsedState }; 
      }
    }
  } catch (error) {
    console.error("Fail From Load Game from Local Storage:", error);
    localStorage.removeItem('sudokuGameState');
  }
  return defaultState;
};

function sudokuReducer(state, action) {
  switch (action.type) {
    case 'START_NEW_GAME': {
      const { puzzle, solution } = getPuzzle(action.payload.mode);
      return {
        ...initialState,
        gameMode: action.payload.mode,
        initialBoard: puzzle,
        solutionBoard: solution,
        currentBoardState: puzzle,
      };
    }
    
    case 'RESET_GAME': {
      return {
        ...state,
        currentBoardState: state.initialBoard,
        selectedCell: null,
        hintCell: null,
        timer: 0,
        isWon: false,
      };
    }

    case 'SELECT_CELL': {
      return {
        ...state,
        selectedCell: action.payload,
        hintCell: null,
      };
    }

    case 'UPDATE_CELL_VALUE': {
      if (state.isWon) return state;
      const { row, col, value } = action.payload;
      const size = state.gameMode === 'easy' ? 6 : 9;

      if (state.initialBoard[row][col] !== 0) return state;
      if (value < 0 || value > size) return state;
      
      const newBoardState = state.currentBoardState.map(row => [...row]);
      newBoardState[row][col] = value;
      
      const isWon = checkWin(newBoardState, state.solutionBoard);
      
      return {
        ...state,
        currentBoardState: newBoardState,
        isWon: isWon,
        hintCell: null,
      };
    }
    
    case 'FIND_HINT': {
      if (state.isWon) return state;
      const hint = findNakedSingle(state.currentBoardState);
      if (hint) {
        return {
          ...state,
          selectedCell: { row: hint.row, col: hint.col },
          hintCell: { row: hint.row, col: hint.col },
        };
      } else {
        return state;
      }
    }
    
    case 'TICK_TIMER': {
      if (state.isWon) return state;
      return { ...state, timer: state.timer + 1 };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}


// Context
const SudokuStateContext = createContext(undefined);
const SudokuDispatchContext = createContext(undefined);


// 7. Provider
export function SudokuProvider({ children }) {
  const [state, dispatch] = useReducer(sudokuReducer, initialState, initializer);

  // 8. Local Storage Effect
  useEffect(() => {
    try {
      if (state.isWon) {
        console.log("Game Win, Delete Local Storage。");
        localStorage.removeItem('sudokuGameState');
      } else if (state.initialBoard.length > 0) {
        const stateToSave = JSON.stringify(state);
        localStorage.setItem('sudokuGameState', stateToSave);
      }
    } catch (error) {
      console.error("Fail Local Storage:", error);
    }
  }, [state]);

  return (
    <SudokuStateContext.Provider value={state}>
      <SudokuDispatchContext.Provider value={dispatch}>
        {children}
      </SudokuDispatchContext.Provider>
    </SudokuStateContext.Provider>
  );
}

export function useSudokuState() {
  const context = useContext(SudokuStateContext);
  if (context === undefined) {
    throw new Error('useSudokuState must be used within a SudokuProvider');
  }
  return context;
}

export function useSudokuDispatch() {
  const context = useContext(SudokuDispatchContext);
  if (context === undefined) {
    throw new Error('useSudokuDispatch must be used within a SudokuProvider');
  }
  return context;
}