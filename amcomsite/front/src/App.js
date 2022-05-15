import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import { Main } from './components/Main';
import { ManagePage } from './components/ManagePage';

function App() {





  return (
    <Router>
    <div className="App">
      <nav>
        <div className='logo_icon'><span className="material-symbols-outlined logo">
          waves
          </span></div>
        <div className='logo'>logoipsum</div>
        <div className='page_title'>Caixa livre</div>
        <div className='link'><Link to="/">Home</Link></div>
        <div><Link to="/manage">Manage</Link></div>
      </nav>
      
      <Routes>
          <Route path="/manage" element={<ManagePage />}/>
          <Route path="/" element={<Main/>}/>
      </Routes>
      </div>
      </Router>
  );
}

export default App;
