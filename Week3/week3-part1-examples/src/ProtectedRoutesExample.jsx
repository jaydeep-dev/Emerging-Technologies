import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import { Navigate } from 'react-router-dom';
//
function App() {
  //const [loggedIn, setLoggedIn] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);




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

          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />} > </Route>
          <Route path="/users" element={<Users />} > </Route>
          <Route path="/dashboard" element={<Dashboard />} > </Route>

          <Route path="/"
            element={loggedIn ? <Navigate to="/dashboard" /> : <Home />}> </Route>

        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home, need login</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
function Dashboard() {
  return <h2> Welcome to Dashboard, loggedIn was true, Start working now</h2>;
}
//
export default App;