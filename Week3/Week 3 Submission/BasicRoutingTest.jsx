import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {

  //{ const [loggedIn, setLoggedIn] = useState(false); }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/comp308">COMP308</Link>
            </li>
            <li>
              <Link to="/simulation-design">Simulation Design</Link>
            </li>
            <li>
              <Link to="/advanced-graphics">Advanced Graphics</Link>
            </li>
            <li>
              <Link to="/game-development-project-2">Game Development Project 2</Link>
            </li>
          </ul>
        </nav>

        {/* <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />} > </Route>
          <Route path="/users" element={<Users />} > </Route>
          <Route path="/students" element={<Students />} > </Route>
          <Route path="/comp308" element={<COMP308 />}></Route>
          <Route path="/simulation-design" element={<SimulationDesign />} />
          <Route path="/advanced-graphics" element={<AdvancedGraphics />} />
          <Route path="/game-development-project-2" element={<GameDevelopmentProject2 />} />
          <Route path="/" element={<Home />}> </Route>
        </Routes>
      </div>
    </Router>
  );
}
// write a function component per each course
function COMP308() {
  return <h2>COMP308 Emerging Technologies</h2>;
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
function Students() {
  return <h2>COMP308 Students</h2>;
}

// Added Code
function SimulationDesign() {
  return (
    <div>
      <h2>Simulation Design</h2>
    </div>
  );
}

function AdvancedGraphics() {
  return (
    <div>
      <h2>Advanced Graphics</h2>
    </div>
  );
}

function GameDevelopmentProject2() {
  return (
    <div>
      <h2>Game Development Project 2</h2>
    </div>
  );
}
//
export default App;