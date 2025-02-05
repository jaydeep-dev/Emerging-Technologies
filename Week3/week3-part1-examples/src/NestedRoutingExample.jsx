import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

import './dynroutes.css'

function App() {
  return (
    <Router>
      <div>

        <nav >
      
            <Link className='navlink' to="/home">Home</Link>          
            <Link className='navlink' to="/topics">Topics</Link>
    
        </nav>        

        <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="topics" element={<Topics />}>
          <Route index element={<Component />} />
          <Route path="function-component" element={<Component />} />
          <Route path="props-vs-state" element={<PropsVsState />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
      </div>
    </Router>
  );

}

function Home() {
  return <h2>Home</h2>;
}


function Component() {
    return <h2>Components</h2>;
  }

  function NoMatch() {
    return <h2>No Match</h2>;
  }

  function PropsVsState() {
    return <h2>Props-Vs-State</h2>;
  }
// The route /topics loads the Topics component, 
// which renders any further <Route>'s conditionally 
// on the paths :id value.

const Topics = () => {
  return (
    <>
      <h1>Topic</h1>

      <nav >
        <Link className='navlink' to="/topics/function-component">Function Components Page</Link>
        <Link className='navlink' to="/topics/props-vs-state">Props v. State Page</Link>
      </nav>

      <Outlet />
    </>
  );
};




//
export default App;