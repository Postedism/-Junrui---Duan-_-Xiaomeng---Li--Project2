import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page-container home-page">
      <header className="home-header">
        <h1>Sudoku React</h1>
        <p>A logical Game constructed by React and Context API </p>
      </header>
      
      <section className="home-actions">
        <Link to="/games/normal" className="home-button button-primary">
          Normal Game (9x9)
        </Link>
        <Link to="/games/easy" className="home-button button-secondary">
          Easy Game (6x6)
        </Link>
        <Link to="/rules" className="home-button button-secondary">
          Rules
        </Link>
      </section>
    </div>
  );
}

export default HomePage;