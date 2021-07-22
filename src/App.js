import './App.css';
import Navbar from './components/Navbar'
import Routes from './Routes'

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <Navbar className='flex-grow' />
      <div className="bg-gray-700 flex-1 pt-4">
        <div className="container mx-auto min-h-full">
          <Routes />
        </div>
      </div>

    </div>
  );
}

export default App;
