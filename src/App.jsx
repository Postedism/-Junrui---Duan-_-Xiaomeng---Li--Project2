import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { SudokuProvider } from './contexts/SudokuContext';

function App() {
  return (
    <SudokuProvider>
      <div className="app-container">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </SudokuProvider>
  );
}

export default App;