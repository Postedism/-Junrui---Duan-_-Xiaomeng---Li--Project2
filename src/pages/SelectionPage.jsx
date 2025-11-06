import { Link } from 'react-router-dom';

function SelectionPage() {
  
  // mock data
  const mockGames = [
    { id: 'sudoku', title: 'Classic', author: 'Postedism', path: '/games/normal' },
  ];

  return (
    <div className="page-container selection-page">
      <h2>Select Game</h2>
      <p>Just for Selection(Mock)</p>
      
      <div className="game-list">
        {mockGames.map(game => (
          <div key={game.id} className="game-list-item">
            <h3>{game.title}</h3>
            <p>Author: {game.author}</p>
            <Link to={game.path} className="button-secondary">
              Start Game
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectionPage;