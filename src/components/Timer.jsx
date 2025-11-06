import { useSudokuState } from '../contexts/SudokuContext';

// Time in MM:SS
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // keep MM:SS
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}


function Timer() {
  const { timer } = useSudokuState();

  return (
    <div className="timer-container">
      <h3>Timer</h3>
      <div className="timer-display">
        {formatTime(timer)}
      </div>
    </div>
  );
}

export default Timer;