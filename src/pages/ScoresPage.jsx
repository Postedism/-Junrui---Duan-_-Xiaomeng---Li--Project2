function ScoresPage() {
  // mock data
  const mockScores = [
    { id: 1, username: 'SudokuMaster', completed: 42 },
    { id: 2, username: 'Player_123', completed: 35 },
    { id: 3, username: 'GridWizard', completed: 28 },
    { id: 4, username: 'ReactFan', completed: 15 },
  ];

  return (
    <div className="page-container scores-page">
      <h2>High-rank-scores</h2>
      <p>Displays the player who solve most sudoku games</p>
      
      <table className="scores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Solve number(Only count normal games)</th>
          </tr>
        </thead>
        <tbody>
          {mockScores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoresPage;