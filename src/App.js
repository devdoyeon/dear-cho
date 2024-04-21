import './App.css';
import MainPage from './pages/MainPage';
import Navigator from 'components/Navigator';

function App() {
  return (
    <div className='App'>
      {<Navigator />}
      {<MainPage />}
    </div>
  );
}

export default App;
