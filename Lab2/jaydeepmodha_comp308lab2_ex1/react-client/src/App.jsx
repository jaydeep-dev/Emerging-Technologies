import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
