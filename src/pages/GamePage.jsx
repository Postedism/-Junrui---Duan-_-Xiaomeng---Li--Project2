import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSudokuState, useSudokuDispatch } from '../contexts/SudokuContext';
import Board from '../components/Board';
import Timer from '../components/Timer'; 

function GamePage() {
  const { mode } = useParams();
  const gameMode = mode === 'easy' ? 'easy' : 'normal';

  const state = useSudokuState();
  const dispatch = useSudokuDispatch();
  const { selectedCell, gameMode: stateGameMode, initialBoard, isWon } = state;

  useEffect(() => {
    if (state.currentBoardState.length === 0 || stateGameMode !== gameMode) {
      dispatch({
        type: 'START_NEW_GAME',
        payload: { mode: gameMode },
      });
    }
  }, [gameMode, state.currentBoardState.length, stateGameMode, dispatch]);

  
  const handleKeyDown = useCallback((event) => {
    if (isWon || !selectedCell) {
      return;
    }
    const { key } = event;
    const { row, col } = selectedCell;
    const size = gameMode === 'easy' ? 6 : 9;
    const numericValue = parseInt(key);
    if (numericValue >= 1 && numericValue <= size) {
      event.preventDefault();
      dispatch({
        type: 'UPDATE_CELL_VALUE',
        payload: { row, col, value: numericValue },
      });
      return;
    }
    if (key === 'Backspace' || key === 'Delete' || key === '0') {
      event.preventDefault();
      dispatch({
        type: 'UPDATE_CELL_VALUE',
        payload: { row, col, value: 0 },
      });
      return;
    }
    let newRow = row;
    let newCol = col;
    if (key === 'ArrowUp') {
      event.preventDefault();
      newRow = Math.max(0, row - 1);
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      newRow = Math.min(size - 1, row + 1);
    } else if (key === 'ArrowLeft') {
      event.preventDefault();
      newCol = Math.max(0, col - 1);
    } else if (key === 'ArrowRight') {
      event.preventDefault();
      newCol = Math.min(size - 1, row + 1);
    }
    if (newRow !== row || newCol !== col) {
      dispatch({
        type: 'SELECT_CELL',
        payload: { row: newRow, col: newCol },
      });
    }
  }, [dispatch, selectedCell, gameMode, isWon]);

  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  useEffect(() => {
    let intervalId = null;
    if (!isWon) {
      intervalId = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isWon, dispatch]); 


  if (state.currentBoardState.length === 0) {
    return <div>正在加载 {gameMode} 数独谜题...</div>;
  }

  return (
    <div className="game-page"> {/* start */}
      
      <div className="game-header">
        <h2>soduku - {gameMode.toUpperCase()} mode</h2>
        <Timer />
      </div>
      
      <div className="game-container">
        <div className="board-area">
          <Board 
            boardData={state.currentBoardState} 
            initialBoard={state.initialBoard} 
          />
        </div>
        
        <div className="controls-area">
          <h3>control zone</h3>
          <p>Click for input</p>
          <p>Current Time: {state.timer} second</p>
          
          {/* add .button-group div */}
          <div className="button-group">
            <button 
              onClick={() => dispatch({ type: 'RESET_GAME' })}
              disabled={isWon}
            >
              Reset Game
            </button>
            <button 
              onClick={() => dispatch({ type: 'START_NEW_GAME', payload: { mode: gameMode } })}
            >
              New Game
            </button>

            <button 
              className="button-hint"
              onClick={() => dispatch({ type: 'FIND_HINT' })}
              disabled={isWon}
            >
              Hint
            </button>
          </div> 
        </div> 
      </div> 
      
      
      {state.isWon && (
        <div className="congratulations-message">
          Congratulate! 
        </div>
      )}

    </div> 
  );
}

export default GamePage;