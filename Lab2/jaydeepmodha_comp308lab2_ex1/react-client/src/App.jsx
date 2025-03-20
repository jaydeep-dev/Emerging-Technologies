import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Home from './Components/Home';
import ThreeDBackground from './Components/ThreeDBackground';

function App() {
  return (
    <Router>
      <ThreeDBackground />
      <Home />
    </Router>
  );
}

export default App;
