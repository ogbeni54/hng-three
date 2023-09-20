import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Landing page/Home';
import Grid from './grid/Grid';
// import Grid from './grid/Grid';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/grid' element={< Grid/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
