import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";

import axios from 'axios';

//
// This app requires react-bootstrap and bootstrap installed: 
//    npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
//
import EditUser from './components/EditUser';
import EditArticle from './components/EditArticle';

import CreateUser from './components/CreateUser';
import ShowUser from './components/ShowUser';
import ShowArticle from './components/ShowArticle';
import Home from './components/Home'
import Login from './components/Login';
import ListArticles from './components/ListArticles';
//
function App() {
  const [authStatus, setAuthStatus] = useState(false);

  const deleteCookie = async () => {
    try {
      await axios.get('/api/signout');
      setAuthStatus(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Router>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Game Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {authStatus ?
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" onClick={deleteCookie}>Logout</Nav.Link>
              </Nav>
              :
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/create">Sign Up</Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={< Home />} />
          <Route path='/' element={< Home />} />
          <Route path="/login" element={< Login setAuthStatus={setAuthStatus}/>} />
          <Route path="create" element={< CreateUser />} />
          <Route path="edit/:id" element={< EditUser />} />
          <Route path="show/:id" element={< ShowUser />} />
          <Route path="library" element={<ListArticles />} />
          <Route path="showarticle/:id" element={< ShowArticle />} />
          <Route path="editarticle/:id" element={< EditArticle />} />

        </Routes>
      </div>

    </Router>


  );
}

export default App;
